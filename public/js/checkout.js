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

    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    document.getElementById('checkout-btn').onclick = function() {
        openModal('checkout-modal');
    }

    window.onclick = function(event) {
        const checkoutModal = document.getElementById('checkout-modal');
        const proceedModal = document.getElementById('proceed-modal');
        if (event.target === checkoutModal) {
            closeModal('checkout-modal');
        } else if (event.target === proceedModal) {
            closeModal('proceed-modal');
        }
    }

    document.getElementById('proceed-btn').onclick = function () {
        const shippingData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            address: {
                street: document.getElementById('street').value.trim(),
                city: document.getElementById('city').value.trim(),
                state: document.getElementById('state').value.trim(),
                zipCode: document.getElementById('zipCode').value.trim(),
            },
            preferredPaymentMethod: document.getElementById('paymentMethod').value,
        };

        for (const key in shippingData) {
            if (typeof shippingData[key] === 'object') {
                for (const subKey in shippingData[key]) {
                    if (!shippingData[key][subKey]) {
                        alert(`Please fill in your ${subKey.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
                        console.error(`Missing field: ${subKey}`);
                        return;
                    }
                }
            } else if (!shippingData[key]) {
                alert(`Please fill in your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
                console.error(`Missing field: ${key}`);
                return;
            }
        }
        
        if (isNaN(shippingData.phoneNumber) || shippingData.phoneNumber === '') {
            alert('Please enter a valid phone number.');
            console.error('Invalid phone number.');
            return;
        }
        if (isNaN(shippingData.address.zipCode) || shippingData.address.zipCode === '') {
            alert('Please enter a valid zip code.');
            console.error('Invalid zip code.');
            return;
        }

        console.log("Shipping Data:", shippingData);
        window.shippingData = shippingData;

        const proceedModal = document.getElementById('proceed-modal');
        const qrCodeSection = document.getElementById('qr-code-section');
        const confirmationSection = document.getElementById('confirmation-section');
    
        if (shippingData.preferredPaymentMethod === 'Gcash') {
            qrCodeSection.style.display = 'block';
            confirmationSection.style.display = 'none';
        } else if (shippingData.preferredPaymentMethod === 'Cash on Delivery') {
            confirmationSection.style.display = 'block';
            qrCodeSection.style.display = 'none';
        }
    
        proceedModal.style.display = 'block';
    };
    
    document.getElementById('close-proceed-modal').onclick = function () {
        document.getElementById('proceed-modal').style.display = 'none';
    };

    document.getElementById('confirm-btn').onclick = async function() {
        if (!window.shippingData) {
            console.error('Shipping data not set. Please proceed first.');
            return;
        }
    
        try {
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(window.shippingData)
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            alert('Order submitted successfully!');
            closeModal('proceed-modal');

            //location.reload();
        } catch (error) {
            console.error('Failed to submit order:', error);
            alert('Failed to submit order. Please try again.');
        }
    };
});
