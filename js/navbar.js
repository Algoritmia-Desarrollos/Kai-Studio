document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    
    // 1. INYECCIÓN DEL HTML (Asegúrate de que las rutas sean relativas)
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <div class="navbar-fixed-wrapper">
                <nav class="navbar liquidGlass-wrapper" id="main-nav">
                    <div class="liquidGlass-effect"></div>
                    <div class="liquidGlass-tint"></div>
                    <div class="liquidGlass-shine"></div>
                    
                    <div class="liquidGlass-content nav-content">
                        <a href="/" class="logo">
                            <span>A</span>Algoritmia
                        </a>

                        <ul class="nav-links desktop-only">
                            <li><a href="/clientes.html">Casos Reales</a></li>
                            <li><a href="/contacto.html">Contacto</a></li>
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
                </nav>
            </div>

            <div class="mobile-menu liquidGlass-wrapper" id="mobile-menu">
                <div class="liquidGlass-effect"></div>
                <div class="liquidGlass-tint"></div>
                <div class="liquidGlass-shine"></div>
                
                <div class="liquidGlass-content" style="flex-direction: column; align-items: flex-start; gap: 1.5rem;">
                    <a href="/" class="mobile-link">Inicio</a>
                    <a href="/clientes.html" class="mobile-link">Casos Reales</a>
                    <a href="/contacto.html" class="mobile-link">Contacto</a>
                    <hr style="opacity: 0.1; margin: 0.5rem 0; width: 100%; border-color: black;">
                    <a href="https://wa.me/5493476245523" class="btn btn-primary" onclick="fireConversion('whatsapp_mobile')" style="width: 100%;">
                        Pedir Auditoría
                    </a>
                </div>
            </div>
            
            <svg style="display: none">
                <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
                    <feComponentTransfer in="turbulence" result="mapped">
                        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
                        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
                    </feComponentTransfer>
                    <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
                    <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lighting-color="white" result="specLight">
                        <fePointLight x="-200" y="-200" z="300" />
                    </feSpecularLighting>
                    <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
                    <feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
        `;
        
        // Iniciamos la lógica inmediatamente después de inyectar el HTML
        initNavbarLogic();
    }
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