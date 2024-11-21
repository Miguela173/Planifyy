
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("form");
        const modal = document.getElementById("payment-modal");
        const cancelButton = document.getElementById("cancel-modal");

        // Abrir el modal al hacer clic en un botón de adquisición
        document.getElementById("adquirir-estandar").addEventListener("click", () => {
            modal.classList.remove("hidden");
        });
        
        document.getElementById("adquirir-premium").addEventListener("click", () => {
            modal.classList.remove("hidden");
        });

        // Cerrar el modal si el usuario cancela
        cancelButton.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        // Manejar el envío del formulario
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar que el formulario se envíe normalmente

            // Simular el pago exitoso
            Swal.fire({
                icon: 'success',
                title: '¡Pago exitoso!',
                text: 'Tu pago ha sido procesado correctamente.',
                confirmButtonText: 'Ir a Bienvenida'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirigir a welcome.html
                    window.location.href = 'welcome.html';
                }
            });

            // Ocultar el modal
            modal.classList.add("hidden");
        });
    });

