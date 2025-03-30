/**
 * Products Slider - Standalone Version
 * Features:
 * - Responsive design for all screen sizes
 * - Touch swipe support for mobile
 * - Auto-sliding with reset on manual navigation
 * - Dynamic slide width calculation based on screen size
 */

// Initialize the product slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProductsSlider();
});

// Main slider initialization function
function initProductsSlider() {
    const slider = document.querySelector('.products-slider');
    if (!slider) return;

    const track = slider.querySelector('.products-slider-track');
    const slides = slider.querySelectorAll('.product-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let slideWidth = 0;
    let slidesToShow = 3;
    let currentPosition = 0;
    let maxPosition = 0;
    let autoSlideInterval;

    // Initialize slider
    function init() {
        if (slides.length === 0) return;
        
        calculateDimensions();
        setupSlideWidths();
        updateButtons();
        setupEvents();
        
        // Start auto slide for products
        startAutoSlide();
    }

    // Start auto sliding with interval
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        
        autoSlideInterval = setInterval(() => {
            if (currentPosition < maxPosition) {
                moveSlider(currentPosition + 1);
            } else {
                moveSlider(0);
            }
        }, 8000);
    }

    // Set proper widths for slides based on screen size
    function setupSlideWidths() {
        const slideMargin = 20; // Keep consistent with CSS
        
        slides.forEach(slide => {
            if (window.innerWidth < 576) {
                // On very small screens, make slides full width minus margin
                slide.style.width = `calc(100% - ${slideMargin}px)`;
            } else if (window.innerWidth < 992) {
                // On medium screens
                slide.style.width = `calc(50% - ${slideMargin}px)`;
            } else {
                // On large screens
                slide.style.width = `calc(33.333% - ${slideMargin}px)`;
            }
        });
    }

    // Calculate dimensions based on screen size
    function calculateDimensions() {
        slidesToShow = calculateSlidesToShow();
        
        // Apply slide widths before calculating
        setupSlideWidths();
        
        // Need a slight delay to ensure CSS has been applied
        setTimeout(() => {
            slideWidth = slides[0].offsetWidth + 20; // 20px for margin-right
            
            // Calculate max scroll position
            maxPosition = Math.max(0, slides.length - slidesToShow);
            
            // Update slider position after recalculation
            updateSliderPosition();
        }, 10);
    }

    // Determine number of slides to show based on screen width
    function calculateSlidesToShow() {
        const width = window.innerWidth;
        if (width < 576) return 1;
        if (width < 992) return 2;
        return 3;
    }

    // Move slider to specific position
    function moveSlider(position) {
        currentPosition = Math.max(0, Math.min(position, maxPosition));
        updateSliderPosition();
        updateButtons();
    }

    // Update CSS transform to move slider
    function updateSliderPosition() {
        // If slideWidth is properly set, use it for translation
        if (slideWidth > 0) {
            track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
        }
    }

    // Update button states (disabled/enabled)
    function updateButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentPosition === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPosition >= maxPosition;
        }
    }

    // Set up all event listeners
    function setupEvents() {
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                moveSlider(currentPosition - 1);
                resetAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveSlider(currentPosition + 1);
                resetAutoSlide();
            });
        }
        
        // Make product links work properly with the slider
        const productLinks = slider.querySelectorAll('.product-link');
        productLinks.forEach(link => {
            let isClick = false;
            let startX = 0;
            
            // Track if user is clicking or swiping
            link.addEventListener('mousedown', (e) => {
                isClick = true;
                startX = e.pageX;
            });
            
            link.addEventListener('mousemove', (e) => {
                if (Math.abs(e.pageX - startX) > 10) {
                    isClick = false;
                }
            });
            
            link.addEventListener('click', (e) => {
                // If it's not a click but a swipe or slider movement, prevent navigation
                if (!isClick) {
                    e.preventDefault();
                }
                // Reset for next interaction
                isClick = true;
            });
        });
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            calculateDimensions();
        });
        
        // Add touch swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        let isTouchClick = true;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isTouchClick = true;
        }, {passive: true});
        
        slider.addEventListener('touchmove', (e) => {
            if (Math.abs(e.changedTouches[0].screenX - touchStartX) > 10) {
                isTouchClick = false;
            }
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            
            // Prevent clicks right after swipe
            if (!isTouchClick) {
                const links = slider.querySelectorAll('a');
                links.forEach(link => {
                    link.addEventListener('click', preventClick, { once: true });
                });
                
                setTimeout(() => {
                    links.forEach(link => {
                        link.removeEventListener('click', preventClick);
                    });
                }, 300);
            }
        }, {passive: true});
        
        function preventClick(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance to consider as swipe
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - move to next slide
                moveSlider(currentPosition + 1);
                resetAutoSlide();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - move to previous slide
                moveSlider(currentPosition - 1);
                resetAutoSlide();
            }
        }
    }
    
    // Reset auto slide timer when manual navigation happens
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize the slider
    init();
}