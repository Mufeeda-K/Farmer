// Validate product object
export const validateProduct = (product) => {
    const { name, description, price } = product;
    
    if (!name || name.trim() === '') {
      return { valid: false, error: 'Product name is required' };
    }
  
    if (!description || description.trim() === '') {
      return { valid: false, error: 'Product description is required' };
    }
  
    if (!price || isNaN(price) || price <= 0) {
      return { valid: false, error: 'Invalid price' };
    }
  
    return { valid: true };
  };
  
  // Format price
  export const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };
  
  // Sort products
  export const sortProducts = (products, criteria = 'price') => {
    return [...products].sort((a, b) => a[criteria] - b[criteria]);
  };
  
  // Filter products
  export const filterProducts = (products, filter) => {
    return products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  