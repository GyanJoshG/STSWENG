import utils from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const form =  document.getElementById('signup-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target); // event.target is #signup-form
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        // Input validation
        if(username.length < 3) {
            utils.inform(true, 'Error signing up: Username should be at least 3 characters');
            return;
        }

        if(username.length > 20) {
            utils.inform(true, 'Error signing up: Username should not exceed 20 characters');
            return;
        }

        if(email.length > 254) {
            utils.inform(true, 'Error signing up: Email should not exceed 254 characters');
            return;
        }

        if(password.length < 8) {
            utils.inform(true, 'Error signing up: Password should be at least 8 characters long');
            return;
        }

        if(password.length > 64) {
            utils.inform(true, 'Error signing up: Password should not exceed 64 characters');
            return;
        }

        if(password !== confirmPassword) {
            utils.inform(true, 'Error signing up: Passwords do not match');
            return;
        }

        // Send POST request to /api/users/create
        fetch(form.action, // URI
            {
                method: form.method, // POST request
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, confirmPassword }),
            }
        ).then(async (res) => {
            const result = await res.json();

            if(res.ok) {
                utils.inform(false, result.message);
                event.target.reset();
                window.location.href = '/login';
            } else {
                utils.inform(true, `Error signing up: ${result.error}`);
            }
        })
        .catch((err) => { // Catch POST request errors
            utils.inform(true, `Submission failed: ${err}`);
        });
    });
});