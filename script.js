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
// ... Keep all your existing JavaScript code ...

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Chatbot responses for society management
const botResponses = {
    'services': {
        message: "SMACS offers comprehensive society management services:",
        quickActions: [
            { text: "Accounting Services", action: "accounting" },
            { text: "Compliance Management", action: "compliance" },
            { text: "Legal Advisory", action: "legal" },
            { text: "Builder Handover", action: "handover" }
        ]
    },
    'accounting': {
        message: "Our accounting services include:\n• Financial statement preparation\n• Budgeting & forecasting\n• GST compliance\n• Audit assistance\n• Monthly financial reports\n\nWould you like to know about pricing or schedule a consultation?",
        quickActions: [
            { text: "Pricing Info", action: "pricing" },
            { text: "Schedule Call", action: "contact" }
        ]
    },
    'compliance': {
        message: "We handle all compliance requirements:\n• GST registration & filing\n• TDS compliance\n• Society registration\n• Regulatory compliance\n• Audit support\n\nOur compliance rate is 100% for all clients!",
        quickActions: [
            { text: "Get Started", action: "contact" },
            { text: "More Services", action: "services" }
        ]
    },
    'legal': {
        message: "Legal advisory services:\n• Agreement drafting\n• Dispute resolution\n• Legal documentation\n• Committee formation\n• By-law preparation\n\nOur legal experts have 15+ years experience.",
        quickActions: [
            { text: "Contact Expert", action: "contact" },
            { text: "View Profile", action: "profile" }
        ]
    },
    'handover': {
        message: "Builder handover management:\n• Due diligence\n• Asset verification\n• Legal documentation\n• Financial audit\n• Smooth transition\n\nWe've successfully managed handovers for L&T, Omkar, Adani & Kanakia projects.",
        quickActions: [
            { text: "Success Stories", action: "success" },
            { text: "Get Quote", action: "contact" }
        ]
    },
    'pricing': {
        message: "Our pricing is transparent and competitive:\n\n• Accounting Services: ₹5,000-15,000/month\n• Compliance Management: ₹3,000-8,000/month\n• Legal Advisory: ₹2,000-10,000/case\n• Complete Management: ₹10,000-25,000/month\n\n*Pricing varies based on society size and requirements",
        quickActions: [
            { text: "Get Custom Quote", action: "contact" },
            { text: "Our Services", action: "services" }
        ]
    },
    'contact': {
        message: "Ready to get started? Contact our experts:\n\n📞 Pankaj Kamble: 8454819180\n📞 Sudhir Dingankar: 8879782239\n✉️ sankalpservices2025@gmail.com\n\nOffice: Hill Crest CHS Ltd, Manpada, Thane West - 400607",
        quickActions: [
            { text: "Call Now", action: "call" },
            { text: "Send Email", action: "email" },
            { text: "View Location", action: "location" }
        ]
    },
    'profile': {
        message: "Meet our expert team:\n\n👨‍💼 Pankaj Kamble - Partner\n• MBA Finance, CFA\n• 10+ years experience\n• Digital transformation expert\n\n👨‍💼 Sudhir Dingankar - Partner\n• B.Com, M.Com\n• 15+ years experience\n• Certified by Housing Federation",
        quickActions: [
            { text: "Contact Team", action: "contact" },
            { text: "Our Services", action: "services" }
        ]
    },
    'success': {
        message: "Our success stories:\n\n🏢 L&T Emerald Powai - Complete handover management\n🏢 Omkar Alta Monte - Digital transformation\n🏢 Adani Western Heights - End-to-end accounting\n🏢 Kanakia Zillion - Legal transition\n\nAll projects completed successfully with 100% client satisfaction!",
        quickActions: [
            { text: "Start Your Project", action: "contact" },
            { text: "Our Services", action: "services" }
        ]
    }
};

// Common responses for general queries
const commonResponses = [
    "I'd be happy to help you with that! For specific information about society management, please contact our experts at 8454819180.",
    "Thanks for your question! Our team specializes in society management. You can reach Pankaj at 8454819180 for detailed assistance.",
    "That's a great question! For personalized solutions, please call us at 8454819180 or email sankalpservices2025@gmail.com.",
    "I understand your query. Our experienced team at SMACS can provide the best solution. Contact us at 8454819180."
];

// Initialize chatbot
let chatbotOpen = false;

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
        chatbotWindow.classList.add('active');
        chatbotInput.focus();
    } else {
        chatbotWindow.classList.remove('active');
    }
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
    chatbotOpen = false;
    chatbotWindow.classList.remove('active');
});

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate bot response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        addBotMessage(response);
    }, 1000);
}

// Send quick message
function sendQuickMessage(action) {
    const response = botResponses[action];
    if (response) {
        addBotMessage(response);
    }
}

// Add message to chat
function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${type === 'user' ? '👤' : '🤖'}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Add bot message with quick actions
function addBotMessage(response) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    
    let quickActionsHTML = '';
    if (response.quickActions) {
        quickActionsHTML = '<div class="quick-actions">';
        response.quickActions.forEach(action => {
            quickActionsHTML += `<button class="quick-btn" onclick="sendQuickMessage('${action.action}')">${action.text}</button>`;
        });
        quickActionsHTML += '</div>';
    }
    
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p>${response.message.replace(/\n/g, '<br>')}</p>
            ${quickActionsHTML}
        </div>
    `;
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate bot response
function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords
    if (message.includes('service') || message.includes('what') || message.includes('offer')) {
        return botResponses['services'];
    } else if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
        return botResponses['pricing'];
    } else if (message.includes('contact') || message.includes('call') || message.includes('phone')) {
        return botResponses['contact'];
    } else if (message.includes('account') || message.includes('financ')) {
        return botResponses['accounting'];
    } else if (message.includes('legal') || message.includes('law')) {
        return botResponses['legal'];
    } else if (message.includes('handover') || message.includes('builder')) {
        return botResponses['handover'];
    } else if (message.includes('team') || message.includes('profile')) {
        return botResponses['profile'];
    } else {
        // Return random common response
        const randomIndex = Math.floor(Math.random() * commonResponses.length);
        return {
            message: commonResponses[randomIndex],
            quickActions: [
                { text: "Our Services", action: "services" },
                { text: "Contact Us", action: "contact" },
                { text: "Pricing Info", action: "pricing" }
            ]
        };
    }
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Handle special actions
window.sendQuickMessage = function(action) {
    if (action === 'call') {
        window.open('tel:8454819180', '_self');
    } else if (action === 'email') {
        window.open('mailto:sankalpservices2025@gmail.com', '_self');
    } else if (action === 'location') {
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
        chatbotOpen = false;
        chatbotWindow.classList.remove('active');
    } else {
        sendQuickMessage(action);
    }
};

// Auto-open chatbot after 5 seconds (optional)
setTimeout(() => {
    if (!chatbotOpen) {
        chatbotToggle.style.animation = 'bounce 1s infinite';
    }
}, 5000);
