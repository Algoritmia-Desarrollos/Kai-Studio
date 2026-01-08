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
});