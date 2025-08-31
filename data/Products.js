import { getMin, getMax } from "./utils.js";

// Sample product data
export const products = [
    {
        id: 1,
        name: "Six Shooter Band",
        category: "Diagnostic",
        price: "RS.499",
        image: "../resources/products/img/six-shooter-band.jpeg",
        description: "High-quality six shooter band for endoscopic and surgical use.",
        specs: {
            "Type": "Plastic",
            "Size": "3.5 cm",
            "Weight": "100g",
            "Warranty": "1 year"
        },
        featured: true,
        ratting: 4.9
    },
    {
        id: 2,
        name: "Portable Oxygen Concentrator",
        category: "Therapeutic",
        price: "RS.18,999",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Lightweight and portable oxygen concentrator with pulse dose delivery for active patients requiring oxygen therapy.",
        specs: {
            "Oxygen Output": "1-5 L/min",
            "Battery Life": "Up to 6 hours",
            "Weight": "2.3 kg",
            "Dimensions": "23x13x18 cm",
            "Warranty": "3 years"
        },
        featured: true,
        ratting: 3
    },
    {
        id: 3,
        name: "Digital Thermometer",
        category: "Diagnostic",
        price: "RS.449",
        image: "https://images.unsplash.com/photo-1584553059265-527d0f218ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Fast and accurate digital thermometer with backlit display and fever alert feature.",
        specs: {
            "Measurement Time": "10 seconds",
            "Memory": "10 readings",
            "Waterproof": "Yes",
            "Battery": "CR2032",
            "Warranty": "1 year"
        },
        featured: false,
        ratting: 4.4
    },
    {
        id: 4,
        name: "Blood Pressure Monitor",
        category: "Diagnostic",
        price: "RS.1,299",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Automatic upper arm blood pressure monitor with irregular heartbeat detection and two-user memory.",
        specs: {
            "Cuff Size": "22-42 cm",
            "Memory": "2x120 readings",
            "Power": "4xAA batteries",
            "Weight": "700g",
            "Warranty": "5 years"
        },
        featured: true,
        ratting: 4.7
    },
    {
        id: 5,
        name: "Nebulizer Machine",
        category: "Therapeutic",
        price: "RS.3,999",
        image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Compact compressor nebulizer for efficient asthma treatment and respiratory therapy.",
        specs: {
            "Particle Size": "0.5-5 μm",
            "Noise Level": "<50 dB",
            "Flow Rate": "0.5-0.7 mL/min",
            "Weight": "1.2 kg",
            "Warranty": "3 years"
        },
        featured: true,
        ratting: 4.5
    },
    {
        id: 6,
        name: "Medical Ventilator",
        category: "Life Support",
        price: "RS.12,499",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Advanced critical care ventilator with multiple ventilation modes for ICU and emergency use.",
        specs: {
            "Modes": "10+ including AC, SIMV, CPAP",
            "O2 Concentration": "21-100%",
            "Battery Backup": "8 hours",
            "Dimensions": "45x35x25 cm",
            "Warranty": "2 years"
        },
        featured: true,
        ratting: 4.1
    },
    {
        id: 7,
        name: "Pulse Oximeter",
        category: "Diagnostic",
        price: "RS.999",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Accurate and portable pulse oximeter for monitoring blood oxygen levels.",
        specs: {
            "Measurement Time": "2 seconds",
            "Memory": "10 readings",
            "Waterproof": "Yes",
            "Battery": "CR2032",
            "Warranty": "1 year"
        },
        featured: true,
        ratting: 4.7
    },
    {
        id: 8,
        name: "Thermometer",
        category: "Diagnostic",
        price: "RS.299",
        image: "https://images.unsplash.com/photo-1584553059265-527d0f218ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Accurate and lightweight thermometer for monitoring body temperature.",
        specs: {
            "Measurement Time": "10 seconds",
            "Memory": "10 readings",
            "Waterproof": "Yes",
            "Battery": "CR2032",
            "Warranty": "1 year"
        },
        featured: true,
        ratting: 4.8
    },
    {
        id: 9,
        name: "Digital Stethoscope",
        category: "Diagnostic",
        price: "RS.2,499",
        image: "https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Advanced digital stethoscope with noise reduction technology and Bluetooth connectivity for clear auscultation and recording.",
        specs: {
            "Type": "Electronic",
            "Battery Life": "24 hours",
            "Connectivity": "Bluetooth 5.0",
            "Weight": "180g",
            "Warranty": "2 years"
        },
        featured: true,
        ratting: 4.9
    }

];

export const featuredProducts = products.filter(product => product.featured);
export const topProducts = products.filter(product => product.ratting >= 4.5);
const allProducts = [...products];
const productCategories = [...new Set(products.map(product => product.category))];
const productPrices = [...new Set(products.map(product => product.price))];
const productPricesRangeMin = getMin(productPrices);
const productPricesRangeMax = getMax(productPrices);
// console.log("    productPricesRangeMin: ", productPricesRangeMin);
// console.log("    productPricesRangeMax: ", productPricesRangeMax);
// console.log("    productCategories: ", productCategories);
// console.log("    allProducts: ", allProducts);
// console.log("    topProducts: ", topProducts);
// console.log("    productPrices: ", productPrices);

