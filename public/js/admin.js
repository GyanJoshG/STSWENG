document.addEventListener('DOMContentLoaded', function() {
    function openModal() {
        document.getElementById('product-Modal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('product-Modal').style.display = 'none';
    }

    document.getElementById('edit-btn').onclick = function() {
        openModal();
    }

    window.onclick = function(event) {
        const modal = document.getElementById('product-Modal');
            if (event.target === modal) {
                closeModal();
            }
        }
});