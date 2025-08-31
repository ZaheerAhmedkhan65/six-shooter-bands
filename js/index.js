import { products, featuredProducts, topProducts } from '../data/Products.js';
import { COMPANY_WHATSAPP_NUMBER, IS_FIRST_VISIT, CACHED_PRODUCTS, CACHED_TOP_PRODUCTS, CACHED_FEATURED_PRODUCTS } from '../data/constants.js';
// DOM Elements
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalProductName = document.getElementById('modalProductName');
const modalDescription = document.getElementById('modalDescription');
// const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalSpecs = document.getElementById('modalSpecs');
const preloader = document.getElementById('preloader');
const featuredSlider = document.getElementById('featuredSlider');
const productsGrid = document.getElementById('productsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');
const sliderContainer = document.querySelector('.slider-container');

const featuredProductsGrid = document.getElementById('featuredProductsGrid');

// Slider state
let currentSlide = 0;
let slideWidth = 0;
let totalSlides = 0;
let slidesPerView = 4;
let touchStartX = 0;
let touchEndX = 0;
let productsToDisplay = [];

if(currentPage == 'home') {
    productsToDisplay = topProducts;
} else if(currentPage == 'products') {
    productsToDisplay = products;
} else {
    productsToDisplay = null;
}

let featuredProductsToDisplay = featuredProducts;

// Display products
export function displayProducts() {
    if (!products) {
        return;
    }
    if (!productsGrid) {
        return;
    }
    productsGrid.innerHTML = '';

    // Use cached products if available
    if (CACHED_PRODUCTS && CACHED_TOP_PRODUCTS && CACHED_FEATURED_PRODUCTS && !IS_FIRST_VISIT) {
        productsToDisplay = JSON.parse(CACHED_PRODUCTS);
        featuredProductsToDisplay = JSON.parse(CACHED_FEATURED_PRODUCTS);
    } else {
        // Cache the products for future visits
        localStorage.setItem('cachedProducts', JSON.stringify(products));
        localStorage.setItem('cachedTopProducts', JSON.stringify(topProducts));
        localStorage.setItem('cachedFeaturedProducts', JSON.stringify(featuredProducts));
        sessionStorage.setItem('visitedBefore', 'true');
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="flex content-between">
                            <div class="product-price">${product.price}</div>
                            <!-- WhatsApp Contact Button -->
                            <div class="whatsapp-contact btn-sm">
                                <a href="https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I'm interested in your ${product.name} (${product.price}). Could you provide more information?`)}" class="whatsapp-btn" target="_blank">
                                    <i class="fab fa-whatsapp"></i> Contact via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                `;

        productCard.addEventListener('click', () => openModal(product));
        productsGrid.appendChild(productCard);
    });
}

// Update slider position
function updateSlider() {
    if (!featuredSlider) {
        return;
    }
    featuredSlider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update active dot
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Initialize the slider
export function initSlider() {
    // Determine how many slides to show based on screen width
    if (window.innerWidth < 480) {
        slidesPerView = 1;
    } else if (window.innerWidth < 1024) {
        slidesPerView = 2;
    } else {
        slidesPerView = 2;
    }

    // Calculate total slides needed
    totalSlides = Math.ceil(featuredProductsToDisplay.length / slidesPerView);
    // Calculate slide width
    slideWidth = 100 / slidesPerView;

    // Clear existing slides
    if (!featuredSlider || !sliderDots) {
        return;
    }
    featuredSlider.innerHTML = '';
    sliderDots.innerHTML = '';

    // Create slides (group products into slides)
    for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.flex = `0 0 ${100 / slidesPerView}%`;

        // Add products to this slide
        let slideContent = '';
        const startIndex = i * slidesPerView;
        const endIndex = Math.min(startIndex + slidesPerView, featuredProductsToDisplay.length);

        for (let j = startIndex; j < endIndex; j++) {
            const product = featuredProductsToDisplay[j];
            slideContent += `
                        <div class="slide-item" data-product-id="${product.id}">
                            <img src="${product.image}" alt="${product.name}" class="slide-image">
                            <div class="slide-info">
                                <h3 class="slide-name">${product.name}</h3>
                                <div class="slide-price">${product.price}</div>
                            </div>
                        </div>
                    `;
        }

        slide.innerHTML = slideContent;
        featuredSlider.appendChild(slide);

        // Add event listeners to slide items
        slide.querySelectorAll('.slide-item').forEach(item => {
            const productId = item.getAttribute('data-product-id');
            const product = featuredProductsToDisplay.find(p => p.id == productId);
            item.addEventListener('click', () => openModal(product));
        });

        // Create dots
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        sliderDots.appendChild(dot);
    }

    updateSlider();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSlider();
}

// Next slide
export function nextSlide() {
    currentSlide++;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlider();
}

// Previous slide
export function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSlider();
}

if (sliderContainer) {
    // Detect touch start
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    // Detect touch end
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

// Handle swipe direction
function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance in px for swipe to count

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        nextSlide();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        prevSlide();
    }
}


// Open modal with product details
function openModal(product) {
    if (!modalTitle || !modalImage || !modalProductName || !modalDescription || !modalPrice || !modalSpecs) {
        return;
    }
    modalTitle.textContent = product.name;
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalProductName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.innerHTML = '<strong>Price: </strong>' + product.price;

    // Clear previous specs
    modalSpecs.innerHTML = '';

    // Add specs
    for (const [key, value] of Object.entries(product.specs)) {
        const specItem = document.createElement('div');
        specItem.classList.add('spec-item');
        specItem.innerHTML = `<strong>${key}:</strong> ${value}`;
        modalSpecs.appendChild(specItem);
    }

    modal.style.display = 'block';

    // Add WhatsApp functionality
    const whatsappBtn = document.getElementById('whatsappBtn');
    const message = `Hello, I'm interested in your ${product.name} (${product.price}). Could you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    whatsappBtn.href = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Event listeners for slider controls
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}