// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalProductName = document.getElementById('modalProductName');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalSpecs = document.getElementById('modalSpecs');
const preloader = document.getElementById('preloader');

// Display products
function displayProducts() {
    if(!products) {
        return;
    }
    if(!productsGrid) {
        return;
    }
    productsGrid.innerHTML = '';

    let productsToDisplay = products;
            
    // Use cached products if available
    if (cachedProducts && !isFirstVisit) {
        productsToDisplay = JSON.parse(cachedProducts);
    } else {
        // Cache the products for future visits
        localStorage.setItem('cachedProducts', JSON.stringify(products));
        sessionStorage.setItem('visitedBefore', 'true');
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">${product.price}</div>
                    </div>
                `;

        productCard.addEventListener('click', () => openModal(product));
        productsGrid.appendChild(productCard);
    });
}

// Open modal with product details
function openModal(product) {
    if(!modalTitle || !modalImage || !modalProductName || !modalDescription || !modalCategory || !modalPrice || !modalSpecs) {
        return;
    }
    modalTitle.textContent = product.name;
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalProductName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalCategory.innerHTML = '<strong>Category: </strong>' + product.category;
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
    const phoneNumber = "+923080944425"; // Replace with your actual phone number
    const message = `Hello, I'm interested in your ${product.name} (${product.price}). Could you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
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