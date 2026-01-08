/**
 * KAI STUDIO | COMPONENT LOADER
 * Inyecta Navbar y Footer dinámicamente.
 * Maneja el Active State automáticamente.
 */

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar-container", "components/navbar.html", initNavbarLogic);
    loadComponent("footer-container", "components/footer.html", null);
});

function loadComponent(containerId, filePath, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading ${filePath}`);
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error("Component Loader Error:", err));
}

// Lógica post-carga del Navbar (Active State + Mobile Menu)
function initNavbarLogic() {
    // 1. Marcar enlace activo
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Lógica simple: si el href está en la url actual, es active
        if (href === '/' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else if (href.length > 1 && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });

    // 2. Reiniciar el menú móvil (importado de main.js)
    if (typeof initMobileMenu === 'function') {
        initMobileMenu();
    }
}