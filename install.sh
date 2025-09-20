cd frontend/
echo "instalacion de frontend"
npm install
echo "- Instalacion de paquetes de npm"
cd ../backend/
echo "Instalacion de backend"
python3 -m venv flaskback
source flaskback/bin/activate
echo "- Creacion de entorno virtual"
pip install Flask flask-cors pymongo python-dotenv bcrypt jwt
echo "- Instalacion de paquetes de pip"
cd ..
echo "Instalacion de proyecto COMPLETADA"