function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function agregarTarea() {
    const nombreTarea = document.getElementById('nombreTarea').value;
    const asignarA = document.getElementById('asignarA').value;
    const fechaLimite = document.getElementById('fechaLimite').value;
    const estadoTarea = document.getElementById('estadoTarea').value;

    const listaTareas = document.getElementById('taskList');
    const nuevaTarea = document.createElement('li');
    nuevaTarea.innerText = `${nombreTarea} - Asignada a: ${asignarA} - Fecha límite: ${fechaLimite} - Estado: ${estadoTarea}`;
    listaTareas.appendChild(nuevaTarea);

    cerrarModal('asignarModal');
}

function marcarCompletado() {
    alert("Proyecto marcado como completado.");
    cerrarModal('completadoModal');
}

function borrarProyecto() {
    alert("Proyecto eliminado.");
    cerrarModal('borrarModal');
}

function editarDescripcion() {
    const descripcionProyecto = document.getElementById('descripcionProyecto').value;
    document.getElementById('projectDescription').innerText = descripcionProyecto;
    cerrarModal('editarModal');
}
