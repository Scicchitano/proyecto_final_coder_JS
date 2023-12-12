# proyecto_final_coder_JS

# Almacenamiento Local
* CLAVE_LOCALSTORAGE: Define una constante que se utilizará como clave para almacenar y recuperar datos desde el almacenamiento local del navegador.

* consultas: Una matriz que almacenará objetos representando consultas de préstamos.

* guardarTareasEnAlmacenamiento: Función que guarda el historial de consultas en el almacenamiento local.

* agregar_consulta_LS: Función para agregar una nueva consulta al historial y guardarla en el almacenamiento local.

* actualizar_LS: Actualiza la interfaz de usuario con el historial de consultas almacenado localmente.

# Evento de clic en el botón
* Un evento de clic en el botón con el id "botonCalcular" que desencadena el cálculo del préstamo, la actualización del historial y la visualización de resultados.
# Función calcularPrestamo
* Realiza el cálculo del préstamo basado en los valores ingresados por el usuario.

* Muestra mensajes de aprobación o rechazo dependiendo del resultado del cálculo.

* Llama a la función agregar_consulta_LS para agregar la consulta actual al historial.

# Funciones auxiliares
* calcularMontoTotal, calcularFactorDeDescuento, y calcularPagoMensual: Funciones auxiliares para realizar cálculos específicos relacionados con el préstamo.
# Funciones de filtrado
* searchLoanById: Busca un préstamo en el historial por su ID.

* filtrarPrestamoPorMonto, filtrarPrestamosPorTasaDeInteres, filtrarPrestamoPorPlazo: Filtran préstamos en el historial según ciertos criterios.

# Ejemplos de filtrado
* Se realizan ejemplos de filtrado por monto, tasa de interés y plazo, y los resultados se imprimen en la consola.
# Duplicación de evento clic
* Hay una duplicación del evento clic en el botón "botonCalcular" al final del código.
# Uso de librería externa
* Parece haber una dependencia de la librería Swal para mostrar mensajes en la interfaz de usuario.
# Posible Mejora
* La función agregar_consulta_LS podría recibir directamente un objeto de consulta en lugar de los parámetros individuales de monto, interés y plazo.
# Mi gif
