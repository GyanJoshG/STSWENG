let cart = [];
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow img');

// function addToCart(name, price) {
//     const productElement = event.target.closest('.product');
//     if (productElement.classList.contains('out-of-stock')) {
//         alert('Sorry, this product is out of stock.');
//         return;
//     }
//     cart.push({ name, price });
//     updateCart();
// }

function addToCart(name, price) {
    const productElement = event.target.closest('.product');
    if (productElement.classList.contains('out-of-stock')) {
        alert('Sorry, this product is out of stock.');
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.textContent = `Cart: ${cart.length} items`;
}

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function nextSlide() {
    changeSlide(1);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds
document.addEventListener('DOMContentLoaded', updateCartCount);