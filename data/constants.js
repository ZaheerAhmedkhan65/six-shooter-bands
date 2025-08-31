export const COMPANY_Email = "Wl4o4@example.com";
export const COMPANY_WHATSAPP_NUMBER = "+923032414234"; // Replace with your actual phone number
export const COMPANY_PHONE_NUMBER = "+923032414234";
export const COMPANY_ADDRESS = "Shop no. 1, asad center, munir chowk, Gujranwala, Punjab, Pakistan";
export const COMPANY_NAME = "MediCare";

// Check if products are cached and if this is the first visit in this session
export const IS_FIRST_VISIT = !sessionStorage.getItem('visitedBefore');
export const CACHED_PRODUCTS = localStorage.getItem('cachedProducts');
export const CACHED_FEATURED_PRODUCTS = localStorage.getItem('cachedFeaturedProducts');
export const CACHED_TOP_PRODUCTS = localStorage.getItem('cachedTopProducts');

export const GRADIENTS = [
  "linear-gradient(45deg, rgba(0, 123, 255, 0.95), rgba(0, 210, 255, 0.90))",  // medical blue
  "linear-gradient(135deg, rgba(0, 200, 150, 0.95), rgba(100, 255, 218, 0.90))", // teal & aqua
  "linear-gradient(225deg, rgba(72, 201, 176, 0.95), rgba(29, 131, 72, 0.90))",  // green healing
  "linear-gradient(315deg, rgba(144, 224, 239, 0.95), rgba(0, 180, 216, 0.90))", // light cyan
  "linear-gradient(45deg, rgba(155, 89, 182, 0.95), rgba(255, 159, 243, 0.90))", // soft medical purple
  "linear-gradient(135deg, rgba(0, 105, 92, 0.95), rgba(38, 166, 154, 0.90))",   // deep teal
  "linear-gradient(225deg, rgba(52, 152, 219, 0.95), rgba(174, 214, 241, 0.90))",// trust blue
  "linear-gradient(315deg, rgba(236, 240, 241, 0.95), rgba(189, 195, 199, 0.90))" // clean sterile white-gray
];

export const OVER_VIEW_DATA = [
    { title: "Products", count: "1200+", icon: "fas fa-box" },
    { title: "Customers", count: "8000+", icon: "fas fa-users" },
    { title: "Orders", count: "2000+", icon: "fas fa-shopping-cart" },
    { title: "Sales", count: "3000000+", icon: "fas fa-chart-line" }
];