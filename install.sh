cd frontend
echo "instalacion de frontend"
npm install
echo "- Instalacion de paquetes de npm"
npm run build
echo "- Construccion de proyecto"
cd ../backend
echo "Instalacion de backend"
python -m venv flaskback
echo "- Creacion de entorno virtual"
pip install Flask flask-cors pymongo python-dotenv bcrypt
echi "- Instalacion de paquetes de pip"