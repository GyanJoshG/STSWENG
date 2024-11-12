document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const showPassword = document.querySelector('.show-password i');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Login attempt:', { username, password });

        loginForm.reset();
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