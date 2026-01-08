/**
 * KAI STUDIO | MAIN LOGIC v3.0 (Fixed)
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initMobileMenu(); 
    initAnimations();
});

/* 1. NAVBAR SCROLL (Efecto Vidrio) */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        }
    });
}

/* 2. MENÚ MÓVIL (Inyección & Control) */
function initMobileMenu() {
    // Si ya existe, no duplicar
    if (document.querySelector('.mobile-toggle')) return;

    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    if (!navContainer || !navLinks) return;

    // A. Crear Botón
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-toggle'; // Clase controlada por CSS
    toggleBtn.innerHTML = '<i class="ph ph-list"></i>';
    toggleBtn.setAttribute('aria-label', 'Menu');
    
    // Insertamos el botón en la barra
    navContainer.appendChild(toggleBtn);

    // B. Crear el Overlay (Menú desplegable)
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    // Estilos inline críticos para el overlay (para asegurar funcionamiento)
    Object.assign(overlay.style, {
        position: 'fixed', top: '5rem', left: '0', width: '100%', height: '100vh',
        background: '#fff', padding: '2rem', transform: 'translateX(100%)',
        transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column',
        gap: '2rem', zIndex: '990', borderTop: '1px solid #eee'
    });

    // C. Copiar enlaces
    overlay.innerHTML = navLinks.innerHTML;
    
    // Ajustar enlaces del móvil
    const mobileLinks = overlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.style.width = '100%'; 
        link.style.fontSize = '1.2rem';
        link.addEventListener('click', () => toggleMenu(false));
    });

    document.body.appendChild(overlay);

    // D. Lógica de Apertura/Cierre
    toggleBtn.addEventListener('click', () => toggleMenu());

    function toggleMenu(forceState = null) {
        const isOpen = overlay.classList.contains('active');
        const shouldOpen = forceState !== null ? forceState : !isOpen;
        const icon = toggleBtn.querySelector('i');

        if (shouldOpen) {
            overlay.classList.add('active');
            overlay.style.transform = 'translateX(0)';
            if(icon) { icon.classList.remove('ph-list'); icon.classList.add('ph-x'); }
        } else {
            overlay.classList.remove('active');
            overlay.style.transform = 'translateX(100%)';
            if(icon) { icon.classList.remove('ph-x'); icon.classList.add('ph-list'); }
        }
    }
}

/* 3. ANIMACIONES (Simple Reveal) */
function initAnimations() {
    const elements = document.querySelectorAll('section > .container > *');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}