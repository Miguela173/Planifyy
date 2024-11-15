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
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        login(); // Cambia a la vista de inicio de sesión
    } else {
        alert("Por favor, completa todos los campos.");
    }
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
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        login(); // Cambia a la vista de inicio de sesión
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Función para validar el inicio de sesión
function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        alert("Inicio de sesión exitoso");
        window.location.href = "index.html";
    } else {
        alert("Nombre de usuario o contraseña incorrectos");
    }
}