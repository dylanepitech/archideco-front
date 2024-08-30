import pandas as pd
import mysql.connector
import matplotlib.pyplot as plt
import seaborn as sns

# Connexion à MySQL
conn = mysql.connector.connect(
    host="localhost",
    port="8889",
    user="root",
    password="root",
    database="e-commerceServeur"
)

# Lire les données dans un DataFrame
df = pd.read_sql("SELECT * FROM cart", conn)

# Fermer la connexion
conn.close()

# Afficher les types de données
print(df.dtypes)

# Analyser les données
print(df.describe())

