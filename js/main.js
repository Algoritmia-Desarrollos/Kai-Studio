/**
 * KAI STUDIO | MAIN ORCHESTRATOR v2.0
 * Multi-Page Support + Mobile Injection
 * Performance-First Approach (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initSmoothScroll();
    initMobileMenu(); // Ahora soporta multi-página
    initAnimations();
    highlightCurrentPage(); // Nueva función táctica
});

/* =========================================
   1. NAVBAR SCROLL EFFECT (Glassmorphism)
   ========================================= */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Solo aplicar si existe la navbar
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.padding = '0.5rem 0'; // Reducir tamaño ligeramente
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.padding = '0';
        }
    });
}

/* =========================================
   2. SMOOTH SCROLLING (Nativo + Fallback)
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Si es solo "#" o enlace externo, ignorar
            if (targetId === '#' || targetId.length < 2) return;
            
            // Verificar si el elemento existe en ESTA página
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Cerrar menú móvil si está abierto
                toggleMobileMenu(false);

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Si no existe (ej: estamos en contacto.html y el link es #metodo),
            // el navegador seguirá el enlace normal hacia index.html#metodo
        });
    });
}

/* =========================================
   3. ANIMATIONS (Scroll Reveal)
   ========================================= */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar elementos clave para animar
    const elementsToAnimate = document.querySelectorAll('.hero-wrapper > .container > *, .pillar-card, .card, section h2, section p, .btn');
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal-element');
        
        // Delay escalonado para tarjetas (Pilar 1, Pilar 2, etc.)
        if(el.classList.contains('pillar-card') || el.classList.contains('card')) {
            // Usamos el índice relativo dentro de su contenedor padre si es posible, 
            // simplificado aquí con un delay base
             el.style.transitionDelay = `${(index % 3) * 100}ms`; 
        }
        
        observer.observe(el);
    });
}

/* =========================================
   4. MOBILE MENU (Dynamic Injection v2)
   ========================================= */
function initMobileMenu() {
    // Evitar duplicados
    if (document.querySelector('.mobile-toggle')) return;

    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links'); // Fuente original

    if (!navContainer || !navLinks) return;

    // A. Botón Hamburguesa
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-toggle';
    toggleBtn.innerHTML = '<i class="ph ph-list" style="font-size: 2rem;"></i>'; // Icono más grande
    toggleBtn.setAttribute('aria-label', 'Abrir menú');
    toggleBtn.style.background = 'transparent';
    toggleBtn.style.border = 'none';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.padding = '0.5rem';
    toggleBtn.style.color = 'var(--text-primary)';
    
    navContainer.appendChild(toggleBtn);

    // B. Overlay de Menú
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    
    // Estilos críticos inyectados por JS para asegurar funcionamiento sin CSS extra
    Object.assign(overlay.style, {
        position: 'fixed',
        top: 'var(--header-height, 5rem)', // Usa la variable CSS
        left: '0',
        width: '100%',
        height: 'calc(100vh - var(--header-height, 5rem))',
        background: 'var(--bg-body, #fff)',
        padding: '2rem',
        transform: 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        zIndex: '998',
        borderTop: '1px solid var(--border-light)'
    });

    // C. Clonar y Adaptar Enlaces
    const linksHTML = navLinks.innerHTML;
    overlay.innerHTML = linksHTML;
    
    // Ajustar botones dentro del overlay
    const mobileButtons = overlay.querySelectorAll('a');
    mobileButtons.forEach(btn => {
        btn.style.width = '100%';
        btn.style.display = 'flex';
        btn.style.justifyContent = 'center';
        btn.style.fontSize = '1.25rem'; // Texto más grande en móvil
        btn.style.padding = '1rem';
        
        // Cerrar menú al hacer click
        btn.addEventListener('click', () => toggleMobileMenu(false));
    });

    document.body.appendChild(overlay);

    // D. Evento Toggle
    toggleBtn.addEventListener('click', () => toggleMobileMenu());
}

function toggleMobileMenu(forceState = null) {
    const overlay = document.querySelector('.mobile-menu-overlay');
    const icon = document.querySelector('.mobile-toggle i');
    
    if (!overlay || !icon) return;

    const isOpen = overlay.classList.contains('active');
    const shouldOpen = forceState !== null ? forceState : !isOpen;

    if (shouldOpen) {
        overlay.classList.add('active');
        overlay.style.transform = 'translateX(0)';
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
        document.body.style.overflow = 'hidden'; // Bloquear scroll del body
    } else {
        overlay.classList.remove('active');
        overlay.style.transform = 'translateX(100%)';
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

/* =========================================
   5. AUTO-HIGHLIGHT (Para el Menú Móvil)
   ========================================= */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const overlayLinks = document.querySelectorAll('.mobile-menu-overlay a');
    
    overlayLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Lógica simple de coincidencia
        if (href === '/' && currentPath === '/') {
            link.style.color = 'var(--text-primary)';
            link.style.fontWeight = '700';
            link.style.background = 'var(--bg-surface)';
            link.style.borderRadius = '8px';
        } else if (href.length > 1 && currentPath.includes(href)) {
            link.style.color = 'var(--text-primary)';
            link.style.fontWeight = '700';
            link.style.background = 'var(--bg-surface)';
            link.style.borderRadius = '8px';
        }
    });
}