/**
 * KAI STUDIO | MAIN ORCHESTRATOR
 * Vanilla JS - No Dependencies
 * Performance-First Approach
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initSmoothScroll();
    initMobileMenu();
    initAnimations();
});

/* =========================================
   1. NAVBAR SCROLL EFFECT
   ========================================= */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        }
    });
}

/* =========================================
   2. SMOOTH SCROLLING (Nativo + Fallback)
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                const mobileMenu = document.querySelector('.mobile-menu-overlay');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* =========================================
   3. ANIMATIONS (Intersection Observer)
   ========================================= */
function initAnimations() {
    // Configuración del observador
    const observerOptions = {
        threshold: 0.1, // Disparar cuando el 10% del elemento sea visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    // Elementos a animar (Añadir clase .reveal en HTML si se desea manual, 
    // o auto-seleccionar secciones clave)
    const elementsToAnimate = document.querySelectorAll('section > .container > *, .pillar-card, .btn');
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal-element');
        // Añadir delay escalonado para grids
        if(el.classList.contains('pillar-card')) {
            el.style.transitionDelay = `${index * 100}ms`;
        }
        observer.observe(el);
    });
}

/* =========================================
   4. MOBILE MENU (Dynamic Injection)
   ========================================= */
function initMobileMenu() {
    // Solo ejecutar en pantallas pequeñas si no existe el botón ya
    if (window.innerWidth > 768 || document.querySelector('.mobile-toggle')) return;

    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    // 1. Crear Botón Hamburguesa Minimalista
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-toggle';
    toggleBtn.innerHTML = '<i class="ph ph-list" style="font-size: 1.5rem;"></i>';
    toggleBtn.style.background = 'transparent';
    toggleBtn.style.border = 'none';
    toggleBtn.style.cursor = 'pointer';
    
    // Insertar botón
    navContainer.appendChild(toggleBtn);

    // 2. Crear Overlay de Menú
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 'var(--header-height)';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = 'calc(100vh - var(--header-height))';
    overlay.style.background = 'var(--bg-body)';
    overlay.style.padding = '2rem';
    overlay.style.transform = 'translateX(100%)';
    overlay.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.gap = '2rem';
    overlay.style.zIndex = '999';

    // 3. Clonar enlaces para el móvil
    // (Extraemos los enlaces del nav original)
    if (navLinks) {
        const linksHTML = navLinks.innerHTML;
        overlay.innerHTML = linksHTML;
        
        // Ajustar estilos de los botones clonados para móvil
        const mobileButtons = overlay.querySelectorAll('.btn');
        mobileButtons.forEach(btn => {
            btn.style.width = '100%';
            btn.style.justifyContent = 'center';
        });
    }

    document.body.appendChild(overlay);

    // 4. Lógica de Toggle
    toggleBtn.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
    const overlay = document.querySelector('.mobile-menu-overlay');
    const icon = document.querySelector('.mobile-toggle i');
    const isActive = overlay.classList.contains('active');

    if (!isActive) {
        overlay.classList.add('active');
        overlay.style.transform = 'translateX(0)';
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
    } else {
        overlay.classList.remove('active');
        overlay.style.transform = 'translateX(100%)';
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    }
}