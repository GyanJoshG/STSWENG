document.addEventListener('DOMContentLoaded', function() {

    function openModal() {
        document.getElementById('checkout-modal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('checkout-modal').style.display = 'none';
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

    document.getElementById('confirm-btn').onclick = function() {
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
        closeModal();
    };
});