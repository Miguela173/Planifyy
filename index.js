document.addEventListener('DOMContentLoaded', function() {
    // Cargar proyectos desde localStorage
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const tablaProyectos = document.getElementById('proyectos-lista').getElementsByTagName('tbody')[0];
    const totalProyectos = document.getElementById('total-proyectos');

    // Limpiar la tabla antes de agregar proyectos
    tablaProyectos.innerHTML = '';

    if (proyectos.length === 0) {
        totalProyectos.innerText = 'No hay proyectos en curso';
    } else {
        // Añadir proyectos a la tabla
        proyectos.forEach((proyecto, index) => {
            const fila = tablaProyectos.insertRow();
            fila.innerHTML = `
                <td>${proyecto.nombre || 'Nombre no definido'}</td>
                <td>${proyecto.inicio || 'Fecha no definida'}</td>
                <td>${proyecto.vencimiento || 'Fecha no definida'}</td>
                <td>${proyecto.estado || 'Estado no definido'}</td>
                <td>
                    <button onclick="verProyecto(${index})" class="hover:text-white">Ver</button>
                    <button onclick="editarProyecto(${index})" class="hover:bg-blue-400 hover:text-white ">Editar</button>
                    <button onclick="eliminarProyecto(${index})" class="hover:bg-red-600 hover:text-white">Eliminar</button>
                </td>
            `;
        });

        // Actualizar el contador de proyectos
        totalProyectos.innerText = `${proyectos.length} proyectos en curso`;
    }

    // Actualizar las estadísticas de tareas
    actualizarEstadisticas(proyectos);
});


// Función para actualizar las estadísticas de tareas
function actualizarEstadisticas(proyectos) {
    const totalTareasPendientes = proyectos.reduce((count, proyecto) => {
        return count + proyecto.tareas.filter(tarea => tarea.estado !== 'completada').length;
    }, 0);

    const tareasProximas = proyectos.reduce((count, proyecto) => {
        return count + proyecto.tareas.filter(tarea => {
            // Asegúrate de que las fechas estén en un formato válido
            const fechaLimite = new Date(tarea.fechaLimiteTarea);
            return fechaLimite < new Date() && tarea.estado !== 'completada';
        }).length;
    }, 0);

    // Actualizar los elementos de tareas
    document.getElementById('total-tareas').textContent = `${totalTareasPendientes} tareas sin completar`;
    document.getElementById('total-fechas-proximas').textContent = `${tareasProximas} tareas con fechas próximas`;
}

// Funciones de acción de proyectos (ver, editar, eliminar)
function verProyecto(index) {
    alert('Ver Proyecto: ' + index);
}

function editarProyecto(index) {
    alert('Editar Proyecto: ' + index);
}

function eliminarProyecto(index) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    if (index > -1) {
        proyectos.splice(index, 1); // Eliminar el proyecto de la lista
        localStorage.setItem('proyectos', JSON.stringify(proyectos)); // Guardar de nuevo en localStorage

        // Eliminar la fila de la tabla sin recargar la página
        const tablaProyectos = document.getElementById('proyectos-lista').getElementsByTagName('tbody')[0];
        tablaProyectos.deleteRow(index);

        // Actualizar las estadísticas
        actualizarEstadisticas(proyectos);
    }
}

// Función para agregar un proyecto
function agregarProyecto(nombre, inicio, vencimiento, estado) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    // Asegurarse de que los valores estén bien definidos
    if (!nombre || !inicio || !vencimiento || !estado) {
        alert('Por favor, complete todos los campos del proyecto');
        return;
    }

    const nuevoProyecto = {
        nombre: nombre,
        inicio: inicio,
        vencimiento: vencimiento,
        estado: estado,
        tareas: []  // Asegúrate de tener un arreglo de tareas vacío, si corresponde
    };

    proyectos.push(nuevoProyecto);
    localStorage.setItem('proyectos', JSON.stringify(proyectos));

    // Redirigir a la página de proyectos para que se actualice la lista
    window.location.href = 'proyectoss.html';
}
