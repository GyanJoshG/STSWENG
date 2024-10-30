document.addEventListener('DOMContentLoaded', async () => {
    // HTML elements
    const slides = document.querySelectorAll('.slideshow img');
    const productsSection = document.querySelectorAll('.products');
    const filter = document.getElementById('filter');
    const cartElement = document.getElementById('cart');

    let cart = {};
    let currentSlide = 0;
    let productId = 0;
    const productsData = await getProductsData();

    /**
     * Adds a product to the shopping cart.
     * If the product already exists in the cart, it increments the quantity by 1.
     * If the product's quantity reaches the stock limit, it displays an alert message.
     *
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     * @param {number} stock - The stock quantity of the product.
     *
     * @returns {void}
     */
    async function addToCart(name, price, stock) {
        console.log(`Adding to cart: ${name}, Price: ${price}, Stock: ${stock}`); 
    
        if (name in cart) {
            if (cart[name].inCart < stock) {
                cart[name].inCart++;
            } else {
                alert('You have reached the limit for the product.');
                return;
            }
        } else {
            cart[name] = { price, inCart: 1 };
        }
    
        try {
            const response = await fetch('/cart/add-to-cart', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, quantity: cart[name].inCart }),
            });
    
            if (response.ok) {
                updateCart();
                console.log('Current cart state:', cart);
            } else {
                console.error('Failed to add to cart:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    /**
     * Counts the total number of products in the cart.
     *
     * @function countProducts
     * @returns {number} The total number of products in the cart.
     *
     * @example
     * // Example usage:
     * let cart = {
     *     'Product A': { price: 100, inCart: 2 },
     *     'Product B': { price: 200, inCart: 1 },
     * };
     * console.log(countProducts()); // Output: 3
     */
    function countProducts() {
        let count = 0;
    
        for(let product in cart) {
            count += cart[product].inCart;
        }
        
        console.log('Total products in cart:', count);
        return count;
    }

    /**
     * Updates the shopping cart display with the total number of products.
     *
     * @function updateCart
     * @returns {void}
     *
     * @example
     * // Example usage:
     * updateCart();
     *
     * // Example output:
     * // The cartElement's textContent will be updated to display the total number of products.
     * // For example, if the cart contains 3 items (2 of 'Product A' and 1 of 'Product B'), the cartElement's textContent will be:
     * // "Cart: 3 items"
     */
    function updateCart() {
        cartElement.textContent = `Cart: ${countProducts()} items`;
    }

        /**
     * Updates the quantity of a specified item in the shopping cart.
     * Sends a request to the server to change the quantity based on the
     * provided change value (increment or decrement).
     *
     * @param {string} itemName - The name of the item to update in the cart.
     * @param {number} change - The amount to change the item's quantity by.
     *                           Can be positive (to increase) or negative (to decrease).
     *
     * @returns {void} - Sends a request to the server and reloads the page upon success.
     */
    window.updateQuantity = async function(itemName, change) {
        try {
            const response = await fetch('/cart/update-quantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: itemName, change: change })
            });
                
            const data = await response.json();
            if (data.success) {
                location.reload(); 
            } else {
                console.error('Failed to update quantity');
            }
        } catch (error) {
        console.error('Error updating quantity:', error);
        }
    }

    /**
     * Retrieves product data from the server using an asynchronous HTTP GET request.
     *
     * @async
     * @function getProductsData
     * @returns {Promise<Array>} A promise that resolves to an array of product objects.
     *
     * @example
     * // Example usage:
     * getProductsData().then((products) => {
     *     console.log(products);
     * });
     *
     * // Example output:
     * [
     *     { id: 1, name: 'Product A', price: 100, stock: 50, imgSrc: '/path/to/image1.jpg', color: 'red', occasion: 'anniversary', type: 'bouquet' },
     *     { id: 2, name: 'Product B', price: 200, stock: 30, imgSrc: '/path/to/image2.jpg', color: 'yellow', occasion: 'any', type: 'arrangement' },
     *     // ... more product objects
     * ]
     */
    async function getProductsData() {
        const products = await $.get('/api/products');
        return products;
    }

    /**
     * Filters the product data based on the selected filter value.
     *
     * @function filterProductsData
     * @returns {Array} An array of filtered product objects.
     *
     * @example
     * // Example usage:
     * const filter = document.getElementById('filter');
     * const filteredProducts = filterProductsData();
     * console.log(filteredProducts);
     *
     * // Example output:
     * [
     *     { id: 1, name: 'Product A', price: 100, stock: 50, imgSrc: '/path/to/image1.jpg', color: 'red', occasion: 'anniversary', type: 'bouquet' },
     *     { id: 3, name: 'Product C', price: 150, stock: 20, imgSrc: '/path/to/image3.jpg', color: 'red', occasion: 'birthday', type: 'arrangement' },
     *     // ... more product objects
     * ]
     */
    function filterProductsData() {
        const filterVal = filter.value;

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

    /**
     * Creates and displays product elements in the products section based on the filtered product data.
     *
     * @function createProducts
     * @returns {void}
     *
     * @example
     * // Example usage:
     * createProducts();
     *
     * // Example output:
     * // The products section will be populated with product elements based on the filtered product data.
     */
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
                button.onclick = () => {
                    console.log(`Button clicked for product: ${product.name}`);
                    addToCart(product.name, product.price, product.stock);
                    updateCart();
                }
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
    document.querySelector('.prev').onclick = () => changeSlide(-1);
    document.querySelector('.next').onclick = () => changeSlide(1);
});