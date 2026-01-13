document.addEventListener('DOMContentLoaded', () => {
    // La inyección de HTML se ha movido a index.html para evitar CLS
    initNavbarLogic();
});

function initNavbarLogic() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    
    // Verificamos que los elementos existan para evitar errores en consola
    if (!nav || !toggle || !menu) return;

    const icon = toggle.querySelector('i');

    // 2. LÓGICA SCROLL (Efecto Glass al bajar)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. MENÚ MÓVIL (Abrir/Cerrar)
    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita clics fantasma
        const isOpen = menu.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar menú al hacer clic en un enlace
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Funciones auxiliares para mantener el código limpio
    function openMenu() {
        menu.classList.add('active');
        if(icon) icon.classList.replace('ph-list', 'ph-x');
    }

    function closeMenu() {
        menu.classList.remove('active');
        if(icon) icon.classList.replace('ph-x', 'ph-list');
    }
    
    // Detectar página activa (Active State)
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        // Lógica simple para detectar si estamos en la página del enlace
        if (link.getAttribute('href') === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            // No hacemos nada o agregamos clase active si quieres
        } else if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active-link'); // Asegúrate de tener estilos para .active-link en CSS
        }
    });
}