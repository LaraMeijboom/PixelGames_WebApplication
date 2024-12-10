document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.querySelector('.botonMenuPerfil');
    const profileMenu = document.querySelector('.menuPerfil');
    const overlay = document.querySelector('#overlay');
    const menuCategory = document.querySelector('.menu'); 

    function toggleMenuProfile() {
        if (!profileMenu.classList.contains('hidden')) {
            profileMenu.classList.add('hidden');
            if (menuCategory.classList.contains('hidden')) {
                overlay.classList.remove('active');
            }
        } else {
            if (!overlay.classList.contains('active')) {
                const totalHeight = document.documentElement.offsetHeight;
                overlay.style.height = `${totalHeight - 90}px`;
                overlay.classList.add('active');
            }
            if (!menuCategory.classList.contains('hidden')) {
                menuCategory.classList.add('hidden');
            }
            profileMenu.classList.remove('hidden');
        }
    }

    function closeMenuProfiley(event) {
        if (!event.target.closest('.menuPerfil') && !event.target.closest('.botonMenuPerfil')) {
            profileMenu.classList.add('hidden');
            if (menuCategory.classList.contains('hidden')) {
                overlay.classList.remove('active');
            }
        }
    }

    profileButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleMenuProfile();
    });

    overlay.addEventListener('click', closeMenuProfiley);
    
    document.addEventListener('click', closeMenuProfiley);
});



