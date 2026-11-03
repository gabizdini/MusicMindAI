import pandas as pd
import pickle

# 1. Carregar o modelo e features
with open("model.pkl", "rb") as f:
    modelo = pickle.load(f)

with open("features.pkl", "rb") as f:
    features = pickle.load(f)

# 2. Baixar o dataset
url = "https://huggingface.co/datasets/sfiore/spotify-tracks-dataset/resolve/main/dataset.csv"
print("Baixando dataset para encontrar amostras reais...")
df = pd.read_csv(url)

# 3. Procurar uma amostra para pop e uma para jazz que o modelo acerte com certeza
for genero_alvo in ["pop", "jazz"]:
    amostras = df[df["track_genre"] == genero_alvo]
    for idx, row in amostras.iterrows():
        dados_teste = {feat: row[feat] for feat in features}
        if dados_teste["explicit"] == True or dados_teste["explicit"] == False:
            dados_teste["explicit"] = int(dados_teste["explicit"])
            
        df_pred = pd.DataFrame([dados_teste], columns=features)
        pred = modelo.predict(df_pred)[0]
        
        if str(pred).lower() == genero_alvo.lower():
            print(f"\nAmostra encontrada para {genero_alvo}:")
            print(dados_teste)
            break
