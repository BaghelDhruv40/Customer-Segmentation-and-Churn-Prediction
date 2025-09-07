from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify
from flask_cors import CORS

from src.customer_segmentation.upload_csv import upload_csv_bp


app=Flask(__name__)

CORS(app)

app.register_blueprint(upload_csv_bp, url_prefix='/api')

@app.route("/")
def home():
    return jsonify({"message":"Server is listening!!"})

