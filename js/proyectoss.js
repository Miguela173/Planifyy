// Array de proyectos global
let proyectos = [];

// Cargar los proyectos desde localStorage al cargar la página
function cargarProyectos() {
    const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
    proyectos = proyectosGuardados;
    actualizarTabla();
}

// Función para actualizar la tabla de proyectos
function actualizarTabla() {
    const tablaBody = document.getElementById('tabla-body');
    tablaBody.innerHTML = ''; // Limpiar la tabla antes de actualizar

    proyectos.forEach((proyecto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = 
            `<td class="px-4 py-2 border">${proyecto.nombre}</td>
            <td class="px-4 py-2 border">${proyecto.fechaInicio || 'Fecha no definida'}</td> <!-- Validar fechaInicio -->
            <td class="px-4 py-2 border">${proyecto.fechaLimite || 'Fecha no definida'}</td> <!-- Validar fechaLimite -->
            <td class="px-4 py-2 border">${proyecto.importancia}</td>
            <td class="px-4 py-2 border">
                <button onclick="mostrarModalEliminar(${index})" class="text-black hover:bg-red-600 hover:text-white flex items-center space-x-2">
                    <i class="fas fa-trash"></i> 
                    <span>Eliminar Proyecto</span>
                </button>
            </td>
            <td class="px-4 py-2 border">
                <ul>
                    ${proyecto.tareas.map((tarea, tareaIndex) => 
                        `<li class="mb-2 border-b pb-2">
                            ${tarea.nombreTarea} - Estado: ${tarea.estado}
                            <br>Asignado a: ${tarea.asignado}
                            <br>Fecha Límite: ${tarea.fechaLimiteTarea}
                            <div class="mt-2 flex space-x-2">
                                <button onclick="mostrarModalEliminarTarea(${index}, ${tareaIndex})" class="text-red-600 hover:bg-red-500 hover:text-white transition-all flex items-center space-x-2">
                                    <i class="fas fa-trash"></i>
                                    <span>Eliminar Tarea</span>
                                </button>
                                <button onclick="marcarComoCompletada(${index}, ${tareaIndex})" class="text-green-600 hover:text-white">✔ Completar</button>
                            </div>
                        </li>`).join('')}
                </ul>
            </td>
            <td class="px-4 py-2 border">
                <button onclick="abrirModalTarea(${index})" class="text-black hover:text-white hover:bg-blue-600">Asignar Tarea</button>
            </td>`;
        tablaBody.appendChild(fila);
    });
}

// Función para agregar un nuevo proyecto
document.getElementById('form-proyecto').addEventListener('submit', function (e) {
    e.preventDefault();

    if (proyectos.length >= 3) {
        const modalLimite = document.getElementById('modal-limite');
        modalLimite.classList.remove('hidden');
        
        document.getElementById('cerrar-modal-limite').onclick = function () {
            modalLimite.classList.add('hidden');
        };

        return;
    }

    const nombre = document.getElementById('nombre-proyecto').value;
    const importancia = document.getElementById('importancia').value;
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaLimite = document.getElementById('fecha-limite').value;

    // Validación de fechas
    if (!fechaInicio || !fechaLimite) {
        alert('Por favor, ingresa ambas fechas.');
        return;
    }

    const nuevoProyecto = {
        nombre,
        importancia,
        fechaInicio,  // Asegurarnos de que se guarde la fecha correctamente
        fechaLimite,  // Asegurarnos de que se guarde la fecha correctamente
        tareas: []
    };

    let proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
    proyectosGuardados.push(nuevoProyecto);

    localStorage.setItem('proyectos', JSON.stringify(proyectosGuardados));

    proyectos = proyectosGuardados;
    actualizarTabla();
});

// Función para eliminar un proyecto
function eliminarProyecto(index) {
    // Eliminar el proyecto de la lista de proyectos
    proyectos.splice(index, 1);

    // Guardar los proyectos actualizados en localStorage
    localStorage.setItem('proyectos', JSON.stringify(proyectos));

    // Actualizar la tabla
    actualizarTabla();
}

// Función para mostrar el modal de confirmación de eliminación de proyecto
function mostrarModalEliminar(index) {
    const modalEliminar = document.getElementById('modal-eliminar');
    modalEliminar.classList.remove('hidden');

    const confirmarEliminar = document.getElementById('confirmar-eliminar');
    const cancelarEliminar = document.getElementById('cancelar-eliminar');

    confirmarEliminar.onclick = function () {
        eliminarProyecto(index);
        modalEliminar.classList.add('hidden');
    };

    cancelarEliminar.onclick = function () {
        modalEliminar.classList.add('hidden');
    };
}

// Función para eliminar una tarea
function eliminarTarea(proyectoIndex, tareaIndex) {
    proyectos[proyectoIndex].tareas.splice(tareaIndex, 1);

    // Guardar los cambios en localStorage
    localStorage.setItem('proyectos', JSON.stringify(proyectos));

    // Actualizar la tabla
    actualizarTabla();
}

// Función para mostrar el modal de confirmación de eliminación de tarea
function mostrarModalEliminarTarea(proyectoIndex, tareaIndex) {
    const modalEliminarTarea = document.getElementById('modal-eliminar-tarea');
    modalEliminarTarea.classList.remove('hidden');

    const confirmarEliminarTarea = document.getElementById('confirmar-eliminar-tarea');
    const cancelarEliminarTarea = document.getElementById('cancelar-eliminar-tarea');

    confirmarEliminarTarea.onclick = function () {
        eliminarTarea(proyectoIndex, tareaIndex);
        modalEliminarTarea.classList.add('hidden');
    };

    cancelarEliminarTarea.onclick = function () {
        modalEliminarTarea.classList.add('hidden');
    };
}

// Función para marcar una tarea como completada
function marcarComoCompletada(proyectoIndex, tareaIndex) {
    proyectos[proyectoIndex].tareas[tareaIndex].estado = 'completada';
    // Guardar los cambios en localStorage
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    // Actualizar la tabla
    actualizarTabla();
}

// Función para abrir el modal de asignar tarea
function abrirModalTarea(proyectoIndex) {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden'); // Muestra el modal
    const formTarea = document.getElementById('form-tarea');

    // Limpiar los campos del formulario antes de mostrar el modal
    formTarea.reset();

    // Asegurarnos de que el evento submit solo se registre una vez
    formTarea.onsubmit = function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombreTarea = document.getElementById('nombre-tarea').value;
        const asignado = document.getElementById('asignado').value;
        const fechaLimiteTarea = document.getElementById('fecha-limite-tarea').value;
        const estado = document.getElementById('estado-tarea').value;

        // Validar que los campos no estén vacíos
        if (nombreTarea && asignado && fechaLimiteTarea && estado) {
            const nuevaTarea = {
                nombreTarea,
                asignado,
                fechaLimiteTarea,
                estado
            };

            // Agregar la tarea al proyecto
            proyectos[proyectoIndex].tareas.push(nuevaTarea);

            // Guardar los cambios en localStorage
            localStorage.setItem('proyectos', JSON.stringify(proyectos));

            // Actualizar la tabla con los nuevos proyectos y tareas
            actualizarTabla();

            // Cerrar el modal
            modal.classList.add('hidden');
        } else {
            alert('Por favor, complete todos los campos de la tarea.');
        }
    };

    // Función para cerrar el modal sin guardar cambios
    const cancelarTarea = document.getElementById('cancelar-tarea');
    cancelarTarea.onclick = function () {
        modal.classList.add('hidden'); // Ocultar el modal
    };
}

// Cargar proyectos al inicio
cargarProyectos();
