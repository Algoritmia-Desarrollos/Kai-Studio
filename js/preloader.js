/**
 * KAI STUDIO | PRELOADER
 * Bloquea la vista hasta que todo el sitio (imágenes + scripts) esté listo.
 */

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    
    if (preloader) {
        // Pequeño delay de seguridad para que la transición se vea suave
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.pointerEvents = "none"; // Permitir clicks en la web
            
            // Eliminar del DOM después de la animación para limpiar memoria
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 800); // 0.8 segundos mínimos de logo para branding
    }
});