document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow img');
    const productsSection = document.querySelectorAll('.products');
    let productId = 0;

    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    function updateCart() {
        const cartElement = document.getElementById('cart');
        cartElement.textContent = `Cart: ${cart.length} items`;
    }
    
    async function getProductsData() {
        const result = await $.get('/api/products');
        return result;
    }

    async function createProducts() {
        const products = await getProductsData();
        
        // Add products to products section
        products.forEach((product) => {
            const productElement = document.createElement('div');
            productElement.id = productId;
            productElement.className = 'product';
            productElement.innerHTML = `
            <img src=${product.imgSrc} alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>₱${product.price}</p>`;
            
            const button = document.createElement('button');
            button.textContent = 'Add to Cart';
            button.onclick = () => addToCart(product.name, product.price);
            productElement.appendChild(button);

            productsSection[0].appendChild(productElement);
            productId++;
        });
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
    createProducts();
});