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
        });
    });

    // Initialize chatbot after DOM is loaded
    initializeChatbot();
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

// CHATBOT FUNCTIONALITY - Fixed Version
function initializeChatbot() {
    console.log('Initializing chatbot...');
    
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (!chatbotToggle) {
        console.error('Chatbot toggle button not found');
        return;
    }

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

    let chatbotOpen = false;

    // Toggle chatbot
    chatbotToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Chatbot toggle clicked');
        
        chatbotOpen = !chatbotOpen;
        if (chatbotOpen) {
            chatbotWindow.classList.add('active');
            if (chatbotInput) chatbotInput.focus();
            console.log('Chatbot opened');
        } else {
            chatbotWindow.classList.remove('active');
            console.log('Chatbot closed');
        }
    });

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            chatbotOpen = false;
            chatbotWindow.classList.remove('active');
        });
    }

    // Send message function
    function sendMessage() {
        if (!chatbotInput) return;
        
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

    // Global function for quick messages
    window.sendQuickMessage = function(action) {
        console.log('Quick message action:', action);
        
        if (action === 'call') {
            window.open('tel:8454819180', '_self');
            return;
        } else if (action === 'email') {
            window.open('mailto:sankalpservices2025@gmail.com', '_self');
            return;
        } else if (action === 'location') {
            const mapElement = document.getElementById('map');
            if (mapElement) {
                mapElement.scrollIntoView({ behavior: 'smooth' });
            }
            chatbotOpen = false;
            chatbotWindow.classList.remove('active');
            return;
        }
        
        const response = botResponses[action];
        if (response) {
            addBotMessage(response);
        }
    };

    // Add message to chat
    function addMessage(message, type) {
        if (!chatbotMessages) return;
        
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
        if (!chatbotMessages) return;
        
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
        if (!chatbotMessages) return;
        
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
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Auto-bounce animation to attract attention
    setTimeout(() => {
        if (!chatbotOpen && chatbotToggle) {
            chatbotToggle.style.animation = 'bounce 1s infinite';
        }
    }, 3000);
    
    console.log('Chatbot initialized successfully');
}
// Fixed Legal Consultation Functionality
const legalKnowledgeBase = {
    // MCS Act Sections
    'quorum': {
        title: 'Quorum Requirements for Society Meetings',
        source: 'MCS Act 1960 - Section 75',
        content: 'For Annual General Meetings, the quorum shall be 1/10th of total members or 10 members, whichever is higher. For Special General Meetings, quorum is 1/5th of total members or 10 members, whichever is higher. If quorum is not present, the meeting shall be adjourned to the same day next week.',
        section: 'Section 75 - Annual General Body Meeting'
    },
    'committee removal': {
        title: 'Removal of Committee Members',
        source: 'MCS Act 1960 - Sections 73-ID & 78A',
        content: 'Committee members can be removed through: 1) No-confidence motion passed by 2/3rd majority of members present (Section 73-ID), 2) Registrar\'s power to remove for misconduct, incapacity, or acting against society interests (Section 78A), 3) Automatic disqualification under Section 73CA for various grounds.',
        section: 'Sections 73-ID, 78A, 73CA'
    },
    'audit': {
        title: 'Audit Requirements for Cooperative Societies',
        source: 'MCS Act 1960 - Section 81',
        content: 'Every society must conduct annual audit by qualified auditors appointed by the Registrar or approved auditors. Audit must be completed within 6 months of cooperative year end. Audit report must be presented at AGM. Society must maintain proper books of accounts as prescribed.',
        section: 'Section 81 - Audit'
    },
    'membership transfer': {
        title: 'Transfer of Membership Rules',
        source: 'MCS Act 1960 - Sections 29 & 154B-12',
        content: 'Transfer of shares/membership requires: 1) Written application to committee, 2) Committee approval within 30 days, 3) Transferee must be eligible for membership, 4) All dues cleared, 5) Transfer deed executed, 6) Entry in member register. For housing societies, additional consent of 2/3rd committee members required.',
        section: 'Sections 29, 154B-12'
    },
    'reserve fund': {
        title: 'Reserve Fund Requirements',
        source: 'MCS Act 1960 - Section 66',
        content: 'Every society must transfer minimum 25% of annual net profits to Reserve Fund until it equals the share capital or amount prescribed by Registrar. Reserve Fund can only be used for: 1) Meeting losses, 2) Covering depreciation, 3) With Registrar\'s permission for specific purposes.',
        section: 'Section 66 - Reserve Fund'
    },
    'election': {
        title: 'Committee Election Procedures',
        source: 'MCS Act 1960 - Sections 73AAA & 73CB',
        content: 'Elections conducted by State Cooperative Election Authority. Committee term is 5 years. Elections must be completed before expiry. Nominations, scrutiny, polling conducted as per rules. Reserved seats for SC/ST/OBC and women as applicable. Election disputes decided by Cooperative Courts.',
        section: 'Sections 73AAA, 73CB'
    }
};

// Fixed Tab switching functionality
window.switchTab = function(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected tab and button
    const targetTab = document.getElementById(tabName + '-tab');
    const clickedButton = event ? event.target : document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    
    if (targetTab) {
        targetTab.classList.add('active');
    }
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
};

// Fixed Legal search functionality
window.searchLegal = function(query) {
    console.log('Search function called with query:', query);
    
    const searchInput = document.getElementById('legal-search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        console.error('Search elements not found');
        return;
    }
    
    if (query) {
        searchInput.value = query;
    } else {
        query = searchInput.value.trim();
    }
    
    if (!query) {
        alert('Please enter a search query');
        return;
    }
    
    console.log('Performing search for:', query);
    
    // Show loading
    searchResults.innerHTML = `
        <div class="search-loading">
            <div class="spinner"></div>
            <p>Searching through legal documents...</p>
        </div>
    `;
    
    // Simulate AI search delay
    setTimeout(() => {
        const results = performLegalSearch(query);
        displaySearchResults(results);
    }, 1500);
};

function performLegalSearch(query) {
    const queryLower = query.toLowerCase();
    const results = [];
    
    // Search through knowledge base
    for (const [key, value] of Object.entries(legalKnowledgeBase)) {
        if (queryLower.includes(key) || 
            value.title.toLowerCase().includes(queryLower) || 
            value.content.toLowerCase().includes(queryLower)) {
            results.push(value);
        }
    }
    
    // Additional keyword matching
    const keywords = {
        'meeting': ['quorum', 'election'],
        'member': ['membership transfer', 'committee removal'],
        'vote': ['quorum', 'election'],
        'money': ['reserve fund', 'audit'],
        'fund': ['reserve fund', 'audit'],
        'remove': ['committee removal'],
        'elect': ['election'],
        'transfer': ['membership transfer']
    };
    
    for (const [keyword, relatedTopics] of Object.entries(keywords)) {
        if (queryLower.includes(keyword)) {
            relatedTopics.forEach(topic => {
                if (legalKnowledgeBase[topic] && !results.some(r => r.title === legalKnowledgeBase[topic].title)) {
                    results.push(legalKnowledgeBase[topic]);
                }
            });
        }
    }
    
    // If no specific matches, provide general guidance
    if (results.length === 0) {
        results.push({
            title: 'General Legal Guidance Required',
            source: 'SMACS Legal Consultation',
            content: `Your query "${query}" requires specific legal analysis. Our experts can provide detailed guidance on this matter. Common areas we help with include committee matters, member disputes, compliance issues, audit requirements, and society governance.`,
            section: 'Expert Consultation Recommended'
        });
    }
    
    return results;
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (!searchResults) {
        console.error('Search results container not found');
        return;
    }
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <h4>No Results Found</h4>
                <p>Try rephrasing your question or contact our experts for personalized assistance.</p>
            </div>
        `;
        return;
    }
    
    let resultsHTML = '<h3>Search Results:</h3>';
    
    results.forEach(result => {
        resultsHTML += `
            <div class="search-result-item">
                <div class="source-tag">${result.source}</div>
                <h4>${result.title}</h4>
                <div class="section-reference">${result.section}</div>
                <p>${result.content}</p>
            </div>
        `;
    });
    
    resultsHTML += `
        <div class="search-result-item" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-left-color: #2196f3;">
            <h4>Need More Detailed Guidance?</h4>
            <p>For complex legal matters or specific consultation, our experienced team at SMACS can provide personalized assistance. Contact Pankaj Kamble at <a href="tel:8454819180">8454819180</a> or email us at <a href="mailto:sankalpservices2025@gmail.com">sankalpservices2025@gmail.com</a></p>
        </div>
    `;
    
    searchResults.innerHTML = resultsHTML;
}

// Fixed Document browser functionality
window.showChapter = function(chapterName) {
    console.log('Showing chapter:', chapterName);
    
    const documentContent = document.getElementById('document-content');
    if (!documentContent) {
        console.error('Document content container not found');
        return;
    }
    
    const chapters = {
        'registration': {
            title: 'Chapter II - Registration of Societies',
            content: `
                <h4>Key Provisions:</h4>
                <p><span class="section-number">Section 6:</span> Minimum 10 adult persons required for registration</p>
                <p><span class="section-number">Section 8:</span> Application must include proposed bylaws, list of members, and registration fee</p>
                <p><span class="section-number">Section 9:</span> Registrar has 4 months to approve or reject with reasons</p>
                <p><span class="section-number">Section 13:</span> Bylaws can be amended with 2/3rd majority and Registrar approval</p>
                <p><span class="section-number">Section 21:</span> Registration can be cancelled for violations or non-compliance</p>
            `
        },
        'members': {
            title: 'Chapter III - Members Rights and Liabilities',
            content: `
                <h4>Key Provisions:</h4>
                <p><span class="section-number">Section 22:</span> Any adult person can become member unless disqualified</p>
                <p><span class="section-number">Section 26:</span> Members have right to inspect books, attend meetings, vote</p>
                <p><span class="section-number">Section 27:</span> Voting rights based on shareholding with maximum limit</p>
                <p><span class="section-number">Section 28:</span> Member cannot hold more than 20% shares or Rs. 1000 worth</p>
                <p><span class="section-number">Section 35:</span> Members can be expelled for misconduct with proper procedure</p>
            `
        },
        'management': {
            title: 'Chapter VII - Management of Societies',
            content: `
                <h4>Key Provisions:</h4>
                <p><span class="section-number">Section 72:</span> General body is the final authority of society</p>
                <p><span class="section-number">Section 73:</span> Committee manages day-to-day affairs, elected for 5 years</p>
                <p><span class="section-number">Section 75:</span> AGM must be held within 6 months of year end</p>
                <p><span class="section-number">Section 78:</span> Registrar can suspend committee for misconduct</p>
                <p><span class="section-number">Section 79:</span> Societies must file annual returns and statements</p>
            `
        },
        'audit': {
            title: 'Chapter VIII - Audit, Inquiry, Inspection and Supervision',
            content: `
                <h4>Key Provisions:</h4>
                <p><span class="section-number">Section 81:</span> Annual audit mandatory by qualified auditors</p>
                <p><span class="section-number">Section 82:</span> Defects in accounts must be rectified within specified time</p>
                <p><span class="section-number">Section 83:</span> Registrar can conduct inquiry into society affairs</p>
                <p><span class="section-number">Section 88:</span> Damages can be assessed against delinquent promoters</p>
                <p><span class="section-number">Section 89A:</span> Registrar has power to inspect society working</p>
            `
        },
        'disputes': {
            title: 'Chapter IX - Settlement of Disputes',
            content: `
                <h4>Key Provisions:</h4>
                <p><span class="section-number">Section 91:</span> Disputes must be referred to Cooperative Courts</p>
                <p><span class="section-number">Section 92:</span> Limitation period of 2 years for dispute reference</p>
                <p><span class="section-number">Section 94:</span> Cooperative Courts have powers of civil courts</p>
                <p><span class="section-number">Section 96:</span> Awards are final and binding on parties</p>
                <p><span class="section-number">Section 98:</span> Recovery as per land revenue procedures</p>
            `
        },
        'housing': {
            title: 'Chapter XIII-B - Cooperative Housing Societies',
            content: `
                <h4>Key Provisions:</h4>
                <p><span class="section-number">Section 154B-12:</span> Share transfer requires 2/3rd committee consent</p>
                <p><span class="section-number">Section 154B-19:</span> Committee of 7-15 members, 5-year term</p>
                <p><span class="section-number">Section 154B-21:</span> 33% seats reserved for women</p>
                <p><span class="section-number">Section 154B-26:</span> Allotment through draw of lots mandatory</p>
                <p><span class="section-number">Section 154B-29:</span> Dues recoverable as land revenue</p>
            `
        }
    };
    
    if (chapters[chapterName]) {
        documentContent.innerHTML = `
            <h4>${chapters[chapterName].title}</h4>
            ${chapters[chapterName].content}
            <p style="margin-top: 2rem; font-style: italic; color: var(--text-light);">
                For detailed interpretation and specific cases, consult with SMACS legal experts.
            </p>
        `;
    }
};

window.showBylaw = function(bylawName) {
    console.log('Showing bylaw:', bylawName);
    
    const documentContent = document.getElementById('document-content');
    if (!documentContent) {
        console.error('Document content container not found');
        return;
    }
    
    const bylaws = {
        'membership': {
            title: 'Model Bylaw - Membership Rules',
            content: `
                <h4>Membership Provisions:</h4>
                <p><span class="section-number">Bylaw 7:</span> Application for membership in prescribed form</p>
                <p><span class="section-number">Bylaw 12:</span> Membership fee and share money requirements</p>
                <p><span class="section-number">Bylaw 15:</span> Rights and duties of members</p>
                <p><span class="section-number">Bylaw 18:</span> Termination of membership procedures</p>
                <p><span class="section-number">Bylaw 25:</span> Liability of members for society debts</p>
            `
        },
        'committee': {
            title: 'Model Bylaw - Committee Formation',
            content: `
                <h4>Committee Management:</h4>
                <p><span class="section-number">Bylaw 45:</span> Committee composition and election process</p>
                <p><span class="section-number">Bylaw 47:</span> Powers and functions of committee</p>
                <p><span class="section-number">Bylaw 52:</span> Committee meetings and quorum</p>
                <p><span class="section-number">Bylaw 58:</span> Sub-committees and delegation of powers</p>
                <p><span class="section-number">Bylaw 62:</span> Committee member disqualifications</p>
            `
        },
        'meetings': {
            title: 'Model Bylaw - Meetings and Procedures',
            content: `
                <h4>Meeting Procedures:</h4>
                <p><span class="section-number">Bylaw 70:</span> Annual General Meeting procedures</p>
                <p><span class="section-number">Bylaw 75:</span> Special General Meeting convening</p>
                <p><span class="section-number">Bylaw 78:</span> Notice requirements for meetings</p>
                <p><span class="section-number">Bylaw 82:</span> Voting procedures and proxy voting</p>
                <p><span class="section-number">Bylaw 85:</span> Meeting minutes and records</p>
            `
        },
        'financial': {
            title: 'Model Bylaw - Financial Management',
            content: `
                <h4>Financial Provisions:</h4>
                <p><span class="section-number">Bylaw 95:</span> Collection of funds and charges</p>
                <p><span class="section-number">Bylaw 102:</span> Investment of surplus funds</p>
                <p><span class="section-number">Bylaw 108:</span> Audit and accounts maintenance</p>
                <p><span class="section-number">Bylaw 115:</span> Reserve fund management</p>
                <p><span class="section-number">Bylaw 120:</span> Budget preparation and approval</p>
            `
        },
        'transfer': {
            title: 'Model Bylaw - Property Transfer',
            content: `
                <h4>Transfer Procedures:</h4>
                <p><span class="section-number">Bylaw 125:</span> Share and interest transfer process</p>
                <p><span class="section-number">Bylaw 130:</span> No Objection Certificate procedures</p>
                <p><span class="section-number">Bylaw 135:</span> Transfer fees and documentation</p>
                <p><span class="section-number">Bylaw 140:</span> Society consent requirements</p>
                <p><span class="section-number">Bylaw 145:</span> Registration with sub-registrar</p>
            `
        },
        'misc': {
            title: 'Model Bylaw - Miscellaneous Provisions',
            content: `
                <h4>Other Important Provisions:</h4>
                <p><span class="section-number">Bylaw 150:</span> Maintenance and repairs responsibility</p>
                <p><span class="section-number">Bylaw 155:</span> Use of common areas</p>
                <p><span class="section-number">Bylaw 160:</span> Dispute resolution procedures</p>
                <p><span class="section-number">Bylaw 165:</span> Amendment of bylaws process</p>
                <p><span class="section-number">Bylaw 170:</span> Dissolution procedures</p>
            `
        }
    };
    
    if (bylaws[bylawName]) {
        documentContent.innerHTML = `
            <h4>${bylaws[bylawName].title}</h4>
            ${bylaws[bylawName].content}
            <p style="margin-top: 2rem; font-style: italic; color: var(--text-light);">
                These are model bylaws. Actual bylaws may vary for each society. SMACS can help draft customized bylaws.
            </p>
        `;
    }
};

// Fixed FAQ toggle functionality
window.toggleFAQ = function(element) {
    console.log('Toggling FAQ');
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
};

// Enhanced Event listeners for consultation section
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing consultation section...');
    
    // Legal search functionality
    const legalSearchBtn = document.getElementById('legal-search-btn');
    const legalSearchInput = document.getElementById('legal-search-input');
    
    if (legalSearchBtn) {
        legalSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Search button clicked');
            searchLegal();
        });
        console.log('Search button event listener added');
    } else {
        console.error('Legal search button not found');
    }
    
    if (legalSearchInput) {
        legalSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Enter key pressed in search input');
                searchLegal();
            }
        });
        console.log('Search input event listener added');
    } else {
        console.error('Legal search input not found');
    }
    
    // Tab button event listeners
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.textContent.includes('Search') ? 'search' : 
                           this.textContent.includes('Browse') ? 'browse' : 'faq';
            console.log('Tab button clicked:', tabName);
            switchTab(tabName);
        });
    });
    
    console.log('Consultation section initialized successfully');
});
