function showMenu() {
    if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
        var elementA = document.querySelector('.navbar-mobile-menu');
        var elementB = document.querySelector('.navbar-mobile-exit');
        var elementC = document.querySelector('.navbar-toggler');
        var elementD = document.querySelector('.navbar-mobile-menuBrand');
        var elementE = document.querySelector('.navbar-mobile-links');
        var elementF = document.querySelector('.navbar-mobile-media');
        elementA.style.height = '100%';
        elementA.style.width = '100%';
        elementA.style.opacity = '1';
        elementB.style.height = '28px';
        elementB.style.width = '28px';
        elementB.style.opacity = '1';
        elementC.style.opacity = '0';
        elementD.style.fontSize = '33px';
        elementD.style.opacity = '1';
        elementE.style.fontSize = '8.5vw';
        elementE.style.opacity = '1';
        elementE.style.transform = 'translateY(-3vw)';
        elementF.style.opacity = '1';
        elementF.style.transform = 'translateY(-11vw)';
    } else {
        document.body.style.overflow = 'hidden';
        var elementA = document.querySelector('.navbar-mobile-menu');
        var elementB = document.querySelector('.navbar-mobile-exit');
        var elementC = document.querySelector('.navbar-toggler');
        var elementD = document.querySelector('.navbar-mobile-menuBrand');
        var elementE = document.querySelector('.navbar-mobile-links');
        var elementF = document.querySelector('.navbar-mobile-media');
        elementA.style.height = '100%';
        elementA.style.width = '100%';
        elementA.style.opacity = '1';
        elementB.style.height = '28px';
        elementB.style.width = '28px';
        elementB.style.opacity = '1';
        elementC.style.opacity = '0';
        elementD.style.fontSize = '33px';
        elementD.style.opacity = '1';
        elementE.style.fontSize = '50px';
        elementE.style.opacity = '1';
        elementE.style.transform = 'translateY(-3vw)';
        elementF.style.opacity = '1';
        elementF.style.transform = 'translateY(-11vw)';
    }
}

function closeMenu() {
    document.body.style.overflow = 'auto';
    var elementA = document.querySelector('.navbar-mobile-menu');
    var elementB = document.querySelector('.navbar-mobile-exit');
    var elementC = document.querySelector('.navbar-toggler');
    var elementD = document.querySelector('.navbar-mobile-menuBrand');
    var elementE = document.querySelector('.navbar-mobile-links');
    var elementF = document.querySelector('.navbar-mobile-media');
    elementA.style.height = '0';
    elementA.style.width = '0';
    elementA.style.opacity = '0';
    elementB.style.height = '0';
    elementB.style.width = '0';
    elementB.style.opacity = '0';
    elementC.style.opacity = '1';
    elementD.style.fontSize = '0';
    elementD.style.opacity = '0';
    elementE.style.fontSize = '0';
    elementE.style.opacity = '0';
    elementE.style.transform = 'translateY(0)';
    elementF.style.opacity = '0';
    elementF.style.transform = 'translateY(0)';
}

function showCart() {
    if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
        var elementA = document.querySelector('.shopping-cart');
        var elementB = document.querySelector('.navbar-toggler');
        elementA.style.width = '100%';
        elementA.style.overflowY = 'auto';
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        document.body.style.overflow = 'hidden';
        var elementA = document.querySelector('.shopping-cart');
        var elementB = document.querySelector('main');
        var elementC = document.querySelector('.navbar');
        var elementD = document.querySelector('.navbar-toggler');
        elementA.style.width = '560px';
        elementA.style.overflowY = 'auto';
        elementB.style.filter = 'blur(3px)';
        setTimeout(() => {
            elementB.onclick = closeCart;
        }, 500);
        elementC.style.filter = 'blur(3px)';
        setTimeout(() => {
            elementC.onclick = closeCart;
        }, 500);
        elementD.onclick = emptyMethod;
    } else {
        document.body.style.overflow = 'hidden';
        var elementA = document.querySelector('.shopping-cart');
        var elementB = document.querySelector('main');
        var elementC = document.querySelector('.navbar');
        var elementD = document.querySelector('.navbar-toggler');
        var elementE = document.querySelector('.navbar-desktop-links li:first-child');
        var elementF = document.querySelector('.navbar-desktop-links li:nth-child(3)');
        var elementG = document.querySelector('.navbar-desktop-links li:nth-child(5)');
        var elementH = document.querySelector('.navbar-desktop-links li:nth-child(7)');
        elementA.style.width = '560px';
        elementA.style.overflowY = 'auto';
        elementB.style.filter = 'blur(3px)';
        setTimeout(() => {
            elementB.onclick = closeCart;
        }, 500);
        elementC.style.filter = 'blur(3px)';
        setTimeout(() => {
            elementC.onclick = closeCart;
        }, 500);
        elementD.onclick = emptyMethod;
        elementE.onclick = emptyMethod;
        elementF.onclick = emptyMethod;
        elementG.onclick = emptyMethod;
        elementH.onclick = emptyMethod;
    };
}

function closeCart() {
    if (window.innerWidth < 768) {
        document.body.style.overflow = 'auto';
        var elementA = document.querySelector('.shopping-cart');
        var elementB = document.querySelector('.navbar-toggler');
        elementA.style.width = '0';
        elementA.style.overflowY = 'hidden';
        elementB.onclick = showMenu;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        document.body.style.overflow = 'auto';
        var elementA = document.querySelector('.shopping-cart');
        var elementB = document.querySelector('main');
        var elementC = document.querySelector('.navbar');
        var elementD = document.querySelector('.navbar-toggler');
        elementA.style.width = '0';
        elementA.style.overflowY = 'hidden';
        elementB.style.filter = 'none';
        elementB.onclick = null;
        elementC.style.filter = 'none';
        elementC.onclick = null;
        elementD.onclick = showMenu;
    } else {
        document.body.style.overflow = 'auto';
        var elementA = document.querySelector('.shopping-cart');
        var elementB = document.querySelector('main');
        var elementC = document.querySelector('.navbar');
        var elementD = document.querySelector('.navbar-toggler');
        var elementE = document.querySelector('.navbar-desktop-links li:first-child');
        var elementF = document.querySelector('.navbar-desktop-links li:nth-child(3)');
        var elementG = document.querySelector('.navbar-desktop-links li:nth-child(5)');
        var elementH = document.querySelector('.navbar-desktop-links li:nth-child(7)');
        elementA.style.width = '0';
        elementA.style.overflowY = 'hidden';
        elementB.style.filter = 'none';
        elementB.onclick = null;
        elementC.style.filter = 'none';
        elementC.onclick = null;
        elementD.onclick = showMenu;
        elementE.onclick = scrollToTop;
        elementF.onclick = scrollToAbout;
        elementG.onclick = scrollToProducts;
        elementH.onclick = scrollToContact;
    };
}

function scrollToTop() {
    closeMenu();
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 1);
}

function scrollToAbout() {
    if (window.innerWidth < 768) {
        closeMenu();
        setTimeout(() => {
            var elementA = document.querySelector('.about-container-xs');
            elementA.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }, 1);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        closeMenu();
        setTimeout(() => {
            var elementA = document.querySelector('.about-container-md');
            elementA.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 1);
    } else {
        setTimeout(() => {
            var elementA = document.querySelector('.about-container-md');
            elementA.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1);
    }
}

function scrollToProducts() {
    if (window.innerWidth < 768) {
        closeMenu();
        setTimeout(() => {
            var elementA = document.querySelector('.products-container-xs');
            elementA.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        closeMenu();
        setTimeout(() => {
            var elementA = document.querySelector('.products-container-md');
            elementA.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 1);
    } else {
        setTimeout(() => {
            var elementA = document.querySelector('.products-container-md');
            elementA.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1);
    }
}

function scrollToContact() {
    if (window.innerWidth < 768) {
        closeMenu();
        setTimeout(() => {
            var elementA = document.querySelector('.contact-container-xs');
            elementA.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        closeMenu();
        setTimeout(() => {
            var elementA = document.querySelector('.contact-container-md');
            elementA.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 1);
    } else {
        setTimeout(() => {
            var elementA = document.querySelector('.contact-container-md');
            elementA.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1);
    }
}

function emptyMethod() {
}

window.addEventListener('resize', function(event) {
    if (window.innerWidth < 768) {
        var elementA = document.querySelector('.navbar-mobile-links');
        elementA.style.fontSize = '8.5vw';
    } else {
        var elementA = document.querySelector('.navbar-mobile-links');
        elementA.style.fontSize = '50px';
    }
    var elementA = document.querySelector('.shopping-cart');
    var elementB = document.querySelector('main');
    var elementC = document.querySelector('.navbar');
    var elementD = document.querySelector('.navbar-toggler');
    var elementE = document.querySelector('.navbar-desktop-links li:first-child');
    var elementF = document.querySelector('.navbar-desktop-links li:nth-child(3)');
    var elementG = document.querySelector('.navbar-desktop-links li:nth-child(5)');
    var elementH = document.querySelector('.navbar-desktop-links li:nth-child(7)');
    elementA.style.width = '0';
    elementB.style.filter = 'none';
    elementB.onclick = null;
    elementC.style.filter = 'none';
    elementC.onclick = null;
    elementD.onclick = showMenu;
    elementE.onclick = scrollToTop;
    elementF.onclick = scrollToAbout;
    elementG.onclick = scrollToProducts;
    elementH.onclick = scrollToContact;
    closeMenu();
}) 