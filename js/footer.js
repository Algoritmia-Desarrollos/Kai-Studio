document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');
    const year = new Date().getFullYear();

    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer-main">
                <div class="container">
                    <div class="grid-3">
                        <div>
                            <a href="index.html" class="logo mb-4" style="font-size: 1.25rem;">
                                <span>A</span>Algoritmia
                            </a>
                            <p class="text-sm text-secondary" style="max-width: 250px;">
                                Growth Partner para negocios que buscan escalar su facturación, no sus excusas.
                            </p>
                        </div>

                        <div>
                            <h4 class="text-uppercase mb-4">Mapa del Sitio</h4>
                            <ul class="footer-links">
                                <li><a href="index.html#metodo">Nuestro Método</a></li>
                                <li><a href="casos.html">Casos de Éxito</a></li>
                                <li><a href="contacto.html">Contacto Directo</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="text-uppercase mb-4">Contacto</h4>
                            <ul class="footer-links">
                                <li>
                                    <a href="mailto:algoritmiadesarrollos@gmail.com">
                                        <i class="ph ph-envelope"></i> algoritmiadesarrollos@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wa.me/5493476245523">
                                        <i class="ph ph-whatsapp-logo"></i> +54 9 3476 24-5523
                                    </a>
                                </li>
                                <li class="text-sm text-secondary">
                                    <i class="ph ph-map-pin"></i> Rosario, Santa Fe, Argentina
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom mt-8" style="padding-top: 2rem; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <p class="text-sm text-secondary">© ${year} Algoritmia Desarrollos. Todos los derechos reservados.</p>
                        <div class="social-links flex-center" style="gap: 1rem;">
                            <a href="https://instagram.com/algoritmia_desarrollos" target="_blank" aria-label="Instagram" style="color: var(--text-primary); text-decoration: none;"><i class="ph ph-instagram-logo" style="font-size: 1.25rem;"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
});