import utils from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target); // event.target is #login-form
        const email = formData.get('email');
        const password = formData.get('password');

        if(email.length > 254) {
            utils.inform(true, 'Error signing up: Email should not exceed 254 characters');
            return;
        }

        // TODO: Finish login script
    });
});