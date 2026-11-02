
import pickle
import pandas as pd

# 1. Carregar o modelo
with open("model.pkl", "rb") as arquivo:
    modelo = pickle.load(arquivo)

# 2. Carregar os gêneros
with open("names.pkl", "rb") as arquivo:
    nomes = pickle.load(arquivo)

# 3. Carregar as características
with open("features.pkl", "rb") as arquivo:
    features = pickle.load(arquivo)

print("Modelo carregado com sucesso!")
print("Gêneros disponíveis:", list(nomes))
print("Quantidade de características:", len(features))

# 4. Criar dados fictícios para testar a previsão
dados_teste = {
    "duration_ms": 210000,
    "explicit": 0,
    "danceability": 0.75,
    "energy": 0.80,
    "key": 5,
    "loudness": -5.0,
    "mode": 1,
    "speechiness": 0.05,
    "acousticness": 0.10,
    "instrumentalness": 0.00,
    "liveness": 0.12,
    "valence": 0.85,
    "tempo": 120.0,
    "time_signature": 4
}

# 5. Organizar os dados na ordem esperada
entrada = pd.DataFrame([dados_teste], columns=features)

# 6. Fazer a previsão
previsao = modelo.predict(entrada)

print("\nGênero previsto:", previsao[0])
print("Teste concluído com sucesso!")


