document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.onclick = function () {
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: button.dataset.price,
                stock: button.dataset.stock,
                sold: button.dataset.sold,
                isAvailable: button.dataset.isavailable === 'true',
                type: button.dataset.type,
                occasion: button.dataset.occasion,
                imgSrc: button.dataset.imgsrc,
                color: button.dataset.color
            };

            document.getElementById('productId').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('stock').value = product.stock;
            document.getElementById('sold').value = product.sold;
            document.getElementById('isAvailable').checked = product.isAvailable;
            document.getElementById('type').value = product.type;
            document.getElementById('occasion').value = product.occasion;
            document.getElementById('imgSrc').value = product.imgSrc;
            document.getElementById('color').value = product.color;

            document.getElementById('product-Modal').style.display = 'block';
        };
    });

    window.onclick = function (event) {
        const modal = document.getElementById('product-Modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    const form = document.getElementById('editProductForm');
    form.onsubmit = async (event) => {
        event.preventDefault();  

        const productData = {
            id: document.getElementById('productId').value,
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            stock: document.getElementById('stock').value,
            isAvailable: document.getElementById('isAvailable').checked,
            type: document.getElementById('type').value,
            occasion: document.getElementById('occasion').value,
            imgSrc: document.getElementById('imgSrc').value,
            color: document.getElementById('color').value
        };

        console.log('Product Data to be saved:', productData);

        try {
            const response = await fetch('/admin/edit-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                console.error('Failed to update product. Response status:', response.status);
                const errorText = await response.text();
                console.error('Error response text:', errorText);
                throw new Error(`Failed to update product with status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Product update response:', result);  

            location.reload();

        } catch (error) {
            console.error('Error in product update process:', error);
        }
    };

});
