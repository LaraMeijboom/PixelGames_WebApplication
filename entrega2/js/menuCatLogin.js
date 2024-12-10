document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.logoMenu');
    const menuCategory = document.querySelector('.menu');
    const overlay = document.querySelector('#overlay');

    // fyvnción para abrir/cerrar el menú y el overlay
    function toggleMenuCategory() {
        if (!overlay.classList.contains('active')) {
            const totalHeight = document.documentElement.offsetHeight;
            overlay.style.height = `${totalHeight - 90}px`; 
        }
        menuCategory.classList.toggle('hidden'); 
        overlay.classList.toggle('active');   
    }

    // cierra el menú al hacer clic fuera de él
    function closeMenuCategory(event) {
        if (!event.target.closest('.menu') && !event.target.closest('.logoMenu')) {
            menuCategory.classList.add('hidden');
            overlay.classList.remove('active');
        }
    }

    menuButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleMenuCategory();
    });

    overlay.addEventListener('click', closeMenuCategory);

    document.addEventListener('click', closeMenuCategory);
});