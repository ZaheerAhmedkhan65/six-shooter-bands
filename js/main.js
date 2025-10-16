import {  COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE_NUMBER, COMPANY_Email } from '../data/constants.js';
const address = document.getElementById('address');
const companyEmail = document.getElementById('companyEmail');
const phoneNumber = document.getElementById('phoneNumber');
const companyName = document.querySelectorAll('.company-name');


// Populate contact information
address.textContent = COMPANY_ADDRESS;
companyEmail.textContent = COMPANY_Email;
phoneNumber.textContent = COMPANY_PHONE_NUMBER;
companyName.forEach(name => name.textContent = COMPANY_NAME);


const mobileToggle = document.getElementById('mobileToggle');
const closeOffcanvas = document.getElementById('closeOffcanvas');
const offcanvas = document.getElementById('offcanvas');
const overlay = document.getElementById('overlay');
const contactButton = document.getElementById('contactButton');
const mobileContactButton = document.getElementById('mobileContactButton');

// Open offcanvas menu
mobileToggle.addEventListener('click', () => {
    offcanvas.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close offcanvas menu
function closeMenu() {
    offcanvas.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Event listeners for closing
closeOffcanvas.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

mobileContactButton.addEventListener('click', () => {
    closeMenu();
});

// Close menu when clicking on navigation links
const navLinks = document.querySelectorAll('.offcanvas-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Optional: Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});