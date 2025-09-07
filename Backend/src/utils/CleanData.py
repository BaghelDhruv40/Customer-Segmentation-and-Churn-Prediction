import pandas as pd
from sklearn.preprocessing import StandardScaler

transactionalDesiredFeatures=[]
desiredFeatures=['Amount','Frequency','Recency']

def preprocessCSV(file):
    
    df = pd.read_csv(file,sep=",", encoding="ISO-8859-1", header=0).dropna()

    
    df['Amount']=df['Quantity']*df['UnitPrice']

    # Compute RFM metrics
    rfm_m = df.groupby('CustomerID')['Amount'].sum().reset_index()
    rfm_f = df.groupby('CustomerID')['InvoiceNo'].count().reset_index()
    rfm_f.columns = ['CustomerID', 'Frequency']

    # Corrected InvoiceDate format
    df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'], dayfirst=True, errors='coerce')

    maxDate = df['InvoiceDate'].max()

    df['Diff'] = maxDate - df['InvoiceDate']
    rfm_p = df.groupby('CustomerID')['Diff'].min().reset_index()
    rfm_p['Diff'] = rfm_p['Diff'].dt.days

    rfm = pd.merge(rfm_m, rfm_f, on="CustomerID", how="inner")
    rfm = pd.merge(rfm, rfm_p, on="CustomerID", how="inner")
    rfm.columns = ['CustomerID', 'Amount', 'Frequency', 'Recency']

    # Remove Outliers
    Q1 = rfm.quantile(0.05)
    Q3 = rfm.quantile(0.95)
    IQR = Q3 - Q1

    rfm = rfm[(rfm.Amount >= Q1[0] - 1.5 * IQR[0]) & (rfm.Amount <= Q3[0] + 1.5 * IQR[0])]
    rfm = rfm[(rfm.Recency >= Q1[2] - 1.5 * IQR[2]) & (rfm.Recency <= Q3[2] + 1.5 * IQR[2])]
    rfm = rfm[(rfm.Frequency >= Q1[1] - 1.5 * IQR[1]) & (rfm.Frequency <= Q3[1] + 1.5 * IQR[1])]

    rfm_df = rfm[desiredFeatures]
    
    # Instantiate
    scaler = StandardScaler()

    # fit_transform
    rfm_df_scaled = scaler.fit_transform(rfm_df)
    rfm_df_scaled = pd.DataFrame(rfm_df_scaled)

    # rfm_df_scaled
    rfm_df_scaled.columns = ['Amount', 'Frequency', 'Recency']

    return rfm, rfm_df_scaled