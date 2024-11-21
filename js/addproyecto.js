// Función para abrir el modal
function abrirModal() {
    document.getElementById("modalAgregarProyecto").classList.remove("hidden");
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modalAgregarProyecto").classList.add("hidden");
}

// Función para agregar el proyecto
document.getElementById("formAgregarProyecto").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombreProyecto").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const estado = document.getElementById("estadoProyecto").value;

    // Crear una nueva fila en la tabla
    const table = document.querySelector("#proyectos table tbody");
    const newRow = document.createElement("tr");
    
    newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${fechaInicio}</td>
        <td>${fechaVencimiento}</td>
        <td>${estado}</td>
        <td><button>Ver</button> <button>Editar</button></td>
    `;
    
    table.appendChild(newRow);

    // Limpiar el formulario y cerrar el modal
    document.getElementById("formAgregarProyecto").reset();
    cerrarModal();
});

// Hacer que el botón de "Agregar Proyecto" abra el modal
document.querySelector(".add-btn").addEventListener("click", abrirModal);
