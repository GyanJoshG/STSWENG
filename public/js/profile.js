document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.getElementById('navbar');
    
    if (!navLinks) {
        console.error('Element with id "navbar" not found.');
        return; 
    }

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('isAdmin:', isAdmin); 

    if (isAdmin && !navLinks.querySelector('a[href="/admin"]')) {
        const adminLink = document.createElement('a');
        adminLink.href = '/admin';
        adminLink.textContent = 'Admin';
        navLinks.appendChild(adminLink);
    }

    const orderListItems = document.querySelectorAll('.order-list-item');

    orderListItems.forEach((orderItem) => {
        const changeStatusForm = orderItem.querySelector('.change-status-form');
        const cancelOrderForm = orderItem.querySelector('.cancel-order-form');

        if (isAdmin) {
            if (changeStatusForm) changeStatusForm.style.display = 'block';
            if (cancelOrderForm) cancelOrderForm.style.display = 'none';
        } else {
            if (changeStatusForm) changeStatusForm.style.display = 'none';
            if (cancelOrderForm) cancelOrderForm.style.display = 'block';
        }
    });
});
