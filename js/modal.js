document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("payment-modal");
    const openButtons = [document.getElementById("adquirir-estandar"), document.getElementById("adquirir-premium")];
    const cancelButton = document.getElementById("cancel-modal");

    // Mostrar el modal
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.classList.remove("hidden");
        });
    });

    // Ocultar el modal
    cancelButton.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Manejar el formulario de pago
    const form = modal.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        // Mostrar alerta con SweetAlert
        Swal.fire({
            icon: "success",
            title: "¡Pago exitoso!",
            text: "Tarjeta validada, pago exitoso.",
            confirmButtonText: "Aceptar",
            customClass: {
                confirmButton: "bg-green-500 text-white px-4 py-2 rounded"
            }
        }).then(() => {
            modal.classList.add("hidden"); // Cerrar el modal después de la alerta
            form.reset(); // Limpiar el formulario
        });
    });
});
