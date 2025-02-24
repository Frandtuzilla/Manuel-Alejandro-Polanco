// EmailJS Implementation for both contact forms
document.addEventListener('DOMContentLoaded', function() {
    // Check for mobile menu elements (wrap in conditional to prevent errors)
    const menuButton = document.getElementById('menuButton');
    const navLinks = document.getElementById('navLinks');
    
    if (menuButton && navLinks) {
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
    }

    // Navigation arrows functionality (wrap in conditional to prevent errors)
    const leftArrow = document.querySelector('.hero__nav-arrow--left');
    const rightArrow = document.querySelector('.hero__nav-arrow--right');

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            // Add slide functionality if needed
            console.log('Navigate left');
        });

        rightArrow.addEventListener('click', () => {
            // Add slide functionality if needed
            console.log('Navigate right');
        });
    }

    // Initialize EmailJS
    if (window.emailjs) {
        console.log("EmailJS is loaded and available");
        emailjs.init("Cj7onGuIZJeiXYXED");
        
        // Configure both forms
        setupHeroForm();
        setupFooterForm();
    } else {
        console.error("EmailJS is not loaded properly");
    }

    // Setup for Hero Contact Form
    function setupHeroForm() {
        const heroForm = document.getElementById('heroContactForm');
        
        if (heroForm) {
            console.log("Hero form found in DOM");
            
            heroForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log("Hero form submitted");
                
                // Add loading state
                const submitBtn = heroForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Get form fields
                const firstNameInput = document.getElementById('heroFirstName');
                const emailInput = document.getElementById('heroEmail');
                const commentInput = document.getElementById('heroComment');
                
                if (!firstNameInput || !emailInput || !commentInput) {
                    console.error("One or more hero form fields not found");
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Collect form data
                const formData = {
                    first_name: firstNameInput.value,
                    last_name: "",
                    email: emailInput.value,
                    message: commentInput.value,
                    form_name: 'Hero Contact Form'
                };
                
                console.log("Sending hero form data:", formData);
                
                // Send the form using EmailJS
                emailjs.send(
                    'service_ijhm2nv',
                    'template_jm90lfe', 
                    formData
                )
                .then(function(response) {
                    console.log("EmailJS Success Response:", response);
                    showToast('Thank you! Your message has been sent.', 'success');
                    heroForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error:', error);
                    showToast('Oops! Something went wrong.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            });
        } else {
            console.error("Hero form not found in DOM");
        }
    }
    
    // Setup for Footer Contact Form
    function setupFooterForm() {
        const footerForm = document.getElementById('footerContactForm');
        
        if (footerForm) {
            console.log("Footer form found in DOM");
            
            // Add IDs to footer form elements (if they don't have them)
            const footerInputs = footerForm.querySelectorAll('input, textarea');
            if (footerInputs[0] && !footerInputs[0].id) footerInputs[0].id = 'footerFirstName';
            if (footerInputs[1] && !footerInputs[1].id) footerInputs[1].id = 'footerLastName';
            if (footerInputs[2] && !footerInputs[2].id) footerInputs[2].id = 'footerEmail';
            if (footerInputs[3] && !footerInputs[3].id) footerInputs[3].id = 'footerComment';
            
            footerForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log("Footer form submitted");
                
                // Add loading state
                const submitBtn = footerForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Get form fields (now with IDs)
                const firstNameInput = document.getElementById('footerFirstName');
                const lastNameInput = document.getElementById('footerLastName');
                const emailInput = document.getElementById('footerEmail');
                const messageInput = document.getElementById('footerComment');
                
                if (!firstNameInput || !lastNameInput || !emailInput || !messageInput) {
                    console.error("One or more footer form fields not found");
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Collect form data
                const formData = {
                    first_name: firstNameInput.value,
                    last_name: lastNameInput.value,
                    email: emailInput.value,
                    message: messageInput.value,
                    form_name: 'Footer Contact Form'
                };
                
                console.log("Sending footer form data:", formData);
                
                // Send the form using EmailJS
                emailjs.send(
                    'service_ijhm2nv',
                    'template_nfgh15s',
                    formData
                )
                .then(function(response) {
                    console.log("EmailJS Success Response:", response);
                    showToast('Thank you! Your message has been sent.', 'success');
                    footerForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error:', error);
                    showToast('Oops! Something went wrong.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            });
        } else {
            console.error("Footer form not found in DOM");
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