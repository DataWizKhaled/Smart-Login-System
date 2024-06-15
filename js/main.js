document.addEventListener('DOMContentLoaded', function() {
    var registerForm = document.getElementById('registerForm');
    var loginForm = document.getElementById('loginForm');
    var logoutButton = document.getElementById('logoutButton');
    var registerErrorDiv = document.getElementById('registerError');
    var loginErrorDiv = document.getElementById('loginError');
    var usernameDisplay = document.getElementById('usernameDisplay');

    var registerSection = document.getElementById('registerSection');
    var loginSection = document.getElementById('loginSection');
    var homeSection = document.getElementById('homeSection');

    var goToRegister = document.getElementById('goToRegister');
    var goToLogin = document.getElementById('goToLogin');

    goToRegister.addEventListener('click', function() {
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    });

    goToLogin.addEventListener('click', function() {
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var username = document.getElementById('registerUsername').value;
        var email = document.getElementById('registerEmail').value;
        var password = document.getElementById('registerPassword').value;

        if (!username || !email || !password) {
            registerErrorDiv.textContent = 'All inputs are required';
            return;
        }

        if (username.length < 3) {
            registerErrorDiv.textContent = 'Username must be at least 3 characters long';
            return;
        }

        if (!validateEmail(email)) {
            registerErrorDiv.textContent = 'Invalid email format';
            return;
        }

        if (password.length < 8) {
            registerErrorDiv.textContent = 'Password must be at least 8 characters long';
            return;
        }

        if (localStorage.getItem(email)) {
            registerErrorDiv.textContent = 'Email is already registered';
            return;
        }

        localStorage.setItem(email, JSON.stringify({ username: username, password: password }));

        registerErrorDiv.textContent = 'Registration successful! Redirecting to login...';

        setTimeout(function() {
            registerSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            registerErrorDiv.textContent = '';
        }, 1000);
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var loginEmail = document.getElementById('loginEmail').value;
        var loginPassword = document.getElementById('loginPassword').value;

        if (!loginEmail || !loginPassword) {
            loginErrorDiv.textContent = 'All inputs are required';
            return;
        }

        var storedUser = JSON.parse(localStorage.getItem(loginEmail));

        if (storedUser && storedUser.password === loginPassword) {
            localStorage.setItem('loggedInUser', storedUser.username);
            showHomeSection(storedUser.username);
        } else {
            loginErrorDiv.textContent = 'Invalid email or password';
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        showLoginSection();
    });

    function showHomeSection(username) {
        loginSection.classList.add('hidden');
        registerSection.classList.add('hidden');
        homeSection.classList.remove('hidden');
        usernameDisplay.textContent = username;
    }

    function showLoginSection() {
        homeSection.classList.add('hidden');
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    }

    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

   
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showHomeSection(loggedInUser);
    } else {
        showLoginSection();
    }
});