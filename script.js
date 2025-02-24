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

// EmailJS Implementation for both contact forms
document.addEventListener('DOMContentLoaded', function() {
    // First, add EmailJS SDK to the page if it's not already included
    if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = function() {
            initializeEmailJS();
        };
    } else {
        initializeEmailJS();
    }
    
    function initializeEmailJS() {
        // Initialize EmailJS with your user ID (replace with your actual EmailJS user ID)
        emailjs.init("Cj7onGuIZJeiXYXED");
        
        // Configure both forms
        setupHeroForm();
        setupFooterForm();
    }

    // Setup for Hero Contact Form
    function setupHeroForm() {
        const heroForm = document.getElementById('heroContactForm');
        
        if (heroForm) {
            heroForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Add loading state
                const submitBtn = heroForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Get form fields - using the existing structure without changing IDs
                const firstNameInput = heroForm.querySelector('input[name="firstName"]');
                const emailInput = heroForm.querySelector('input[name="email"]');
                const commentInput = heroForm.querySelector('textarea[name="comment"]');
                
                // Collect form data
                const formData = {
                    first_name: firstNameInput.value,
                    email: emailInput.value,
                    message: commentInput.value,
                    form_name: 'Hero Contact Form'
                };
                
                // Send the form using EmailJS
                emailjs.send(
                    'service_ijhm2nv', // Replace with your EmailJS service ID
                    'template_jm90lfe', // Replace with your EmailJS template ID
                    formData
                )
                .then(function(response) {
                    // Success message
                    showToast('Thank you! Your message has been sent.', 'success');
                    heroForm.reset();
                })
                .catch(function(error) {
                    // Error message
                    showToast('Oops! Something went wrong.', 'error');
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            });
        }
    }
    
    // Setup for Footer Contact Form
    function setupFooterForm() {
        const footerForm = document.getElementById('footerContactForm');
        
        if (footerForm) {
            footerForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Add loading state
                const submitBtn = footerForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Get all input elements - using the existing structure
                const inputs = footerForm.querySelectorAll('input, textarea');
                const firstNameInput = inputs[0]; // First input in the form
                const lastNameInput = inputs[1]; // Second input in the form
                const emailInput = inputs[2]; // Third input in the form
                const messageInput = inputs[3]; // Fourth input (textarea) in the form
                
                // Collect form data
                const formData = {
                    first_name: firstNameInput.value,
                    last_name: lastNameInput.value,
                    email: emailInput.value,
                    message: messageInput.value,
                    form_name: 'Footer Contact Form'
                };
                
                // Send the form using EmailJS
                emailjs.send(
                    'service_ijhm2nv', // Replace with your EmailJS service ID
                    'template_nfgh15s', // Replace with your EmailJS template ID
                    formData
                )
                .then(function(response) {
                    // Success message
                    showToast('Thank you! Your message has been sent.', 'success');
                    footerForm.reset();
                })
                .catch(function(error) {
                    // Error message
                    showToast('Oops! Something went wrong.', 'error');
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            });
        }
    }

    // Create a simple toast notification system
    function showToast(message, type) {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.bottom = '20px';
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '1000';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.style.minWidth = '250px';
        toast.style.margin = '10px';
        toast.style.padding = '15px';
        toast.style.borderRadius = '5px';
        toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.transition = 'all 0.3s ease';
        toast.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 2.7s';
        
        // Set color based on message type
        if (type === 'success') {
            toast.style.backgroundColor = '#3F51B5'; // Using your site's primary color
            toast.style.color = 'white';
        } else {
            toast.style.backgroundColor = '#F44336';
            toast.style.color = 'white';
        }
        
        toast.textContent = message;
        
        // Add CSS for animations
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.innerHTML = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});