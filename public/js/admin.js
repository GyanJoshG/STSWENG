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
        const productModal = document.getElementById('product-Modal');
        const deleteModal = document.getElementById('delete-Modal');
        if (event.target === productModal) {
            productModal.style.display = 'none';
        } else if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
    };

    const editForm = document.getElementById('editProductForm');
    editForm.onsubmit = async (event) => {
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

    document.getElementById('cancel-btn').onclick = function() {
        document.getElementById('delete-Modal').style.display = 'none';
    }
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.onclick = function () {            
            const product = {
                id: button.dataset.prodid,
                name: button.dataset.prodname,
            };

            document.getElementById('productIdTest').value = product.id;
            document.getElementById('product-name').textContent = product.name; 

            document.getElementById('delete-Modal').style.display = 'block'; 
        };
    });

    const deleteForm = document.getElementById('deleteProductForm');
    deleteForm.onsubmit = async (event) => {
        event.preventDefault();
        console.log('Product ID (deleteForm): ' + document.getElementById('productIdTest').value);
        const productData = {
            id: document.getElementById('productIdTest').value,
            name: document.getElementById('name').value,
        };

        try {
            const response = await fetch('/admin/delete-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to delete product. Response status:', response.status, 'Error text:', errorText);
                throw new Error(`Failed to delete product with status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Product delete response:', result);

            location.reload();

        } catch (error) {
            console.error('Error in product delete process:', error);
        }
    };
});
