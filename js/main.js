// --- CONSTANTES ---

const LISTA_TAREAS = [];

// --- FUNCIONES ---

function mostrarMenu() {
    let opcion = prompt(
        "¡Bienvenido al Gestor de Tareas Pendientes \n" +
        "Selecciona una opción: \n" +
        "1. Agregar nueva tarea \n" +
        "2. Marcar tarea como completada \n" +
        "3. Ver todas las tareas \n" +
        "4. Salir \n" +
        "Ingresa el número de tu elección:"
    );

    return opcion ? opcion.trim() : "";
}


const agregarTarea = () => {
    let descripcionTarea;
    do {
        descripcionTarea = prompt("Ingresa la descripción de la nueva tarea (o 'cancelar' para salir):");
        if (descripcionTarea.toLowerCase() === "cancelar") {
            alert("Operación cancelada. No se añadió ninguna tarea.");
            return;
        }
        if (descripcionTarea === "") {
            alert("La descripción de la tarea no puede estar vacía. Inténtalo de nuevo.");
        }
    } while (descripcionTarea === "");

    LISTA_TAREAS.push({ 
        descripcion: descripcionTarea, 
        completada: false });
    alert(`Tarea "${descripcionTarea}" agregada exitosamente.`);
    console.log(`Nueva tarea agregada: "${descripcionTarea}"`);
}


const marcarTareaCompletada = () => {
    if (LISTA_TAREAS.length === 0) {
        alert("¡Tu lista está vacía!");
        return;
    }

    let mensajeTareas = "Tareas actuales:\n\n";
    for (let i = 0; i < LISTA_TAREAS.length; i++) {
        const tarea = LISTA_TAREAS[i];
        const estado = tarea.completada ? "Tarea Completada" : "Tarea Pendiente";
        mensajeTareas += `${i + 1}. ${tarea.descripcion} [${estado}]\n`;
    }

    let indiceATrabajar = parseInt(prompt(
        mensajeTareas + "\n" +
        "Ingresa el número de la tarea que quieres marcar como completada (o 0 para cancelar):"
    ));

    // Validar la entrada del usuario
    if (isNaN(indiceATrabajar) || indiceATrabajar < 0 || indiceATrabajar > LISTA_TAREAS.length) {
        alert("Número de tarea inválido. Por favor, ingresa un número válido de la lista.");
    } else if (indiceATrabajar === 0) {
        alert("Operación cancelada.");
    } else {
        const indiceReal = indiceATrabajar - 1;
        if (LISTA_TAREAS[indiceReal].completada) {
            alert(`La tarea "${LISTA_TAREAS[indiceReal].descripcion}" ya está completada.`);
        } else {
            LISTA_TAREAS[indiceReal].completada = true;
            alert(`Tarea "${LISTA_TAREAS[indiceReal].descripcion}" ha sido marcada como completada.`);
            console.log(`Tarea completada: "${LISTA_TAREAS[indiceReal].descripcion}"`);
        }
    }
}

const verTodasLasTareas = () => {
    if (LISTA_TAREAS.length === 0) {
        alert("Actualmente no tienes tareas. ¡Añade algunas para empezar!");
        console.log("La lista de tareas está vacía.");
        return;
    }

    console.log("--- LISTA DE TAREAS ACTUAL ---");
    let mensajeTareas = "Tu lista de tareas:\n";

    for (let i = 0; i < LISTA_TAREAS.length; i++) {
        const tarea = LISTA_TAREAS[i];
        const estado = tarea.completada ? "Tarea Completada" : "Tarea Pendiente";
        console.log(`${i + 1}. ${tarea.descripcion} [${estado}]`);
        mensajeTareas += `${i + 1}. ${tarea.descripcion} [${estado}]\n`;
    }
    alert(mensajeTareas);
    console.log("------------------------------");
}


// --- LÓGICA PRINCIPAL DEL SIMULADOR ---
// Se invoca la función principal para iniciar el simulador

let continuarSimulador = true;

while (continuarSimulador) {
    const opcionElegida = mostrarMenu();

    if (opcionElegida === "1") {
        agregarTarea();
    } else if (opcionElegida === "2") {
        marcarTareaCompletada();
    } else if (opcionElegida === "3") {
        verTodasLasTareas();
    }   else if (opcionElegida === "4") {
        const confirmacionSalida = prompt("¿Estás seguro de que quieres salir del simulador? (Responda con 'si' o 'no')");
            if (confirmacionSalida.toLowerCase() === "si") {
                alert("¡Gracias por usar el Gestor de Tareas! ¡Hasta pronto!");
                console.log("Simulador finalizado por el usuario.");
                continuarSimulador = false;
            } else if (confirmacionSalida.toLowerCase() === "no") {
                alert("¡Genial! Seguimos en el gestor de tareas.");
            } else {
                alert("Respuesta no válida. Por favor, responde con 'si' o 'no'.");
                console.warn(`Respuesta inválida al confirmar salida: "${confirmacionSalida}"`);
            }
    } else {
        alert("Opción no válida. Por favor, selecciona un número del 1 al 4.");
            console.warn(`Opción inválida ingresada: "${opcionElegida}"`);
    }
}
