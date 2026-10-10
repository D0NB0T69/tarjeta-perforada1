
#render template: permite mostrar paginas HTML desde templates carga el archivo index 
#request:sirve para leer datos que envia el cliente algun formulario json
#jsonfy: convierte datos python a json, para enviarlos de vuelta al navegador 
from flask import Flask, render_template, request, jsonify

#trae la funcion que se definio en codigos.py 
from codigos import obtener_filas

# Crea la aplicacion del servidor
app = Flask(__name__)

# Numero maximo de columnas de la tarjeta
NUMERO_MAXIMO_COLUMNAS = 80


# Ruta principal: muestra la pagina del cliente
@app.route("/")
def inicio():
    return render_template("index.html")


# Ruta de la API: recibe el texto y devuelve las perforaciones
@app.route("/api/perforar", methods=["POST"])
def perforar():
    # Lee los datos enviados por el cliente en formato JSON
    datos = request.get_json(silent=True) or {}
    texto = datos.get("texto", "")

    # Valida que el texto sea correcto antes de procesarlo
    if not isinstance(texto, str) or len(texto) > NUMERO_MAXIMO_COLUMNAS:
        return jsonify({"error": "Texto invalido o mayor a 80 caracteres"}), 400

    # Convierte cada caracter en sus filas perforadas
    columnas = []
    for caracter in texto:
        filas = obtener_filas(caracter)
        columnas.append({
            "filas": filas or [],
            "error": filas is None  # True si el caracter no tiene codigo
        })

    return jsonify({"columnas": columnas})