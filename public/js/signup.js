document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if(password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if(password.length < 8) {
            alert('Password should be at least 8 characters long.');
            return;
        }

        if(password.length > 60) {
            alert('Password should not exceed 60 characters.');
            return;
        }

        // TODO: Uncomment and update the code
        /*$.get('/api/check-user', { email }).then(async (res) => {
            if(res.exists) {
                alert('Email already exists. Use a different email.');
                return;
            } else {
                try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
        
                    if(response.ok) {
                        alert('Account successfully created!');
                    } else {
                        const errorData = await response.json();
                        alert(`Error adding user: ${errorData.message}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error adding user.');
                }
            }
        });*/

        console.log('Signup attempt: ', { username, email, password });

        signupForm.reset();
    });
});