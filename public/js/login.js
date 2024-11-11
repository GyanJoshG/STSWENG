import utils from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target); // event.target is #login-form
        const username = formData.get('username');
        const password = formData.get('password');

        // Send POST request to /api/login
        fetch(form.action, // URI
            {
                method: form.method, // POST request
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            }
        ).then(async (res) => {
            const result = await res.json();

            if(res.ok) {
                utils.inform(false, result.message);
                event.target.reset();
                window.location.href = '/';
            } else {
                utils.inform(true, `Error logging in: ${result.error}`);
            }
        })
        .catch((err) => { // Catch POST request errors
            utils.inform(true, `Submission failed: ${err}`);
        });
    });
});