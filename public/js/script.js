document.addEventListener('DOMContentLoaded', async () => {
    // HTML elements
    const slides = document.querySelectorAll('.slideshow img');
    const productsSection = document.querySelectorAll('.products');
    const filter = document.getElementById('filter');

    let cart = [];
    let currentSlide = 0;
    let productId = 0;
    const productsData = await getProductsData();

    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    function updateCart() {
        const cartElement = document.getElementById('cart');
        cartElement.textContent = `Cart: ${cart.length} items`;
    }
    
    async function getProductsData() {
        const products = await $.get('/api/products');
        return products;
    }

    function filterProductsData() {
        const filterVal = filter.value;

        // Filter products based on filter value
        const filteredProducts = productsData.filter((product) => {
            if(filterVal == 'color-mixed') {
                return product.color == 'mixed';
            } else if(filterVal == 'color-red') {
                return product.color == 'red';
            } else if(filterVal == 'color-yellow') {
                return product.color == 'yellow';
            } else if(filterVal == 'occasion-any') {
                return product.occasion == 'any';
            } else if(filterVal == 'type-arrangement') {
                return product.type == 'arrangement';
            } else if(filterVal == 'type-bouquet') {
                return product.type == 'bouquet';
            } else if(filterVal == 'type-garden') {
                return product.type == 'garden';
            } else {
                return true;        
            }
        });

        return filteredProducts;
    }

    function createProducts() {
        productsSection[0].innerHTML = '';   
        const products = filterProductsData();
        
        // Add products to products section
        products.forEach((product) => {
            const productElement = document.createElement('div');
            productElement.id = productId;
            productElement.className = 'product';
            productElement.innerHTML = `
            <img src=${product.imgSrc} alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>₱${product.price}</p>
            <p>Stock: ${product.stock}</p>`;
            
            const button = document.createElement('button');
            
            if(product.stock == 0) {
                button.textContent = 'Out of Stock';
                button.disabled = true;
                productElement.classList.add('out-of-stock');
            } else {
                button.textContent = 'Add to Cart';
                button.onclick = () => addToCart(product.name, product.price);
            }
            
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
    filter.onchange = createProducts;
});