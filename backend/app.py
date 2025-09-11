from flask import Flask, jsonify, request
import bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
try:
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client['usuarios']
    print('Conexion Exitosa.')
except Exception as e:
    print(f'ERROR: {e}')

@app.route("/api/login", method=['POST'])
def login():
    pass

@app.route("/api/signup", method=['POST'])
def signup():
    pass

@app.route("/api/logout", method=['POST'])
def login():
    pass
