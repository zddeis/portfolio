function initCarousel() {
    const container = document.querySelector('.skills-wrapper');
    const items = container.children;
    const itemsPerPage = 4;
    let currentPage = 0;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    function updateButtons() {
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage >= totalPages - 1;
    }

    function goToPage(page) {
        currentPage = page;
        const offset = -page * (container.offsetWidth + 32); // 32px is the gap
        container.style.transform = `translateX(${offset}px)`;
        updateButtons();
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    });

    // Initial setup
    updateButtons();
}