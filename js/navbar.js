document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    
    // 1. INYECCIÓN DEL HTML (Centralizado)
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar" id="main-nav">
                <div class="container nav-content">
                    <a href="index.html" class="logo">
                        <span>K</span> Kai Studio
                    </a>

                    <ul class="nav-links desktop-only">
                        <li><a href="index.html#metodo">Método</a></li>
                        <li><a href="casos.html">Casos</a></li>
                        <li><a href="contacto.html">Contacto</a></li>
                    </ul>

                    <div class="nav-actions">
                        <a href="https://wa.me/5493476245523" class="btn btn-primary btn-sm mobile-hidden" onclick="fireConversion('whatsapp_nav')">
                            Auditoría Gratis
                        </a>
                        
                        <button class="hamburger" id="mobile-toggle" aria-label="Menú">
                            <i class="ph ph-list" style="font-size: 1.5rem;"></i>
                        </button>
                    </div>
                </div>

                <div class="mobile-menu" id="mobile-menu">
                    <a href="index.html#metodo" class="mobile-link">Método</a>
                    <a href="casos.html" class="mobile-link">Casos de Éxito</a>
                    <a href="contacto.html" class="mobile-link">Contacto</a>
                    <hr style="opacity: 0.1; margin: 1rem 0;">
                    <a href="https://wa.me/5493476245523" class="btn btn-primary" onclick="fireConversion('whatsapp_mobile')">
                        Pedir Auditoría
                    </a>
                </div>
            </nav>
        `;
        
        initNavbarLogic();
    }
});

function initNavbarLogic() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    const icon = toggle.querySelector('i');

    // 2. LOGICA SCROLL (Efecto Glass)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. MENU MÓVIL (Toggle)
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('active');
        
        if (isOpen) {
            menu.classList.remove('active');
            icon.classList.replace('ph-x', 'ph-list');
        } else {
            menu.classList.add('active');
            icon.classList.replace('ph-list', 'ph-x');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            icon.classList.replace('ph-x', 'ph-list');
        });
    });
}