# Tabla de codigos Hollerith del IBM 029.
# Cada caracter guarda la lista de filas que se perforan.
# Las filas se nombran como texto: "12", "11", "0", "1" ... "9".

CODIGOS_HOLLERITH = {}

# Digitos 0 a 9: un solo agujero en la fila del numero
for digito in range(10):
    CODIGOS_HOLLERITH[str(digito)] = [str(digito)]

# Letras A a I: zona 12 mas un digito del 1 al 9
letras_a_i = "ABCDEFGHI"
for indice, letra in enumerate(letras_a_i):
    CODIGOS_HOLLERITH[letra] = ["12", str(indice + 1)]

# Letras J a R: zona 11 mas un digito del 1 al 9
letras_j_r = "JKLMNOPQR"
for indice, letra in enumerate(letras_j_r):
    CODIGOS_HOLLERITH[letra] = ["11", str(indice + 1)]

# Letras S a Z: zona 0 mas un digito del 2 al 9
letras_s_z = "STUVWXYZ"
for indice, letra in enumerate(letras_s_z):
    CODIGOS_HOLLERITH[letra] = ["0", str(indice + 2)]

# Simbolos mas comunes
SIMBOLOS = {
    " ": [],
    ".": ["12", "8", "3"],
    "<": ["12", "8", "4"],
    "(": ["12", "8", "5"],
    "+": ["12", "8", "6"],
    "|": ["12", "8", "7"],
    "&": ["12"],
    "!": ["11", "8", "7"],
    "$": ["11", "8", "3"],
    "*": ["11", "8", "4"],
    ")": ["11", "8", "5"],
    ";": ["11", "8", "6"],
    "-": ["11"],
    "/": ["0", "1"],
    ",": ["0", "8", "3"],
    "%": ["0", "8", "4"],
    "_": ["0", "8", "5"],
    ">": ["0", "8", "6"],
    "?": ["0", "8", "7"],
    ":": ["2", "8"],
    "#": ["3", "8"],
    "@": ["4", "8"],
    "'": ["5", "8"],
    "=": ["6", "8"],
    '"': ["7", "8"],
}
CODIGOS_HOLLERITH.update(SIMBOLOS)


def obtener_filas(caracter):
    """Devuelve las filas perforadas de un caracter.
    Devuelve None si el caracter no tiene codigo."""
    # Se pasa a mayusculas, como en una perforadora 029
    return CODIGOS_HOLLERITH.get(caracter.upper())