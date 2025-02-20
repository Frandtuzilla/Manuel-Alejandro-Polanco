// Mobile menu toggle
const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuButton.textContent = navLinks.classList.contains('active') ? 'Close' : 'Menu';
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuButton.textContent = 'Menu';
    });
});

// Navigation arrows functionality
document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');

    leftArrow.addEventListener('click', () => {
        // Add slide functionality if needed
        console.log('Navigate left');
    });

    rightArrow.addEventListener('click', () => {
        // Add slide functionality if needed
        console.log('Navigate right');
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
});