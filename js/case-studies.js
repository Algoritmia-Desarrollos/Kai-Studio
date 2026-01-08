export function initCaseStudies() {
    const caseLinks = document.querySelectorAll('.case-link');
    
    caseLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Logic for modal or smooth page transition
            console.log('Loading case study:', link.dataset.case);
        });
    });
}
