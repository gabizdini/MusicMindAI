# MusicMind AI — Backend

## 1. Sobre o projeto

O MusicMind AI utiliza Machine Learning para classificar músicas em seis gêneros musicais a partir de suas características sonoras.

O backend foi desenvolvido em Python utilizando Flask e integra um modelo Random Forest previamente treinado.

## 2. Tecnologias utilizadas

- Python
- Flask
- Flask-CORS
- Pandas
- NumPy
- Scikit-learn

## 3. Estrutura dos arquivos

```text
MusicMindIA/
├── app.py
├── app_backup.py
├── modelo.py
├── testar_modelo.py
├── model.pkl
├── names.pkl
├── features.pkl
├── requirements.txt
└── README.md
```

## 4. Arquivos do modelo

- `model.pkl`: modelo Random Forest treinado.
- `names.pkl`: lista dos seis gêneros musicais.
- `features.pkl`: nomes e ordem das 14 características utilizadas pelo modelo.

## 5. Instalação

É necessário ter Python instalado.

Na pasta do projeto, execute:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

O Scikit-learn deve permanecer na versão 1.6.1 para manter a compatibilidade com o modelo exportado.

## 6. Executar o backend

Execute:

```powershell
python app.py
```

A API ficará disponível em:

`http://127.0.0.1:5000`

## 7. Rotas disponíveis

### GET /

Verifica se a API está funcionando.

Endereço: `http://127.0.0.1:5000/`

Resposta:

```json
{
  "mensagem": "API MusicMind AI funcionando!",
  "status": "online"
}
```

### POST /predict

Recebe as características musicais em formato JSON, executa a previsão com o modelo Random Forest e retorna o gênero previsto.

Endereço: `http://127.0.0.1:5000/predict`

Método: `POST`

Content-Type: `application/json`

### Características obrigatórias

A API recebe 14 características numéricas:

1. duration_ms
2. explicit
3. danceability
4. energy
5. key
6. loudness
7. mode
8. speechiness
9. acousticness
10. instrumentalness
11. liveness
12. valence
13. tempo
14. time_signature

### Exemplo de requisição

```json
{
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
```

### Exemplo de resposta

```json
{
  "genero": "hip-hop",
  "mensagem": "Seu estilo musical é hip-hop!"
}
```

O gênero retornado depende dos dados enviados ao modelo.

## 8. Tratamento de erros

A API verifica os dados antes de realizar a previsão.

- Erro 400: JSON inválido ou características obrigatórias ausentes.
- Erro 400: valores não numéricos ou inválidos.
- Erro 500: falha interna durante a previsão.

## 9. Gêneros classificados

O modelo