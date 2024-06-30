// Handle registration
document.getElementById('register-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user already exists
    if (users.find(user => user.username === username)) {
        alert('Username already taken');
        return;
    }

    // Register the user
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful. Please login.');
    window.location.href = 'login.html';
});

// Handle login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('user', JSON.stringify({ username, token: 'fake-jwt-token' }));
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
});
