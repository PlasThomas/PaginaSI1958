from flask import Flask, jsonify, request
import bcrypt
from datetime import datetime, timedelta
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import jwt

load_dotenv()

app = Flask(__name__)
CORS(app, 
    origins=[
        "http://localhost:3000",    
        "https://awsi.sbs",    
        "https://www.awsi.sbs",    
        "http://172.31.33.190:3000",
    ],
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True
)
SECRET_KEY = os.getenv("SECRET_KEY")

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

# Funciones de JWT
def generate_token(user_id, email, role):
    payload = {
        "id": str(user_id),
        "email": email,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=4)  # expira en 1 hora
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

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
@app.route("/api/login", methods=['POST', 'OPTIONS'])
def login():
    try:
        if request.method == "OPTIONS":
            response = jsonify()
            response.headers.add("Access-Control-Allow-Origin", "*")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type")
            return response

        if not request.is_json:
            return jsonify({
                'success': False,
                'error': 'Content-Type debe ser application/json'
            }), 400

        data = request.get_json()

        # Validar datos requeridos
        if not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'error': 'Usuario y contraseña son requeridos'
            }), 400
        
        user = users_collection.find_one({
            'email': data['email'],
            'is_active': True
        })
        
        if not user:
            return jsonify({
                'success': False,
                'error': 'Usuario no encontrado'
            }), 404
        
        if not check_password(data['password'], user['password']):
            return jsonify({
                'success': False,
                'error': 'Contraseña incorrecta'
            }), 401
        
        token = generate_token(user['_id'], user['email'], user['role'])

        response = jsonify({
            'success': True,
            'message': 'Login exitoso',
            "token": token,
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'lastname': user['lastname'],
                'role': user['role'],
                'email': user['email']
            }
        })

        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        error_msg = str(e)
        error_response = jsonify({
            'success': False,
            'error': error_msg
        })
        error_response.status_code = 500
        error_response.headers.add('Access-Control-Allow-Origin', '*')
        return error_response


@app.route("/api/signup", methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        required_fields = ['name','lastname', 'email', 'password', 'confirm_password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'El campo {field} es requerido'
                }), 400
        
        if data['password'] != data['confirm_password']:
            return jsonify({
                'success': False,
                'error': 'Las contraseñas no coinciden'
            }), 400
        
        if users_collection.find_one({'$or': [
            {'email': data['email']}
        ]}):
            return jsonify({
                'success': False,
                'error': 'El usuario o email ya existe'
            }), 400
        
        hashed_password = encrypt_password(data['password'])
        
        user_data = {
            'name': data['name'],
            'lastname': data['lastname'],
            'email': data['email'],
            'role': 'user',
            'password': hashed_password,
            'created_at': datetime.now(),
            'is_active': True
        }
        
        result = users_collection.insert_one(user_data)
        user_id = str(result.inserted_id)
        
        return jsonify({
            'success': True,
            'message': 'Usuario registrado exitosamente',
            'user': {
                'id': user_id,
                'name': data['name'],
                'lastname': data['lastname'],
                'role': 'user',
                'email': data['email']
            }
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor'
        }), 500

@app.route("/api/logout", methods=['POST'])
def logout():
    return jsonify({
        'success': True,
        'message': 'Sesión cerrada exitosamente'
    })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)