// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('show');
            
            // Transform hamburger into X
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('animate'));
            
            // Add animation classes for hamburger
            if (mobileNav.classList.contains('show')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.hamburger') && !event.target.closest('.mobile-nav') && mobileNav.classList.contains('show')) {
            mobileNav.classList.remove('show');
            
            // Reset hamburger animation
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
    
    // Close mobile nav when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
            mobileNav.classList.remove('show');
            
            // Reset hamburger animation
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
    
    // Scroll behavior for header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            header.style.backgroundColor = 'var(--white)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Initialize AOS (if using)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if current path matches link or if it's the home page
        if (currentLocation.includes(linkPath) && linkPath !== '/' && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if ((currentLocation === '/' || currentLocation.includes('index.html')) && (linkPath === '/' || linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Back to top button functionality
window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
});

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    let currentIndex = 0;
    
    if (testimonials.length === 0) return;
    
    // Function to show testimonial at index
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show selected testimonial
        testimonials[index].style.display = 'block';
        testimonials[index].classList.add('active');
        
        // Add active class to selected indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentIndex = index;
    }
    
    // Initialize
    showTestimonial(0);
    
    // Click event for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider if it exists
    if (document.querySelector('.testimonials-slider')) {
        initTestimonialSlider();
    }
    
    // Initialize counters if they exist
    if (document.querySelector('.counter-value')) {
        initCounters();
    }
});