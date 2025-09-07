from flask import Blueprint, request, jsonify
import os
import seaborn as sns
import matplotlib.pyplot as plt
import joblib
from src.utils.CleanData import preprocessCSV

upload_csv_bp = Blueprint('upload_csv',__name__)


ALLOWED_EXTENSIONS={'csv'}

model = joblib.load(os.path.join(os.path.dirname(__file__), "./KMeans_trained_model", 'kmeans_model.joblib'))

static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", 'static')

os.makedirs(static_folder, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_csv_bp.route("/upload", methods=['POST'])
def uploadFile():
    if 'File' not in request.files:
        return jsonify({'error': 'No File part in the request'}), 400
    
    file = request.files['File']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type; only .csv allowed'}), 400
    
    # print(f"File saved as {file.filename}")

    # Preprocess
    df_with_id, df = preprocessCSV(file)
    preds = model.predict(df)
    df_with_id['Cluster_Id'] = preds

    # Cluster summary stats (fix: flatten multi-index)
    cluster_summary = (
        df_with_id
        .groupby("Cluster_Id")[["Recency", "Frequency", "Amount"]]
        .agg(["mean", "median", "min", "max"])
    )
    cluster_summary.columns = [f"{col[0]}_{col[1]}" for col in cluster_summary.columns]
    cluster_summary = cluster_summary.round(2).to_dict(orient="index")

    plots = {}

    # Cluster distribution
    plt.figure(figsize=(6, 4))
    sns.countplot(x="Cluster_Id", data=df_with_id, hue="Cluster_Id", palette="Set2", legend=False)
    plt.title("Customer Count per Cluster")
    dist_path = os.path.join(static_folder, "Cluster_Distribution.png")
    plt.savefig(dist_path, bbox_inches="tight")
    plt.close()
    plots["distribution"] = "/static/Cluster_Distribution.png"

    # Violin plots for each metric
    for metric in ["Amount", "Frequency", "Recency"]:
        plt.figure(figsize=(6, 4))
        sns.violinplot(x="Cluster_Id", y=metric, data=df_with_id, hue="Cluster_Id", palette="Set3", legend=False)
        plt.title(f"{metric} by Cluster")
        path = os.path.join(static_folder, f"Cluster_{metric}.png")
        plt.savefig(path, bbox_inches="tight")
        plt.close()
        plots[metric.lower()] = f"/static/Cluster_{metric}.png"

    # Heatmap of mean values
    cluster_means = df_with_id.groupby("Cluster_Id")[["Recency", "Frequency", "Amount"]].mean().round(2)
    plt.figure(figsize=(6, 4))
    sns.heatmap(cluster_means, annot=True, cmap="coolwarm", fmt="g")
    heatmap_path = os.path.join(static_folder, "Cluster_Heatmap.png")
    plt.title("Cluster Feature Means")
    plt.savefig(heatmap_path, bbox_inches="tight")
    plt.close()
    plots["heatmap"] = "/static/Cluster_Heatmap.png"

    # Response: plots + stats
    response = {
        "plots": plots,
        "cluster_summary": cluster_summary
    }

    return jsonify(response)