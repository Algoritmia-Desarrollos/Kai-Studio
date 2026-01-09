document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    
    // 1. INYECCIÓN DEL HTML (Centralizado)
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <div class="navbar-fixed-wrapper">
                <nav class="navbar liquidGlass-wrapper" id="main-nav">
                    <div class="liquidGlass-effect"></div>
                    <div class="liquidGlass-tint"></div>
                    <div class="liquidGlass-shine"></div>
                    
                    <div class="liquidGlass-content nav-content">
                        <a href="index.html" class="logo">
                            <span>A</span>Algoritmia
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
                </nav>
            </div>

            <div class="mobile-menu liquidGlass-wrapper" id="mobile-menu">
                <div class="liquidGlass-effect"></div>
                <div class="liquidGlass-tint"></div>
                <div class="liquidGlass-shine"></div>
                
                <div class="liquidGlass-content" style="flex-direction: column; align-items: flex-start; gap: 1.5rem;">
                    <a href="index.html#metodo" class="mobile-link">Método</a>
                    <a href="casos.html" class="mobile-link">Casos de Éxito</a>
                    <a href="contacto.html" class="mobile-link">Contacto</a>
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