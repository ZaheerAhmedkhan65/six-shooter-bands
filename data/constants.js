export const COMPANY_Email = "Wl4o4@example.com";
export const COMPANY_WHATSAPP_NUMBER = "+923080944425"; // Replace with your actual phone number
export const COMPANY_PHONE_NUMBER = "+923080944425";
export const COMPANY_ADDRESS = "Shop no. 1, asad center, munir chowk, Gujranwala, Punjab, Pakistan";
export const COMPANY_NAME = "MediCare";

// Check if products are cached and if this is the first visit in this session
export const IS_FIRST_VISIT = !sessionStorage.getItem('visitedBefore');
export const CACHED_PRODUCTS = localStorage.getItem('cachedProducts');
export const CACHED_FEATURED_PRODUCTS = localStorage.getItem('cachedFeaturedProducts');
export const CACHED_TOP_PRODUCTS = localStorage.getItem('cachedTopProducts');