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

    function showModal(orderId) {
        // Show the modal
        document.getElementById('cancel-modal').style.display = 'block';
        // Store the orderId to use when confirming
        window.currentOrderId = orderId;
      }
    
      function cancelOrder() {
        // Redirect or submit a form with the order ID
        window.location.href = '/cancel-order/' + window.currentOrderId;
      }
    
      // Close the modal if the user clicks outside
      window.onclick = function(event) {
        if (event.target === document.getElementById('cancel-modal')) {
          document.getElementById('cancel-modal').style.display = 'none';
        }
      }
      
});
