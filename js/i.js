import { customers } from '../data/Customers.js';
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