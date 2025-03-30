/**
 * Aalart Website Slider Functionality
 * Includes:
 * 1. Hero Slider for homepage
 * 2. Products Slider for continuous product display
 * 3. Testimonial Slider
 * 4. Product Detail Page Image Slider
 */

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    let currentSlide = 0;
    let interval;

    // Initialize slider
    function init() {
        if (slides.length === 0) return;
        
        showSlide(0);
        setupIndicators();
        startAutoSlide();
    }

    // Show specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
    }

    // Set up indicator click events
    function setupIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });
    }

    // Start auto-sliding
    function startAutoSlide() {
        if (slides.length <= 1) return;
        
        interval = setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= slides.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        }, 5000);
    }

    // Reset interval when manually changing slides
    function resetInterval() {
        clearInterval(interval);
        startAutoSlide();
    }

    // Initialize slider on load
    init();
}

// Products Slider
// function initProductsSlider() {
//     const slider = document.querySelector('.products-slider');
//     if (!slider) return;

//     const track = slider.querySelector('.products-slider-track');
//     const slides = slider.querySelectorAll('.product-slide');
//     const prevBtn = slider.querySelector('.slider-prev');
//     const nextBtn = slider.querySelector('.slider-next');
    
//     let slideWidth = 0;
//     let slidesToShow = 3;
//     let currentPosition = 0;
//     let maxPosition = 0;

//     // Initialize slider
//     function init() {
//         if (slides.length === 0) return;
        
//         calculateDimensions();
//         updateButtons();
//         setupEvents();
        
//         // Auto slide for products
//         setInterval(() => {
//             if (currentPosition < maxPosition) {
//                 moveSlider(currentPosition + 1);
//             } else {
//                 moveSlider(0);
//             }
//         }, 8000);
//     }

//     // Calculate dimensions based on screen size
//     function calculateDimensions() {
//         slidesToShow = calculateSlidesToShow();
//         slideWidth = slides[0].offsetWidth;
        
//         // Calculate max scroll position
//         maxPosition = Math.max(0, slides.length - slidesToShow);
        
//         // Update track width
//         track.style.width = `${slides.length * slideWidth}px`;
//     }

//     // Determine number of slides to show based on screen width
//     function calculateSlidesToShow() {
//         const width = window.innerWidth;
//         if (width < 576) return 1;
//         if (width < 992) return 2;
//         return 3;
//     }

//     // Move slider to specific position
//     function moveSlider(position) {
//         currentPosition = Math.max(0, Math.min(position, maxPosition));
//         updateSliderPosition();
//         updateButtons();
//     }

//     // Update CSS transform to move slider
//     function updateSliderPosition() {
//         track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
//     }

//     // Update button states
//     function updateButtons() {
//         if (prevBtn) {
//             prevBtn.disabled = currentPosition === 0;
//         }
//         if (nextBtn) {
//             nextBtn.disabled = currentPosition >= maxPosition;
//         }
//     }

//     // Set up event listeners
//     function setupEvents() {
//         if (prevBtn) {
//             prevBtn.addEventListener('click', () => {
//                 moveSlider(currentPosition - 1);
//             });
//         }
        
//         if (nextBtn) {
//             nextBtn.addEventListener('click', () => {
//                 moveSlider(currentPosition + 1);
//             });
//         }
        
//         // Recalculate on window resize
//         window.addEventListener('resize', () => {
//             calculateDimensions();
//             updateSliderPosition();
//         });
//     }

//     // Initialize
//     init();
// }

function initProductsSlider() {
    // const slider = document.querySelector('.products-slider');
    // if (!slider) return;

    // const track = slider.querySelector('.products-slider-track');
    // const slides = slider.querySelectorAll('.product-slide');
    // const prevBtn = slider.querySelector('.slider-prev');
    // const nextBtn = slider.querySelector('.slider-next');
    
    // let slideWidth = 0;
    // let slidesToShow = 3;
    // let currentPosition = 0;
    // let maxPosition = 0;
    // let interval;

    // function init() {
    //     if (slides.length === 0) return;
    //     calculateDimensions();
    //     updateButtons();
    //     setupEvents();
    //     startAutoSlide();
    // }
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

    function init() {
        if (slides.length === 0) return;
        // Wait for images to load
        const images = slider.querySelectorAll('img');
        Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => img.onload = resolve);
        })).then(() => {
            calculateDimensions();
            updateButtons();
            updateSliderPosition();
            setupEvents();
            startAutoSlide();
        });
    }
    // function calculateDimensions() {
    //     slidesToShow = calculateSlidesToShow();
    //     slideWidth = slides[0].offsetWidth + 20; // Include margin
    //     maxPosition = Math.max(0, slides.length - slidesToShow);
    //     track.style.width = `${slides.length * slideWidth}px`;
    // }
    
    function calculateDimensions() {
        slidesToShow = calculateSlidesToShow();
        slideWidth = slides[0].offsetWidth + 20;
        console.log('Slide Width:', slideWidth, 'Slides to Show:', slidesToShow);
        maxPosition = Math.max(0, slides.length - slidesToShow);
        track.style.width = `${slides.length * slideWidth}px`;
    }

    // function calculateSlidesToShow() {
    //     const width = window.innerWidth;
    //     if (width <= 576) return 1;
    //     if (width <= 992) return 2;
    //     return 3;
    // }
    function calculateSlidesToShow() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        return 2;
    }

    function moveSlider(position) {
        currentPosition = Math.max(0, Math.min(position, maxPosition));
        updateSliderPosition();
        updateButtons();
    }

    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
    }

    function updateButtons() {
        if (prevBtn) prevBtn.disabled = currentPosition === 0;
        if (nextBtn) nextBtn.disabled = currentPosition >= maxPosition;
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            if (currentPosition < maxPosition) {
                moveSlider(currentPosition + 1);
            } else {
                moveSlider(0);
            }
        }, 2000);
    }

    function resetAutoSlide() {
        clearInterval(interval);
        startAutoSlide();
    }

    function setupEvents() {
        if (prevBtn) prevBtn.addEventListener('click', () => { moveSlider(currentPosition - 1); resetAutoSlide(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { moveSlider(currentPosition + 1); resetAutoSlide(); });
        window.addEventListener('resize', () => {
            calculateDimensions();
            updateSliderPosition();
        });
    }

    init();
}


// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    let currentIndex = 0;
    let interval;

    // Initialize slider
    function init() {
        if (testimonials.length <= 1) return;
        
        showTestimonial(0);
        setupIndicators();
        startAutoSlide();
    }

    // Show specific testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        currentIndex = index;
        testimonials[currentIndex].style.display = 'block';
        
        if (indicators[currentIndex]) {
            indicators[currentIndex].classList.add('active');
        }
    }

    // Set up indicator click events
    function setupIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showTestimonial(index);
                resetInterval();
            });
        });
    }

    // Start auto-sliding
    function startAutoSlide() {
        interval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= testimonials.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        }, 6000);
    }

    // Reset interval when manually changing testimonials
    function resetInterval() {
        clearInterval(interval);
        startAutoSlide();
    }

    // Initialize
    init();
}

// Product Detail Page Image Slider
function initProductImageSlider() {
    const slides = document.querySelectorAll('.product-image-slide');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    // Initialize slider
    function init() {
        if (slides.length === 0) return;
        
        // Show first image by default
        showImage(0);
        
        // Set up thumbnail click events
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                showImage(index);
            });
        });
    }
    
    // Show specific image
    function showImage(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
        
        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');
    }
    
    // Initialize
    init();
}

// Initialize all sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    // initProductsSlider();
    initTestimonialSlider();
    initProductImageSlider();
});