// js/main.js - Versión Blindada
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Main.js cargado correctamente");

    // 1. OBSERVER DE ANIMACIONES (Reveal)
    const observerOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Dejar de observar una vez animado (Mejora performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos con clase .reveal
    const hiddenElements = document.querySelectorAll('.reveal');
    if (hiddenElements.length === 0) console.warn("⚠️ No encontré elementos .reveal");
    
    hiddenElements.forEach(el => observer.observe(el));

    // 2. TIMELINE SCROLL FOCUS (Centro de pantalla)
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const handleScroll = () => {
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
        };

        // Escuchar scroll y ejecutar al inicio
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Ejecutar una vez al cargar
    }
});

/* --- LOGICA CARRUSEL DE CASOS --- */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.case-slide');
    const nextBtn = document.querySelector('.next-case');
    const prevBtn = document.querySelector('.prev-case');
    let currentSlide = 0;

    function showSlide(index) {
        // Ocultar todos
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Calcular índice cíclico
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Mostrar nuevo
        slides[currentSlide].classList.add('active');
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
});