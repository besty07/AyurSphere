// Static arrays of users for authentication
const adminUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'superadmin', password: 'super@2025' },
    { username: 'ayuradmin', password: 'healing@admin' }
];

// Load users from localStorage or use default users
let normalUsers = [];
const defaultUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'ayursphere', password: 'healing123' },
    { username: 'demo', password: 'demo123' },
    { username: 'guest', password: 'guest2025' }
];

// Initialize normalUsers from localStorage or defaults
function initializeUsers() {
    const storedUsers = localStorage.getItem('normalUsers');
    if (storedUsers) {
        try {
            normalUsers = JSON.parse(storedUsers);
        } catch (e) {
            console.error('Error loading users from localStorage:', e);
            normalUsers = [...defaultUsers];
            saveUsersToStorage();
        }
    } else {
        normalUsers = [...defaultUsers];
        saveUsersToStorage();
    }
}

// Save users to localStorage
function saveUsersToStorage() {
    localStorage.setItem('normalUsers', JSON.stringify(normalUsers));
}

// Initialize users on page load
initializeUsers();

// Get DOM elements
const loginTypeSelector = document.getElementById('loginTypeSelector');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const backBtn = document.getElementById('backBtn');
const backToLoginBtn = document.getElementById('backToLoginBtn');
const formTitle = document.getElementById('formTitle');
const loginTypeBadge = document.getElementById('loginTypeBadge');
const badgeText = document.getElementById('badgeText');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('message');
const togglePasswordBtn = document.getElementById('togglePassword');
const showSignupLink = document.getElementById('showSignupLink');
const showLoginLink = document.getElementById('showLoginLink');

// Signup form elements
const signupUsernameInput = document.getElementById('signupUsername');
const signupPasswordInput = document.getElementById('signupPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const signupMessageDiv = document.getElementById('signupMessage');
const toggleSignupPasswordBtn = document.getElementById('toggleSignupPassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

let currentLoginType = '';

// Add particle effect
createParticles();

// Login type button handlers
document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        showLoginForm(type);
    });
});

// Back button handler
backBtn.addEventListener('click', function() {
    showLoginTypeSelector();
});

// Back to login from signup
backToLoginBtn.addEventListener('click', function() {
    signupForm.style.display = 'none';
    loginTypeSelector.style.display = 'block';
    signupForm.reset();
    signupMessageDiv.textContent = '';
    signupMessageDiv.className = 'message';
});

// Show signup form
showSignupLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    loginForm.reset();
    messageDiv.textContent = '';
    messageDiv.className = 'message';
    setTimeout(() => {
        signupUsernameInput.focus();
    }, 100);
});

// Show login form from signup
showLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    signupForm.reset();
    signupMessageDiv.textContent = '';
    signupMessageDiv.className = 'message';
    setTimeout(() => {
        usernameInput.focus();
    }, 100);
});

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type');
    if (type === 'password') {
        passwordInput.setAttribute('type', 'text');
        this.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.setAttribute('type', 'password');
        this.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

// Toggle signup password visibility
toggleSignupPasswordBtn.addEventListener('click', function() {
    const type = signupPasswordInput.getAttribute('type');
    if (type === 'password') {
        signupPasswordInput.setAttribute('type', 'text');
        this.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        signupPasswordInput.setAttribute('type', 'password');
        this.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

// Toggle confirm password visibility
toggleConfirmPasswordBtn.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type');
    if (type === 'password') {
        confirmPasswordInput.setAttribute('type', 'text');
        this.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        confirmPasswordInput.setAttribute('type', 'password');
        this.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

// Form submission handler
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Clear previous messages
    messageDiv.textContent = '';
    messageDiv.className = 'message';
    
    // Validate inputs
    if (!username || !password) {
        showMessage('Please enter both username and password', 'error');
        return;
    }
    
    // Authenticate based on login type
    let user;
    if (currentLoginType === 'admin') {
        user = adminUsers.find(u => u.username === username && u.password === password);
    } else {
        user = normalUsers.find(u => u.username === username && u.password === password);
    }
    
    if (user) {
        // Successful login
        showMessage(`Welcome to AyurSphere, ${username}! 🌿`, 'success');
        
        // Add loading animation to button
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.classList.add('loading');
        
        // Store username in localStorage
        localStorage.setItem('currentUser', username);
        
        setTimeout(() => {
            // Redirect to dashboard
            window.location.href = `dashboard.html?user=${encodeURIComponent(username)}`;
        }, 1500);
    } else {
        // Failed login
        showMessage('Invalid credentials! Please check your username and password.', 'error');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add shake animation
        loginForm.classList.add('shake');
        setTimeout(() => {
            loginForm.classList.remove('shake');
        }, 500);
    }
});

// Signup form submission handler
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    // Clear previous messages
    signupMessageDiv.textContent = '';
    signupMessageDiv.className = 'message';
    
    // Validate inputs
    if (!username || !password || !confirmPassword) {
        showSignupMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Check username length
    if (username.length < 3) {
        showSignupMessage('Username must be at least 3 characters long', 'error');
        return;
    }
    
    // Check password length
    if (password.length < 6) {
        showSignupMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        showSignupMessage('Passwords do not match!', 'error');
        confirmPasswordInput.value = '';
        confirmPasswordInput.focus();
        signupForm.classList.add('shake');
        setTimeout(() => {
            signupForm.classList.remove('shake');
        }, 500);
        return;
    }
    
    // Check if username already exists (in both admin and user arrays)
    const usernameExists = [...adminUsers, ...normalUsers].some(u => u.username === username);
    
    if (usernameExists) {
        showSignupMessage('Username already exists! Please choose a different username.', 'error');
        signupUsernameInput.focus();
        signupForm.classList.add('shake');
        setTimeout(() => {
            signupForm.classList.remove('shake');
        }, 500);
        return;
    }
    
    // Add new user to normalUsers array
    normalUsers.push({ username, password });
    
    // Save updated users array to localStorage
    saveUsersToStorage();
    
    // Show success message
    showSignupMessage(`Account created successfully! Welcome, ${username}! 🌿`, 'success');
    
    // Add loading animation to button
    const signupBtn = signupForm.querySelector('.login-btn');
    signupBtn.classList.add('loading');
    
    // Store username in localStorage
    localStorage.setItem('currentUser', username);
    
    console.log('New user added:', { username, password });
    console.log('Total users now:', normalUsers.length);
    console.log('Users saved to localStorage');
    
    setTimeout(() => {
        signupBtn.classList.remove('loading');
        
        // Redirect directly to dashboard
        window.location.href = `dashboard.html?user=${encodeURIComponent(username)}`;
    }, 1500);
});

// Function to show login form
function showLoginForm(type) {
    currentLoginType = type;
    
    // Hide selector, show form
    loginTypeSelector.style.display = 'none';
    loginForm.style.display = 'block';
    
    // Get the create account link element
    const createAccountLink = document.getElementById('createAccountLink');
    
    // Update form based on login type
    if (type === 'admin') {
        formTitle.textContent = 'Administrator Login';
        badgeText.textContent = 'Admin Access';
        loginTypeBadge.innerHTML = '<i class="fas fa-user-shield"></i><span id="badgeText">Admin Access</span>';
        loginTypeBadge.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(210, 105, 30, 0.1))';
        loginTypeBadge.style.borderColor = 'rgba(139, 69, 19, 0.3)';
        loginTypeBadge.style.color = '#8b4513';
        // Hide create account link for admin
        createAccountLink.style.display = 'none';
    } else {
        formTitle.textContent = 'User Portal Login';
        badgeText.textContent = 'User Access';
        loginTypeBadge.innerHTML = '<i class="fas fa-user-circle"></i><span id="badgeText">User Access</span>';
        loginTypeBadge.style.background = 'linear-gradient(135deg, rgba(107, 158, 62, 0.1), rgba(45, 80, 22, 0.1))';
        loginTypeBadge.style.borderColor = 'rgba(107, 158, 62, 0.3)';
        loginTypeBadge.style.color = '#2d5016';
        // Show create account link for user
        createAccountLink.style.display = 'block';
    }
    
    // Focus on username input
    setTimeout(() => {
        usernameInput.focus();
    }, 100);
}

// Function to show login type selector
function showLoginTypeSelector() {
    loginForm.style.display = 'none';
    loginTypeSelector.style.display = 'block';
    loginForm.reset();
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

// Function to show message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}

// Function to show signup message
function showSignupMessage(text, type) {
    signupMessageDiv.textContent = text;
    signupMessageDiv.className = `message ${type}`;
}

// Clear message when typing
usernameInput.addEventListener('input', function() {
    if (messageDiv.classList.contains('error')) {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }
});

passwordInput.addEventListener('input', function() {
    if (messageDiv.classList.contains('error')) {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }
});

// Clear signup messages when typing
signupUsernameInput.addEventListener('input', function() {
    if (signupMessageDiv.classList.contains('error')) {
        signupMessageDiv.textContent = '';
        signupMessageDiv.className = 'message';
    }
});

signupPasswordInput.addEventListener('input', function() {
    if (signupMessageDiv.classList.contains('error')) {
        signupMessageDiv.textContent = '';
        signupMessageDiv.className = 'message';
    }
});

confirmPasswordInput.addEventListener('input', function() {
    if (signupMessageDiv.classList.contains('error')) {
        signupMessageDiv.textContent = '';
        signupMessageDiv.className = 'message';
    }
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(107, 158, 62, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Console information
console.log('%c🌿 AyurSphere - The sphere of healing, reimagined 🌿', 'color: #2d5016; font-size: 16px; font-weight: bold;');
console.log('%cLogin Page Loaded Successfully!', 'color: #6b9e3e; font-size: 14px;');
console.log(`%c📊 Total registered users: ${normalUsers.length}`, 'color: #4a7c2c; font-size: 13px;');
console.log('\n%c📋 Demo Credentials:', 'color: #4a7c2c; font-size: 14px; font-weight: bold;');
console.log('\n%cAdministrator Access:', 'color: #8b4513; font-weight: bold;');
console.log('Username: admin | Password: admin123');
console.log('Username: superadmin | Password: super@2025');
console.log('\n%cUser Access:', 'color: #2d5016; font-weight: bold;');
console.log('Username: demo | Password: demo123');
console.log('Username: guest | Password: guest2025');
console.log('\n%c💡 Tip: Create a new account and it will be saved for future logins!', 'color: #6b9e3e; font-style: italic;');
