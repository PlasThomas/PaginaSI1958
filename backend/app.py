from flask import Flask, jsonify, request
import bcrypt
import jwt
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Funciones de bcrypt
def encrypt_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def check_password(password, hashed_password):
    return bcrypt.checkpw(
        password.encode('utf-8'), 
        hashed_password.encode('utf-8')
    )

# Conexion con base de datos.
try:
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client['usuarios']
    print('Conexion Exitosa.')
except Exception as e:
    print(f'ERROR: {e}')

#Coleccion para usuarios.
users_collection = db['usuarios']

# APIs de backend.
@app.route("/api/login", method=['POST'])
def login():
    try:
        data = request.get_json()
        # Validar datos requeridos
        if not data.get('username') or not data.get('password'):
            return jsonify({
                'success': False,
                'error': 'Usuario y contraseña son requeridos'
            }), 400
        
        # Buscar usuario
        user = users_collection.find_one({
            'username': data['username'],
            'is_active': True
        })
        
        if not user:
            return jsonify({
                'success': False,
                'error': 'Usuario no encontrado'
            }), 404
        
        # Verificar contraseña
        if not check_password(data['password'], user['password']):
            return jsonify({
                'success': False,
                'error': 'Contraseña incorrecta'
            }), 401
        # Generar token
        token = generate_token(str(user['_id']), user['username'])
        
        return jsonify({
            'success': True,
            'message': 'Login exitoso',
            'token': token,
            'user': {
                'id': str(user['_id']),
                'username': user['username'],
                'email': user['email']
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@app.route("/api/signup", method=['POST'])
def signup():
    pass

@app.route("/api/logout", method=['POST'])
def logout():
    pass
