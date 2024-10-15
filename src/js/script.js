document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow img');

    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
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
});