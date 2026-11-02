
import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 1. Carregar os dados
url = "https://huggingface.co/datasets/sfiore/spotify-tracks-dataset/resolve/main/dataset.csv"
df = pd.read_csv(url)

# 2. Selecionar os seis gêneros
generos = ["classical", "electronic", "hip-hop",
           "jazz", "pop", "rock"]

df_selecionado = df[df["track_genre"].isin(generos)].copy()

# 3. Remover músicas com gêneros conflitantes
generos_por_id = df_selecionado.groupby("track_id")["track_genre"].nunique()
ids_conflitantes = generos_por_id[generos_por_id > 1].index

df_limpo = df_selecionado[
    ~df_selecionado["track_id"].isin(ids_conflitantes)
].copy()

df_limpo = df_limpo.drop_duplicates(subset="track_id")

# 4. Selecionar características e resultado esperado
colunas = [
    "duration_ms", "explicit", "danceability", "energy", "key",
    "loudness", "mode", "speechiness", "acousticness",
    "instrumentalness", "liveness", "valence", "tempo",
    "time_signature"
]

X = df_limpo[colunas].copy()
y = df_limpo["track_genre"]

X["explicit"] = X["explicit"].astype(int)

# 5. Dividir treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 6. Treinar o Random Forest - Modelo 3
modelo = RandomForestClassifier(
    n_estimators=300,
    max_depth=20,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)

modelo.fit(X_train, y_train)

# 7. Salvar o modelo e os identificadores
nomes_generos = modelo.classes_
nomes_features = list(X.columns)

with open("model.pkl", "wb") as arquivo:
    pickle.dump(modelo, arquivo)

with open("names.pkl", "wb") as arquivo:
    pickle.dump(nomes_generos, arquivo)

with open("features.pkl", "wb") as arquivo:
    pickle.dump(nomes_features, arquivo)

print("Modelo e arquivos exportados com sucesso!")
