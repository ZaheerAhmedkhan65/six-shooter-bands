import { customers } from '../data/Customers.js';
import { products } from '../data/Products.js';
import { COMPANY_WHATSAPP_NUMBER } from '../data/constants.js';
import { openModal } from './index.js';

 const gradients = [
  "linear-gradient(45deg, rgba(0, 123, 255, 0.95), rgba(0, 210, 255, 0.90))",  // medical blue
  "linear-gradient(135deg, rgba(0, 200, 150, 0.95), rgba(100, 255, 218, 0.90))", // teal & aqua
  "linear-gradient(225deg, rgba(72, 201, 176, 0.95), rgba(29, 131, 72, 0.90))",  // green healing
  "linear-gradient(315deg, rgba(144, 224, 239, 0.95), rgba(0, 180, 216, 0.90))", // light cyan
  "linear-gradient(45deg, rgba(155, 89, 182, 0.95), rgba(255, 159, 243, 0.90))", // soft medical purple
  "linear-gradient(135deg, rgba(0, 105, 92, 0.95), rgba(38, 166, 154, 0.90))",   // deep teal
  "linear-gradient(225deg, rgba(52, 152, 219, 0.95), rgba(174, 214, 241, 0.90))",// trust blue
  "linear-gradient(315deg, rgba(236, 240, 241, 0.95), rgba(189, 195, 199, 0.90))" // clean sterile white-gray
];


const customersTrack = document.getElementById('customersTrack');
// Function to display customers with infinite scroll effect
function displayCustomers() {
    if (!customers || !customersTrack) return;

    // Clear the track
    customersTrack.innerHTML = '';

    // We'll duplicate the customers to create a seamless infinite effect
    const duplicatedCustomers = [...customers, ...customers, ...customers];

    // Create customer cards
    duplicatedCustomers.forEach(customer => {
        const customerCard = document.createElement('div');
        customerCard.classList.add('customer-card');
        customerCard.innerHTML = `
                    <img src="${customer.image}" alt="${customer.brand_name}" class="customer-image">
                `;
        customersTrack.appendChild(customerCard);
    });
}

// Initialize the customer display
displayCustomers();


const overviewGrid = document.getElementById('overviewGrid');
const overviewItems = [
    { title: "Products", count: "1200+", icon: "fas fa-box" },
    { title: "Customers", count: "8000+", icon: "fas fa-users" },
    { title: "Orders", count: "2000+", icon: "fas fa-shopping-cart" },
    { title: "Sales", count: "3000000+", icon: "fas fa-chart-line" }
];

displayOverviewItems();

// Function to display overview items
function displayOverviewItems() {
    if (!overviewItems || !overviewGrid) return;

    overviewGrid.innerHTML = '';

    overviewItems.forEach(item => {
        const overviewItem = document.createElement('div');
        overviewItem.classList.add('overview-item');
        overviewItem.innerHTML = `
                    <i class="${item.icon}"></i>
                    <h3>${item.title}</h3>
                    <p class="count">${item.count}</p>
                `;
        overviewGrid.appendChild(overviewItem);
    });
}

 const specialProducts = document.getElementById('specialProducts');
    const indicatorsContainer = document.getElementById('indicators');
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let isAnimating = false;

    // Generate product cards with random translations
    products.forEach((product, index) => {
        // Create product card
        const card = document.createElement('div');
        card.className = 'special-product-card';
        card.style.background = genRandomGradientBg();
        card.dataset.index = index;

        // Random translation for stacked effect
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        const randomRotate = (Math.random() - 0.5) * 10;

        card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        card.style.zIndex = products.length - index;

        // Product info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'special-product-info';

        const title = document.createElement('h3');
        title.className = 'special-product-title';
        title.textContent = product.name;

        const description = document.createElement('p');
        description.className = 'special-product-description';
        description.textContent = product.description;

        const priceDiv = document.createElement('div');
        priceDiv.className = 'special-product-price';
        priceDiv.innerHTML = `
                    <span>${product.price}</span>
                `;
        
        const actionButtonsWrapper = document.createElement('div');
        actionButtonsWrapper.className = 'action-buttons-wrapper';

        const buyBtn = document.createElement('div');
        buyBtn.className = 'whatsapp-contact btn-sm special-product-buy-btn';
        buyBtn.innerHTML = `
            <a href="https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I'm interested in your ${product.name} (${product.price}). Could you provide more information?`)}" class="whatsapp-btn" target="_blank">
                <i class="fab fa-whatsapp"></i> Buy Now
            </a>
        `;

        const detailsBtn = document.createElement('div');
        detailsBtn.className = 'special-product-details-btn';
        detailsBtn.innerHTML = `<i class="fas fa-info-circle"></i> Details`;

        detailsBtn.addEventListener('click', () => {
            openModal(product);
        });

        infoDiv.appendChild(title);
        infoDiv.appendChild(description);
        infoDiv.appendChild(priceDiv);
        actionButtonsWrapper.appendChild(buyBtn);
        actionButtonsWrapper.appendChild(detailsBtn);
        infoDiv.appendChild(actionButtonsWrapper);


        // Product image
        const imageDiv = document.createElement('div');
        imageDiv.className = 'special-product-image';
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        imageDiv.appendChild(img);

        card.appendChild(infoDiv);
        card.appendChild(imageDiv);

        specialProducts.appendChild(card);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'special-products-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => {
            goToProduct(index);
        });
        indicatorsContainer.appendChild(indicator);
    });

    const productCards = document.querySelectorAll('.special-product-card');
    const indicators = document.querySelectorAll('.special-products-indicator');

    // Function to get the current top card
    function getTopCard() {
        return document.querySelector('.special-product-card[style*="z-index: ' + products.length + '"]');
    }

    // Touch events for mobile
    specialProducts.addEventListener('touchstart', handleTouchStart, { passive: true });
    specialProducts.addEventListener('touchmove', handleTouchMove, { passive: true });
    specialProducts.addEventListener('touchend', handleTouchEnd);

    // Mouse events for desktop
    specialProducts.addEventListener('mousedown', handleMouseDown);
    specialProducts.addEventListener('mousemove', handleMouseMove);
    specialProducts.addEventListener('mouseup', handleMouseUp);
    specialProducts.addEventListener('mouseleave', handleMouseUp);

    function handleTouchStart(e) {
        if (isAnimating) return;
        const topCard = getTopCard();
        if (!topCard) return;

        startX = e.touches[0].clientX;
        isDragging = true;
        topCard.style.transition = 'none';
    }

    function handleTouchMove(e) {
        if (!isDragging || isAnimating) return;
        const topCard = getTopCard();
        if (!topCard) return;

        currentX = e.touches[0].clientX;
        currentTranslate = currentX - startX;

        // Move the top card with the swipe
        topCard.style.transform = `translateX(${currentTranslate}px) rotate(${currentTranslate * 0.03}deg)`;
    }

    function handleTouchEnd() {
        if (!isDragging || isAnimating) return;
        const topCard = getTopCard();
        if (!topCard) return;

        isDragging = false;
        topCard.style.transition = 'transform 0.5s ease';

        const diffX = currentX - startX;

        if (Math.abs(diffX) > 50) {
            isAnimating = true;

            if (diffX > 0) {
                // Swipe right
                // topCard.classList.add('swipe-right');
                setTimeout(() => {
                    // topCard.classList.remove('swipe-right');
                    showPreviousProduct();
                    isAnimating = false;
                }, 500);
            } else {
                // Swipe left
                // topCard.classList.add('swipe-left');
                setTimeout(() => {
                    // topCard.classList.remove('swipe-left');
                    showNextProduct();
                    isAnimating = false;
                }, 500);
            }
        } else {
            // Not enough swipe - return to position
            topCard.style.transform = 'translate(0, 0) rotate(0)';
        }
    }

    function handleMouseDown(e) {
        if (isAnimating) return;
        const topCard = getTopCard();
        if (!topCard) return;

        startX = e.clientX;
        isDragging = true;
        specialProducts.style.cursor = 'grabbing';
        topCard.style.transition = 'none';
    }

    function handleMouseMove(e) {
        if (!isDragging || isAnimating) return;
        const topCard = getTopCard();
        if (!topCard) return;

        currentX = e.clientX;
        currentTranslate = currentX - startX;

        // Move the top card with the drag
        topCard.style.transform = `translateX(${currentTranslate}px) rotate(${currentTranslate * 0.03}deg)`;
    }

    function handleMouseUp() {
        if (!isDragging || isAnimating) return;
        const topCard = getTopCard();
        if (!topCard) return;

        isDragging = false;
        specialProducts.style.cursor = 'grab';
        topCard.style.transition = 'transform 0.5s ease';

        const diffX = currentX - startX;

        if (Math.abs(diffX) > 50) {
            isAnimating = true;

            if (diffX > 0) {
                // Swipe right
                topCard.classList.add('swipe-right');
                setTimeout(() => {
                    topCard.classList.remove('swipe-right');
                    showPreviousProduct();
                    isAnimating = false;
                }, 500);
            } else {
                // Swipe left
                topCard.classList.add('swipe-left');
                setTimeout(() => {
                    topCard.classList.remove('swipe-left');
                    showNextProduct();
                    isAnimating = false;
                }, 500);
            }
        } else {
            // Not enough drag - return to position
            topCard.style.transform = 'translate(0, 0) rotate(0)';
        }
    }

    function showNextProduct() {
        currentIndex = (currentIndex + 1) % products.length;
        updateProductDisplay();
    }

    function showPreviousProduct() {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        updateProductDisplay();
    }

    function goToProduct(index) {
        if (isAnimating) return;
        currentIndex = index;
        updateProductDisplay();
    }

    function updateProductDisplay() {
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Update product cards
        productCards.forEach((card, index) => {
            const cardIndex = parseInt(card.dataset.index);

            // Calculate position in the stack
            let position = (cardIndex - currentIndex + products.length) % products.length;

            if (position < 0) position += products.length;

            if (position === 0) {
                // Current product - front and center
                card.style.transform = 'translate(0, 0) rotate(0)';
                card.style.opacity = '1';
                card.style.zIndex = products.length;
                card.style.pointerEvents = 'auto';
            } else if (position === 1) {
                // Next product - slightly offset
                card.style.transform = 'translate(40px, -20px) rotate(-5deg)';
                card.style.opacity = '0.9';
                card.style.zIndex = products.length - 1;
                card.style.pointerEvents = 'none';
            } else if (position === products.length - 1) {
                // Previous product - slightly offset
                card.style.transform = 'translate(-40px, -20px) rotate(5deg)';
                card.style.opacity = '0.9';
                card.style.zIndex = products.length - 1;
                card.style.pointerEvents = 'none';
            } else {
                // Other products - further back with more offset
                const randomX = (Math.random() - 0.5) * 60;
                const randomY = (Math.random() - 0.5) * 60;
                const randomRotate = (Math.random() - 0.5) * 15;

                card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
                card.style.opacity = '0.6';
                card.style.zIndex = products.length - position;
                card.style.pointerEvents = 'none';
            }
        });
    }

    // Initialize display
    updateProductDisplay();

   
    function genRandomGradientBg() {
        const randomIndex = Math.floor(Math.random() * gradients.length);
        return gradients[randomIndex];
    }