// Get username from localStorage or URL parameter
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('user') || localStorage.getItem('currentUser') || 'Demo User';

// Update greeting with username
document.getElementById('userGreeting').textContent = username;

// Update username in header
const usernameElement = document.querySelector('.username');
if (usernameElement) {
    usernameElement.textContent = `DU ${username}`;
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        // Clear user data
        localStorage.removeItem('currentUser');
        
        // Show logout message
        alert('You have been logged out successfully! 🌿');
        
        // Redirect to login page
        window.location.href = 'index.html';
    }
});

// Favorite button functionality
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#e91e63';
            
            // Animation
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// Plant card click functionality
document.querySelectorAll('.plant-card').forEach(card => {
    card.addEventListener('click', function() {
        const plantName = this.querySelector('h3').textContent;
        alert(`🌿 ${plantName}\n\nDetailed information about this plant will be available soon!`);
    });
});

// Add plant button
document.querySelector('.add-plant-btn').addEventListener('click', function() {
    alert('🌱 Add New Plant feature coming soon!\n\nYou will be able to add custom plants to your virtual garden.');
});

// Menu items functionality
document.querySelectorAll('.menu-list li').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.menu-list li').forEach(li => li.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        const menuText = this.textContent.trim();
        
        if (menuText !== 'Browse All Plants') {
            alert(`📚 ${menuText}\n\nThis feature will be available soon!`);
        }
    });
});

// Category list functionality
document.querySelectorAll('.category-list li').forEach(item => {
    item.addEventListener('click', function() {
        const category = this.textContent.trim();
        alert(`🌿 ${category}\n\nShowing plants in this category will be available soon!`);
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchQuery = this.value.trim();
        if (searchQuery) {
            alert(`🔍 Searching for: "${searchQuery}"\n\nSearch functionality will be implemented soon!`);
            this.value = '';
        }
    }
});

// Notification button
document.querySelector('.notification-btn').addEventListener('click', function() {
    alert('🔔 Notifications\n\n• New plant added: Amla\n• Your collection "Digestive Herbs" was updated\n• Weekly learning goal achieved!');
});

// Welcome message on load
window.addEventListener('load', function() {
    console.log('🌿 AyurSphere Dashboard Loaded');
    console.log(`Welcome, ${username}!`);
    
    // Optional: Show a brief welcome toast
    setTimeout(() => {
        const welcomeToast = document.createElement('div');
        welcomeToast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #2d5016, #4a7c2c);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;
        welcomeToast.innerHTML = `
            <strong>🌿 Welcome back, ${username}!</strong><br>
            <small>Continue your journey in the healing garden</small>
        `;
        
        document.body.appendChild(welcomeToast);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove after 3 seconds
        setTimeout(() => {
            welcomeToast.style.animation = 'slideIn 0.5s ease-out reverse';
            setTimeout(() => welcomeToast.remove(), 500);
        }, 3000);
    }, 1000);
});
