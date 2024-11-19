// Cargar los proyectos desde localStorage al cargar la página
function cargarProyectos() {
    // Si no hay proyectos guardados, inicializamos un array vacío
    const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
    proyectos = proyectosGuardados;
    // Actualizamos la tabla con los proyectos cargados
    actualizarTabla();
}

// Array de proyectos global
let proyectos = [];

// Función para actualizar la tabla de proyectos
function actualizarTabla() {
    const tablaBody = document.getElementById('tabla-body');
    tablaBody.innerHTML = '';  // Limpiar la tabla antes de actualizar

    proyectos.forEach((proyecto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="px-4 py-2 border">${proyecto.nombre}</td>
            <td class="px-4 py-2 border">${proyecto.fechaInicio}</td>
            <td class="px-4 py-2 border">${proyecto.fechaLimite}</td>
            <td class="px-4 py-2 border">${proyecto.importancia}</td>
            <td class="px-4 py-2 border">
                <button onclick="mostrarModalEliminar(${index})" class="text-black hover:bg-red-600 hover:text-white">Eliminar</button>
            </td>
            <td class="px-4 py-2 border">
                <ul>
                    ${proyecto.tareas.map((tarea, tareaIndex) => `
                        <li class="mb-2 border-b pb-2">
                            ${tarea.nombreTarea} - Estado: ${tarea.estado}
                            <br>Asignado a: ${tarea.asignado}
                            <br>Fecha Limite: ${tarea.fechaLimiteTarea}
                            <div class="mt-2 flex space-x-2">
                                <button onclick="mostrarModalEliminarTarea(${index}, ${tareaIndex})" class="text-red-600 hover:bg-red-500 hover:text-white transition-all flex items-center space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
    <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
  </svg>
  <span>Eliminar</span>
</button>

                                <button onclick="marcarComoCompletada(${index}, ${tareaIndex})" class="text-green-600 hover:text-white">✔ Completar</button>
                            </div>
                        </li>`).join('')}
                </ul>
            </td>
            <td class="px-4 py-2 border">
                <button onclick="abrirModalTarea(${index})" class="text-blue-600 hover:text-blue-800">Asignar Tarea</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}
// Función para agregar un nuevo proyecto
document.getElementById('form-proyecto').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre-proyecto').value;
    const importancia = document.getElementById('importancia').value;
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaLimite = document.getElementById('fecha-limite').value;

    const nuevoProyecto = {
        nombre,
        importancia,
        fechaInicio,
        fechaLimite,
        tareas: []
    };

    // Recuperar proyectos desde localStorage
    let proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
    proyectosGuardados.push(nuevoProyecto);

    // Guardar los proyectos actualizados en localStorage
    localStorage.setItem('proyectos', JSON.stringify(proyectosGuardados));

    // Actualizar la variable global y la tabla
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
    document.getElementById('modal').classList.remove('hidden');
    const formTarea = document.getElementById('form-tarea');

    // Limpiar los campos del formulario antes de mostrar el modal
    formTarea.reset();

    // Asegurarnos de que el evento submit solo se registre una vez
    formTarea.onsubmit = function (e) {
        e.preventDefault();

        const nombreTarea = document.getElementById('nombre-tarea').value;
        const asignado = document.getElementById('asignado').value;
        const fechaLimiteTarea = document.getElementById('fecha-limite-tarea').value;
        const estado = document.getElementById('estado-tarea').value;

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

        // Actualizar la tabla
        actualizarTabla();

        // Cerrar el modal
        document.getElementById('modal').classList.add('hidden');
    };
}

// Cargar los proyectos cuando la página se carga
window.onload = cargarProyectos;
