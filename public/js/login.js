import utils from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target); // event.target is #login-form
        const email = formData.get('email');
        const password = formData.get('password');

        // TODO: Finish login script
        try {
            $.get('/api/users/exists', { username, email }, async (res) => {
                if(res.data.usernameExists) {
                    utils.inform(true, 'Error signing up: Username already exists. Use a different username.');
                    return;
                }
    
                if(res.data.emailExists) {
                    utils.inform(true, 'Error signing up: Email already exists. Use a different email.');
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
                    } else {
                        utils.inform(true, `Error signing up: ${result.error}`);
                    }
                })
                .catch((err) => { // Catch POST request errors
                    utils.inform(true, `Submission failed: ${err}`);
                });
            }).fail((jqXHR, textStatus, err) => { // Catch GET request errors
                utils.inform(true, `Request failed: ${err}`);
            });
        } catch (err) {
            utils.inform(true, `Unexpected error occurred: ${err}`);
        }
    });
});