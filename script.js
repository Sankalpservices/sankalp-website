// Form submission handling with Web3Forms
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('thankYou').style.display = 'block';
            
            // Reset form after 10 seconds
            setTimeout(function() {
                document.getElementById('contactForm').style.display = 'flex';
                document.getElementById('thankYou').style.display = 'none';
                form.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 10000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again or call us directly at 8454819180.');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Form validation and styling
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '' && this.checkValidity()) {
            this.classList.add('form-success');
            this.classList.remove('form-error');
        } else if (this.value.trim() !== '' && !this.checkValidity()) {
            this.classList.add('form-error');
            this.classList.remove('form-success');
        }
    });
    
    input.addEventListener('input', function() {
        this.classList.remove('form-error', 'form-success');
    });
});

// Phone number formatting
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .profile-card, .story-item, .vm-card, .value-item').forEach(el => {
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#FFFFFF';
        header.style.backdropFilter = 'none';
    }
});

// Auto-resize textarea
const textarea = document.querySelector('textarea[name="message"]');
if (textarea) {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

// Add loading states and better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animations
    const cards = document.querySelectorAll('.service-card, .profile-card, .vm-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Logo error handling
    const logoImages = document.querySelectorAll('.logo-image, .hero-logo-img, .about-logo, .footer-logo-img');
    logoImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.log('Logo failed to load from Google Drive');
            // Fallback is handled by onerror attribute in HTML
        });
    });
});

// Error handling for map iframe
const mapIframe = document.querySelector('#map iframe');
if (mapIframe) {
    mapIframe.addEventListener('error', function() {
        console.log('Map failed to load');
        const mapContainer = document.getElementById('map');
        mapContainer.innerHTML = `
            <h3>📍 Our Location</h3>
            <div style="background: #f8f9fa; padding: 2rem; border-radius: 10px; text-align: center;">
                <p><strong>Hill Crest CHS Ltd</strong><br>
                Manpada, Thane West<br>
                Thane - 400607, Maharashtra</p>
                <p><a href="https://maps.google.com/maps?q=Manpada+Thane+West+400607" target="_blank" style="color: #FF6B35; font-weight: 600;">Open in Google Maps</a></p>
            </div>
        `;
    });
}
