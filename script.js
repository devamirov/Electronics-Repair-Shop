// ==================== NAVIGATION ==================== 
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navLinks && nav && burger) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // If target section exists on current page, prevent default and smooth scroll
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            // If target section doesn't exist, allow default navigation (going to another page)
        });
    });
}

// Active navigation on scroll
function updateActiveNav() {
    if (!navLinks) return;
    
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Add scrolled class to navbar
function handleNavbarScroll() {
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', () => {
    updateActiveNav();
    handleNavbarScroll();
    revealOnScroll();
});

// ==================== COUNTER ANIMATION ==================== 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ==================== SCROLL REVEAL ANIMATION ==================== 
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Add scroll-reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const featureItems = document.querySelectorAll('.feature-item');
    const contactItems = document.querySelectorAll('.contact-item');
    
    serviceCards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    featureItems.forEach((item, index) => {
        item.classList.add('scroll-reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    contactItems.forEach((item, index) => {
        item.classList.add('scroll-reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ==================== FORM HANDLING ==================== 
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: contactForm.querySelector('[name="name"]').value,
        email: contactForm.querySelector('[name="email"]').value,
        phone: contactForm.querySelector('[name="phone"]').value,
        service: contactForm.querySelector('[name="service"]').value,
        message: contactForm.querySelector('[name="message"]').value,
        date: new Date().toISOString()
    };
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    
    // Simulate sending delay
    setTimeout(() => {
        // Get existing submissions from localStorage
        const submissions = JSON.parse(localStorage.getItem('jawadko_submissions') || '[]');
        
        // Add new submission
        submissions.unshift(formData); // Add to beginning of array
        
        // Save to localStorage
        localStorage.setItem('jawadko_submissions', JSON.stringify(submissions));
        
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 800);
    });
}

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gradient-primary)' : 'var(--gradient-danger)'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== FLOATING ICONS ANIMATION ==================== 
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ==================== SERVICE CARD INTERACTIONS ==================== 
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ==================== FORM INPUT ANIMATIONS ==================== 
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        const icon = input.nextElementSibling;
        if (icon && icon.classList.contains('form-icon')) {
            icon.style.color = 'var(--neon-yellow)';
            icon.style.transform = input.tagName === 'TEXTAREA' ? 'scale(1.2)' : 'translateY(-50%) scale(1.2)';
            icon.style.transition = 'all 0.3s ease';
        }
    });
    
    input.addEventListener('blur', () => {
        const icon = input.nextElementSibling;
        if (icon && icon.classList.contains('form-icon')) {
            icon.style.color = 'var(--neon-blue)';
            icon.style.transform = input.tagName === 'TEXTAREA' ? 'scale(1)' : 'translateY(-50%) scale(1)';
        }
    });
});

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ==================== CURSOR GLOW EFFECT ==================== 
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) {
        const glowElement = document.createElement('div');
        glowElement.className = 'cursor-glow';
        glowElement.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            background: radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            transition: left 0.1s ease, top 0.1s ease;
        `;
        document.body.appendChild(glowElement);
    }
    
    const glowElement = document.querySelector('.cursor-glow');
    glowElement.style.left = e.clientX + 'px';
    glowElement.style.top = e.clientY + 'px';
});

// ==================== BUTTON RIPPLE EFFECT ==================== 
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== SMOOTH SCROLL TO TOP ==================== 
// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border: 2px solid var(--neon-blue);
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.8)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)';
});

// ==================== LOADING ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== INITIALIZE ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Initial scroll reveal check
    revealOnScroll();
    
    // Initial navbar state
    handleNavbarScroll();
    
    // Initial active nav
    updateActiveNav();
    
    console.log('JAWADKO website loaded successfully! 🚀');
});

