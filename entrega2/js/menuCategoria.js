document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.logoMenu');
    const menuCategory = document.querySelector('.menu');
    const overlay = document.querySelector('#overlay');
    const profileMenu = document.querySelector('.menuPerfil');

    // funcion para abrir/cerrar el menú de categorías
    function toggleMenuCategory() {
        if (!menuCategory.classList.contains('hidden')) {
            menuCategory.classList.add('hidden');
            if (profileMenu.classList.contains('hidden')) {
                overlay.classList.remove('active');
            }
        } else {
            if (!overlay.classList.contains('active')) {
                const totalHeight = document.documentElement.offsetHeight;
                overlay.style.height = `${totalHeight - 90}px`;
                overlay.classList.add('active');
            }
            if (!profileMenu.classList.contains('hidden')) {
                profileMenu.classList.add('hidden');
            }
            menuCategory.classList.remove('hidden');
        }
    }

    function closeMenuCategory(event) {
        if (!event.target.closest('.menu') && !event.target.closest('.logoMenu')) {
            menuCategory.classList.add('hidden');
            if (profileMenu.classList.contains('hidden')) {
                overlay.classList.remove('active');
            }
        }
    }

    menuButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleMenuCategory();
    });

    overlay.addEventListener('click', closeMenuCategory);

    document.addEventListener('click', closeMenuCategory);
});
