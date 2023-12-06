const CLAVE_LOCALSTORAGE = "HISTORIAL";

let consultas = [];

const guardarTareasEnAlmacenamiento = () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(consultas));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const agregar_consulta_LS = (monto, interes, plazo) => {
    return new Promise((resolve, reject) => {
        try {
            consultas.push({ monto: monto, interes: interes, plazo: plazo });
            guardarTareasEnAlmacenamiento()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    });
};

const actualizar_LS = () => {
    return new Promise((resolve) => {
        const $contenedorHitorial = document.getElementById("historial");
        $contenedorHitorial.innerHTML = "";

        for (const consulta of consultas) {
            const $p = document.createElement("p");
            $p.textContent = `Monto: ${consulta.monto}  -  Interes: ${consulta.interes}  -  Plazo: ${consulta.plazo}  `;
            $contenedorHitorial.appendChild($p);
        }

        resolve();
    });
};

document.getElementById("botonCalcular").addEventListener("click", () => {
    calcularPrestamo()
        .then(() => {
            return actualizar_LS();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

const calcularPrestamo = () => {
    return new Promise((resolve, reject) => {
        const montoPrestamo = parseFloat(document.getElementById("montoDePrestamo").value);
        const tasaInteres = parseFloat(document.getElementById("tasaDeInteres").value);
        const plazoPrestamo = parseInt(document.getElementById("plazoDePrestamo").value);

        if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(plazoPrestamo) || montoPrestamo <= 0 || tasaInteres <= 0 || plazoPrestamo <= 0) {
            Swal.fire({
                title: "Es necesario ingresar un valor",
                icon: "warning",
                showCancelButton: false,
                confirmButtonText: "Ok",
            });
            reject("Valores inválidos");
            return;
        }

        const tasaInteresMensual = (tasaInteres / 100) / 12;
        const cantidadTotal = calcularMontoTotal(montoPrestamo, tasaInteresMensual, plazoPrestamo);
        const mensualidad = calcularPagoMensual(montoPrestamo, tasaInteresMensual, plazoPrestamo);

        document.getElementById("cantidadDelTotal").textContent = cantidadTotal.toFixed(2);
        document.getElementById("mensual").textContent = mensualidad.toFixed(2);

        if (mensualidad <= (montoPrestamo / plazoPrestamo)) {
            document.getElementById("aprobacionMensaje").textContent = "Su solicitud de préstamo ha sido aprobada.";
        } else {
            document.getElementById("aprobacionMensaje").textContent = "Lo sentimos, su solicitud de préstamo ha sido rechazada.";
        }

        agregar_consulta_LS(montoPrestamo, tasaInteres, plazoPrestamo)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
};

function calcularMontoTotal(montoPrestamo, tasaInteresMensual, plazoPrestamo) {
    return montoPrestamo * calcularFactorDeDescuento(tasaInteresMensual, plazoPrestamo);
}

function calcularFactorDeDescuento(tasaInteresMensual, plazoPrestamo) {
    return (1 - Math.pow(1 + tasaInteresMensual, -plazoPrestamo));
}

function calcularPagoMensual(montoPrestamo, tasaInteresMensual, plazoPrestamo) {
    return (montoPrestamo * tasaInteresMensual) / calcularFactorDeDescuento(tasaInteresMensual, plazoPrestamo);
}

document.getElementById("botonCalcular").addEventListener("click", calcularPrestamo);


function searchLoanById(PrestamoId) {
    return consultas.find(prestamo => consultas.id === PrestamoId);
}

function filtrarPrestamoPorMonto(minCantidad, maxCantidad) {
    return consultas.filter(prestamo => consultas.monto >= minCantidad && consultas.monto <= maxCantidad);
}

function filtrarPrestamosPorTasaDeInteres(tasaDeInteresMin, tasaDeInteresMax) {
    
   
return consultas.filter(prestamo => consultas.interes >= tasaDeInteresMin && consultas.interes <= tasaDeInteresMax);
}

function filtrarPrestamoPorPlazo(minPlazo, maxPlazo) {
    return consultas.filter(prestamo => consultas.plazo >= minPlazo && consultas.plazo <= maxPlazo);
}

let filteredLoansByAmount = filtrarPrestamoPorMonto(1000, 1500);
console.log("Préstamos filtrados por monto:", filteredLoansByAmount);

let filteredLoansByInterestRate = filtrarPrestamosPorTasaDeInteres(5, 7);
console.log("Préstamos filtrados por tasa de interés:", filteredLoansByInterestRate);

let filteredLoansByTerm = filtrarPrestamoPorPlazo(12, 24);
console.log("Préstamos filtrados por plazo:", filteredLoansByTerm);