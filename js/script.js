// Elementos para alternar entre login y registro
var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

// Función para manejar el registro de nuevos usuarios
function registerUser() {
    const nombre = document.querySelector('#register .input-field[placeholder="Nombre"]').value;
    const apellido = document.querySelector('#register .input-field[placeholder="Apellido"]').value;
    const correo = document.querySelector('#register .input-field[placeholder="Correo"]').value;
    const password = document.querySelector('#register .input-field[placeholder="Contraseña"]').value;

    if (nombre && apellido && correo && password) {
        const user = { nombre, apellido, correo, password };
        localStorage.setItem(correo, JSON.stringify(user));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro exitoso",
            text: "Ahora puedes iniciar sesión.",
            showConfirmButton: false,
            timer: 1500
        });
        login(); // Cambia a la vista de inicio de sesión
    } else {
        Swal.fire({
            icon: "warning",
            title: "Faltan campos",
            text: "Por favor, completa todos los campos.",
            confirmButtonText: "Entendido"
        });
    }
}

function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        Swal.fire({
            position: "center", // Modal centrado
            icon: "success",
            title: "Inicio de sesión exitoso",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } else {
        Swal.fire({
            icon: "error",
            position: "center", // Modal centrado
            title: "Error",
            text: "Nombre de usuario o contraseña incorrectos.",
            confirmButtonText: "Intentar de nuevo",
            customClass: {
                confirmButton: 'custom-confirm-button' // Aplica la clase personalizada
            },
            buttonsStyling: false // Desactiva el estilo de botones predeterminado
        });
    }
}
