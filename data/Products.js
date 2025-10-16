import { getMin, getMax } from "./utils.js";

let products = [];
let featuredProducts = [];
let topProducts = [];
let productCategories = [];
let productPricesRangeMin, productPricesRangeMax;

async function initProducts() {
  const res = await fetch("https://ercp-gastro.vercel.app/products");
  products = await res.json();

  featuredProducts = products.filter(p => p.featured);
  topProducts = products.filter(p => p.rating >= 4.5);
  productCategories = [...new Set(products.map(p => p.category))];
  const productPrices = products.map(p => p.price);
  productPricesRangeMin = getMin(productPrices);
  productPricesRangeMax = getMax(productPrices);
}

await initProducts(); // Top-level await if supported
export { products, featuredProducts, topProducts, productCategories, productPricesRangeMin, productPricesRangeMax };
