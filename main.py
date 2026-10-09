#ejecutar procesos en paralelo 
#el servidor Flask correra en un hilo secundario, 
#evitando que bloquee el programa principal.
import threading 

#Evita que el navegador intente conectarse antes
#de que el servidor esté listo.
import time

#Permite abrir el navegador con una direccion http y puerto de manera local
import webbrowser

#No es una libreria, es mi propio archivo y lo que pone en marcha el servidor
from servidor import app

# Direccion y puerto donde corre el servidor en este mismo equipo
HOST = "127.0.0.1"
PUERTO = 5000


def arrancar_servidor():
    # Inicia el servidor Flask sin modo debug para que funcione dentro del ejecutable
    app.run(host=HOST, port=PUERTO, debug=False, use_reloader=False)


if __name__ == "__main__":
    # El servidor corre en un hilo secundario para no bloquear el programa
    hilo_servidor = threading.Thread(target=arrancar_servidor, daemon=True)
    hilo_servidor.start()

    # Espera un segundo para dar tiempo a que el servidor arranque
    time.sleep(1)

    # Abre la pagina (el cliente) en el navegador predeterminado
    webbrowser.open(f"http://{HOST}:{PUERTO}")

    print("Simulador en ejecucion. Cierre esta ventana para detenerlo.")

    # Mantiene el programa abierto mientras el servidor atiende peticiones
    hilo_servidor.join()