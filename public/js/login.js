import utils from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const showPassword = document.querySelector('.show-password i');

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
                console.log(result.message);
                event.target.reset();

                // Store the isAdmin flag in localStorage (or sessionStorage)
                localStorage.setItem('isAdmin', result.isAdmin);

                window.location.href = '/';
            } else {
                utils.inform(true, `Error logging in: ${result.error}`);
            }
        })
        .catch((err) => { // Catch POST request errors
            utils.inform(true, `Submission failed: ${err}`);
        });
    });

    showPassword.addEventListener("click", function() {
        if(passwordField.type === "password") {
            passwordField.type = "text";
            showPassword.classList.remove("fa-eye");
            showPassword.classList.add("fa-eye-slash");
        } else {
            passwordField.type = "password";
            showPassword.classList.remove("fa-eye-slash");
            showPassword.classList.add("fa-eye");
        }
        // if clicked, change the color of the icon to #007bff, and if clicked again, change it back to #e38eda
        if(showPassword.style.color === "#e38eda") {
            showPassword.style.color = "#504949";
        } else {
            showPassword.style.color = "#e38eda";
        }
    });
});