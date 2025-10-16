import { initSlider, displayProducts, nextSlide  } from './index.js';
import { COMPANY_WHATSAPP_NUMBER, IS_FIRST_VISIT, CACHED_PRODUCTS } from '../data/constants.js';

// Simulate page loading
window.addEventListener('load', () => {
    if (IS_FIRST_VISIT || !CACHED_PRODUCTS) {
        // Show preloader on first visit or if no cached data
        setTimeout(() => {
            preloader.classList.add('hidden');
            initSlider();
            displayProducts();
            // Auto slide every 5 seconds
            setInterval(nextSlide, 5000);
        }, randomTimer(1000, 3000));
    } else {
        // Hide preloader immediately and display cached products
        preloader.classList.add('hidden');
        initSlider();
        displayProducts();
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
});

// Update slider on window resize
window.addEventListener('resize', initSlider);


function randomTimer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const yearOfCopyRight = document.getElementById('yearOfCopyRight');
const creationYear = 2021;
const currentYear = new Date().getFullYear();
yearOfCopyRight.textContent = `${creationYear} - ${currentYear}`;

const contactButtons = document.querySelectorAll('.contactButton');
const contactModal = document.getElementById('contactModal');
const whatsappButton = document.getElementById('whatsappButton');
const emailFormButton = document.getElementById('emailFormButton');
const emailForm = document.getElementById('emailForm');
const messageForm = document.getElementById('messageForm');
const closeContactBtn = document.querySelector('#closeContactModal');

// Initially hide the email form
emailForm.style.display = 'none';

// Open modal
contactButtons.forEach(button => {
    button.addEventListener('click', () => {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Disable scrolling
    });
})

// Close modal
closeContactBtn.addEventListener('click', () => {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
});

// Setup WhatsApp button
const whatsappMessage = "Hello, I'm interested in your medical products. Could you provide more information?";
const encodedMessage = encodeURIComponent(whatsappMessage);
whatsappButton.href = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodedMessage}`;

// Toggle email form
emailFormButton.addEventListener('click', () => {
    if (emailForm.style.display === 'none') {
        emailForm.style.display = 'block';
        emailFormButton.innerHTML = '<i class="fas fa-times"></i> Close Form';
    } else {
        emailForm.style.display = 'none';
        emailFormButton.innerHTML = '<i class="fas fa-envelope"></i> Email Form';
    }
});

// Handle form submission
// Handle form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
        console.log(name, email, message);
    // Formspree integration
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    // Replace with your Formspree form ID
    fetch(messageForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert(`Thank you, ${name}! Your message has been received. We will contact you at ${email} soon.`);
                messageForm.reset();
                emailForm.style.display = 'none';
                emailFormButton.innerHTML = '<i class="fas fa-envelope"></i> Email Form';
            } else {
                return response.json().then(data => {
                    if (data.errors) {
                        alert('Error: ' + data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form. Please try again.');
                    }
                });
            }
        })
        .catch(error => {
            alert('Oops! There was a problem submitting your form. Please try again.');
        });
});
