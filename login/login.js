document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'student' && password === '1234') {
        window.location.href = '../home/home.html';
    } else {
        document.getElementById('error-message').innerText = 'Invalid username or password';
    }
});
