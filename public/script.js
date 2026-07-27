const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');

    featureCards.forEach(card => observer.observe(card));
    steps.forEach(step => observer.observe(step));

    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Scroll Spy: update active nav link as user scrolls ---
    const sections = [
        { id: 'top',      href: '#top' },
        { id: 'features', href: '#features' },
        { id: 'explore',  href: '#explore' },
        { id: 'contact',  href: '#contact' }
    ];

    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-list a');

    function setActiveLink(href) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    }

    function onScroll() {
        const scrollPos = window.scrollY + 120; // offset for fixed nav
        let current = '#top';

        sections.forEach(({ id, href }) => {
            const el = id === 'top' ? document.body : document.getElementById(id);
            if (!el) return;
            const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY;
            if (scrollPos >= top) {
                current = href;
            }
        });

        setActiveLink(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

});

class ChatSimulation {
    constructor() {
        this.section = document.querySelector('.chat-example');
        this.messagesContainer = document.getElementById('chat-messages');
        this.inputField = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('chat-send-btn');
        this.isTyping = false;

        if (!this.section || !this.messagesContainer || !this.inputField || !this.sendBtn) {
            return;
        }

        this.script = [
            { type: 'wait', duration: 800 },
            { type: 'type', text: "Don’t forget my girlfriend’s favourite dinner tonight" },
            { type: 'action', action: 'send' },
            { type: 'wait', duration: 1000 },
            { type: 'bot', text: "Got it! 🍝 I'll remind you about the dinner tonight. Have a great time!" },
            { type: 'wait', duration: 1500 },
            { type: 'type', text: "Cab book karni hai airport ke liye subah 6 baje" },
            { type: 'action', action: 'send' },
            { type: 'wait', duration: 1000 },
            { type: 'bot', text: "Zaroor! 🚕 Scheduled: Airport cab reminder for tomorrow at 6:00 AM." },
            { type: 'wait', duration: 1500 },
            { type: 'type', text: "Remind me to call Maa at 9 pm" },
            { type: 'action', action: 'send' },
            { type: 'wait', duration: 1000 },
            { type: 'bot', text: "Done! ❤️ I'll remind you to call Maa at 9:00 PM tonight." },
            { type: 'wait', duration: 3000 },
            { type: 'action', action: 'restart' }
        ];

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.start();
                this.observer.disconnect();
            }
        }, { threshold: 0.5 });

        this.observer.observe(this.section);
    }

    async start() {
        for (let step of this.script) {
            await this.executeStep(step);
            if (step.action === 'restart') {
                this.clearChat();
                this.start();
                return;
            }
        }
    }

    async executeStep(step) {
        switch (step.type) {
            case 'wait':
                return new Promise(resolve => setTimeout(resolve, step.duration));

            case 'type':
                return this.typeText(step.text);

            case 'action':
                if (step.action === 'send') return this.sendMessage();
                break;

            case 'bot':
                return this.botRespond(step.text);
        }
    }

    async typeText(text) {
        this.inputField.value = '';
        for (let i = 0; i < text.length; i++) {
            this.inputField.value += text[i];
            await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 20));
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    async sendMessage() {
        const text = this.inputField.value;
        if (!text) return;

        this.sendBtn.classList.add('active');
        setTimeout(() => this.sendBtn.classList.remove('active'), 150);

        this.addMessage(text, 'user');
        this.inputField.value = '';
    }

    async botRespond(text) {
        const typingId = this.showTyping();
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.removeMessage(typingId);
        this.addMessage(text, 'bot');
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.innerHTML = `
            <div class="chat-bubble">
                ${text}
                <div class="chat-timestamp">${sender === 'bot' ? 'KAIDO • now' : 'Just now'}</div>
            </div>
        `;
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showTyping() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message bot`;
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="chat-bubble waiting">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
        return id;
    }

    removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    clearChat() {
        this.messagesContainer.innerHTML = '';
    }
}

if (document.querySelector('.chat-example')) {
    new ChatSimulation();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const offcanvasEl = document.getElementById('mobileMenu');
        if (offcanvasEl && offcanvasEl.classList.contains('show')) {
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            bsOffcanvas.hide();
        }

        if (targetId === '#top' || targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const newsletterBtn = document.getElementById('newsletter-btn');
    const newsletterEmail = document.getElementById('newsletter-email');

    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', () => {
            const email = newsletterEmail.value;
            if (!email || !email.includes('@')) {
                Swal.fire({
                    title: 'Invalid Email',
                    text: 'Please enter a valid email address.',
                    icon: 'error',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: '#6366f1'
                });
                return;
            }

            Swal.fire({
                title: 'Successfully Subscribed!',
                text: 'You will be notified about our latest updates.',
                icon: 'success',
                background: '#0f172a',
                color: '#fff',
                confirmButtonColor: '#6366f1',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            newsletterEmail.value = '';
        });
    }
});