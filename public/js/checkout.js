document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.getElementById('navbar');
    if (!navLinks) {
        console.error('Element with class "navbar" not found.');
        return; // Exit the function if `navLinks` is not found
    }

    // Check if `isAdmin` is correctly read from localStorage
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('isAdmin:', isAdmin); 

    if (isAdmin && !navLinks.querySelector('a[href="/admin"]')) {
        const adminLink = document.createElement('a');
        adminLink.href = '/admin';
        adminLink.textContent = 'Admin';
        navLinks.appendChild(adminLink);
    }

    function openModal() {
        document.getElementById('checkout-modal').style.display = 'block';
    }

    function closeModal() {
        resetModal();
        document.getElementById('checkout-modal').style.display = 'none';
    }

    function resetModal() {
        document.getElementById('qr-code').style.display = 'none';
        document.getElementById('confirmation-message').style.display = 'none';
        
        document.getElementById('shipping-form').reset();
    }

    document.querySelector('.close-btn').onclick = closeModal;

    document.getElementById('checkout-btn').onclick = function() {
        openModal();
    }

    window.onclick = function(event) {
    const modal = document.getElementById('checkout-modal');
        if (event.target === modal) {
            closeModal();
        }
    }

    document.getElementById('proceed-btn').onclick = function() {
        const shippingData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            address: {
                street: document.getElementById('street').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
            },
            preferredPaymentMethod: document.getElementById('paymentMethod').value,
        };
    
        console.log("Shipping Data:", shippingData);
    
        if (shippingData.preferredPaymentMethod === 'Gcash') {
            document.getElementById('qr-code').style.display = 'block';
            document.getElementById('confirmation-message').style.display = 'none';
        } else if (shippingData.preferredPaymentMethod === 'Cash on Delivery') {
            document.getElementById('confirmation-message').style.display = 'block';
            document.getElementById('qr-code').style.display = 'none';
        }
    
        window.shippingData = shippingData;
    };

    document.getElementById('confirm-btn').onclick = async function() {
        if (!window.shippingData) {
            console.error('Shipping data not set. Please proceed first.');
            return;
        }
    
        try {
            const response = await fetch('/cart/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(window.shippingData),
            });
    
            const result = await response.json();
            console.log(result.message);
    
        } catch (error) {
            console.error('Error submitting shipping data:', error);
        }
    
        closeModal();
    };
});