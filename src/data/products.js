import productsData from './products.json';

// Export products from the JSON file
export const products = productsData;

// Helper to get product by ID (optional, but good for consistency)
export const getProductById = (id) => {
    return products.find(p => p.id === id);
};
