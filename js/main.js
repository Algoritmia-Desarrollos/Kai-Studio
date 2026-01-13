document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Main.js cargado - Algoritmia");

    // 1. REVEAL ANIMATION (Aparecer al hacer scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Activa la animación un poco antes
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar para ganar rendimiento
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach(el => observer.observe(el));

    // Fallback: Si el usuario tiene preferencias de movimiento reducido o JS falla
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        hiddenElements.forEach(el => el.classList.add('active'));
    }
    
    // Fallback de seguridad: Forzar visibilidad después de 3 segundos si algo falla
    setTimeout(() => {
        hiddenElements.forEach(el => {
            if (getComputedStyle(el).opacity === '0') {
                el.classList.add('active');
            }
        });
    }, 3000);

    // 2. TIMELINE CENTERING (Optimized with requestAnimationFrame)
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    checkTimelineScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        function checkTimelineScroll() {
            const viewportCenter = window.innerHeight / 2;
            let closestItem = null;
            let minDistance = Infinity;

            timelineItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(viewportCenter - itemCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestItem = item;
                }
            });

            timelineItems.forEach(item => {
                if (item === closestItem) {
                    item.classList.add('active-center');
                } else {
                    item.classList.remove('active-center');
                }
            });
        }
    }

    // 3. CARRUSEL DE CASOS (Lógica Manual)
    initCarousel();
});

function initCarousel() {
    const slides = document.querySelectorAll('.case-slide');
    const nextBtn = document.querySelector('.next-case');
    const prevBtn = document.querySelector('.prev-case');
    
    // Si no hay slides, no hacemos nada (evita errores en páginas sin carrusel)
    if (slides.length === 0) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
}