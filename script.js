// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Check if elements exist
    if (!navToggle || !navMenu) {
        console.log('Navbar elements not found');
        return;
    }
    
    // Toggle menu function
    function toggleMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
    
    // Close menu function
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    // Toggle menu on hamburger click
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu on window resize (if menu is open)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});

// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-item');
        this.dots = document.querySelectorAll('.nav-dot');
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Add event listeners to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Auto-play carousel
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(next);
    }
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
}

// Initialize testimonials carousel
document.addEventListener('DOMContentLoaded', function() {
    new TestimonialsCarousel();
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mesajınız gönderiliyor...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Teşekkürler! Mesajınız başarıyla gönderildi.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10B981';
            break;
        case 'error':
            notification.style.backgroundColor = '#EF4444';
            break;
        case 'info':
        default:
            notification.style.backgroundColor = '#3B82F6';
            break;
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(233, 227, 223, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(233, 227, 223, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Portfolio item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Service card animations
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
});

// WhatsApp button functionality
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // The link will handle the WhatsApp redirect
            // This is just for additional tracking if needed
            console.log('WhatsApp butonu tıklandı');
        });
    }
});

// Lazy loading for images (if any are added later)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}); 