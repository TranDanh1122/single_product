let cartIcon = document.querySelector('.cart_icon');
let hanldeCartIconClick = e => e.target.closest('header').querySelector('.cart').toggleAttribute('show');
cartIcon.addEventListener('click', hanldeCartIconClick);
let [qty, product_price, product_name, product_image] = ['.qty', '.product_price', '.product_name', '.main'].map(el => document.querySelector(el))
let plusAndMinus = document.querySelectorAll('.changeQty')
let addToCart = document.querySelector('.add_to_cart')
let cartEl = document.querySelector('.cart_items')
let cart = []
let cartItemTemplate = (cartItem) => `
          <div class="cart_item">
            <img src="${cartItem.img}" alt="${cartItem.productName}">
            <div class="info">
              <span class="name">${cartItem.productName}</span>
              <span class="price"> $${cartItem.price}</span>
              <span>x</span>
              <span id="qty">${cartItem.qty}</span>
              <span class="total">$${cartItem.total}</span>
            </div>
            <div id="${cartItem.uuid}" class="delete_btn">
              <i class="delete"></i>
            </div>
          </div>
`
let handleInput = (e) => {
    if (!Number.isInteger(e.target.value)) e.target.value = 0
}
let handleChangeQty = (e) => {
    let currentQty = qty.value
    if (e.target.closest('span').classList.contains('add')) {
        qty.value = parseInt(currentQty) + 1
        return true
    }
    if (currentQty <= 0) return false
    qty.value = currentQty - 1

}
let updateCartQty = (qty) => document.querySelector('.cart_qty').textContent = qty
let getCart = () => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
let saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
let addCart = (cartItem) => {
    let oldCartItem = cart.find(item => item.id = id)
    if (!oldCartItem) {
        cart.push(cartItem);
        return false
    }
    oldCartItem.qty = oldCartItem.qty + cartItem.qty
}
let deleteCartItem = (id) => {
    let index = cart.findIndex(item => item.id = id)
    cart.splice(index, 1)
}
let reloadEvent = () => {
    document.querySelectorAll('.delete').forEach(el => el.addEventListener('click', function (e) {
        let id = e.target.closest('.delete_btn').getAttribute('id')
        deleteCartItem(id)
        saveCart(cart)
        renderCart()
    }))
}
let renderCart = () => {
    cartEl.toggleAttribute("empty", true)

    cart = getCart()
    cartEl.innerHTML = ''
    cart.forEach(item => {
        let itemNode = cartItemTemplate(item)
        cartEl.insertAdjacentHTML('beforeend', itemNode)
    })
    updateCartQty(cart.length ?? 0)
    if (!cart.length || cart.length <= 0) {
        cartEl.insertAdjacentHTML('beforeend', `<span>Your cart is empty.</span>`)
        return false
    }
    reloadEvent()
    cartEl.toggleAttribute("empty", false)

}
let handleAddToCart = () => {
    let cartItem = {
        //maybe we can use product uuid in reallife
        productName: product_name.textContent,
        productID: product_name.getAttribute('product_id'),
        price: product_price.getAttribute('price'),
        qty: qty.value,
        img: product_image.getAttribute('classic'),

    }
    cartItem.total = parseInt(cartItem.qty) * parseFloat(cartItem.price)
    addCart(cartItem)
    saveCart(cart)
    renderCart()
    console.log(cart);

}
qty.addEventListener('input', handleInput)
plusAndMinus.forEach(el => el.addEventListener('click', handleChangeQty))
addToCart.addEventListener('click', handleAddToCart)
renderCart()
