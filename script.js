let cartIcon = document.querySelector('.cart_icon');
let hanldeCartIconClick = e => e.target.closest('.cart_button').querySelector('.cart').toggleAttribute('show');
cartIcon.addEventListener('click', hanldeCartIconClick);