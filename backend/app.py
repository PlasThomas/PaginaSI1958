from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/api/user", method=['GET'])
def login():
    pass

@app.route("/api/user", method=['POST'])
def signup():
    pass
