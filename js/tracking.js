/**
 * KAI STUDIO | TRACKING SUITE (GA4 + META PIXEL)
 * Central Intelligence for Growth
 * * Instrucciones:
 * 1. Reemplaza 'G-XXXXXXXXXX' con tu ID de Google Analytics 4.
 * 2. Reemplaza '0000000000000000' con tu ID de Meta Pixel.
 */

const TRACKING_CONFIG = {
    ga4_id: 'G-XXXXXXXXXX', // <--- TU NUEVO ID DE GA4 AQUÍ
    pixel_id: '0000000000000000', // <--- TU NUEVO PIXEL ID AQUÍ
    debug_mode: true // Pon en 'false' cuando subas a producción
};

/* =========================================
   1. INYECTOR DE SCRIPTS (Carga Diferida)
   Para no afectar la velocidad inicial (Lighthouse 100)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Retrasamos la carga 2 segundos o hasta interacción del usuario
    setTimeout(loadAnalytics, 2000);
});

function loadAnalytics() {
    if (window.analyticsLoaded) return;
    window.analyticsLoaded = true;
    
    if(TRACKING_CONFIG.debug_mode) console.log('🛡️ Kai Tracking: Inyectando scripts...');

    // --- GOOGLE ANALYTICS 4 ---
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_CONFIG.ga4_id}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', TRACKING_CONFIG.ga4_id);

    // --- META PIXEL ---
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', TRACKING_CONFIG.pixel_id);
    fbq('track', 'PageView');
}

/* =========================================
   2. FUNCIÓN DE CONVERSIÓN UNIFICADA
   Usa esto en tus botones: onclick="fireConversion('whatsapp_click')"
   ========================================= */
window.fireConversion = function(eventName, params = {}) {
    if(TRACKING_CONFIG.debug_mode) {
        console.log(`🎯 CONVERSIÓN DISPARADA: ${eventName}`, params);
    }

    // Disparar GA4
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }

    // Disparar Meta Pixel
    if (typeof window.fbq === 'function') {
        // Mapeo de eventos estándar si es necesario, sino usa CustomEvent
        window.fbq('trackCustom', eventName, params);
    }
}

/* =========================================
   3. AUTO-TAGGING DE BOTONES
   Busca automáticamente botones de WhatsApp y les añade tracking
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]');
    
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            fireConversion('contact_whatsapp', {
                location: 'header_or_hero', // Podrías hacerlo dinámico
                label: btn.innerText
            });
        });
    });
});