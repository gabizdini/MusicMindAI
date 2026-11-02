import pickle
import math
from pathlib import Path

import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS


# 1. Inicializar a aplicação Flask
app = Flask(__name__)
CORS(app)


# 2. Localizar a pasta do projeto
PASTA = Path(__file__).resolve().parent


# 3. Carregar o modelo treinado pela Melissa
with open(PASTA / "model.pkl", "rb") as arquivo:
    modelo = pickle.load(arquivo)


# 4. Carregar os gêneros musicais
with open(PASTA / "names.pkl", "rb") as arquivo:
    nomes = pickle.load(arquivo)


# 5. Carregar as características musicais
with open(PASTA / "features.pkl", "rb") as arquivo:
    features = pickle.load(arquivo)


# 6. Verificar se os arquivos foram carregados
print("Modelo carregado com sucesso!")
print("Gêneros disponíveis:", nomes)
print("Quantidade de características:", len(features))


# 7. Rota inicial da API
@app.route("/", methods=["GET"])
def inicio():
    return jsonify({
        "mensagem": "API MusicMind AI funcionando!",
        "status": "online"
    })


# 8. Rota para realizar a previsão musical
@app.route("/predict", methods=["POST"])
def prever_genero():

    try:
        # Receber os dados enviados pelo frontend
        dados = request.get_json(silent=True)

        if not isinstance(dados, dict):
            return jsonify({
                "erro": "Envie os dados no formato JSON."
            }), 400

        # Verificar se todas as características foram enviadas
        faltantes = [
            caracteristica
            for caracteristica in features
            if caracteristica not in dados
        ]

        if faltantes:
            return jsonify({
                "erro": "Existem características obrigatórias faltando.",
                "caracteristicas_faltantes": faltantes
            }), 400

        # Organizar os dados na ordem esperada pelo modelo
        valores = []

        for caracteristica in features:
            valor = dados[caracteristica]

            if isinstance(valor, bool) or not isinstance(
                valor, (int, float)
            ):
                return jsonify({
                    "erro": f"O valor de {caracteristica} deve ser numérico."
                }), 400

            if not math.isfinite(valor):
                return jsonify({
                    "erro": f"O valor de {caracteristica} é inválido."
                }), 400

            valores.append(float(valor))

        # Transformar os dados em uma tabela
        dados_modelo = pd.DataFrame(
            [valores],
            columns=features
        )

        # Realizar a previsão com o Random Forest
        previsao = modelo.predict(dados_modelo)[0]

        # Identificar o gênero previsto
        if isinstance(previsao, (int, np.integer)):
            genero = nomes[int(previsao)]
        else:
            genero = str(previsao)

        # Retornar o resultado em JSON
        return jsonify({
            "genero": genero,
            "mensagem": f"Seu estilo musical é {genero}!"
        }), 200

    except Exception as erro:
        return jsonify({
            "erro": "Não foi possível realizar a previsão.",
            "detalhes": str(erro)
        }), 500


# 9. Executar o servidor localmente
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )