import React, { useState, useEffect } from 'react';
import { getProducts } from '../config/firebase';
import AddProductModal from './AddProductModel';
import ProductDetail from './ProductDetail';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userToken = localStorage.getItem('userToken');
      setIsLoggedIn(!!userToken);
    };

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    checkLoginStatus();
    fetchProducts();
  }, [isAddModalOpen]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Farm Fresh Products</h2>
        {isLoggedIn && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="add-product-btn"
          >
            + Add Product
          </button>
        )}
      </div>

      <div className="grid-container">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="card"
            onClick={() => handleProductClick(product)}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            {isLoggedIn && <p>Farmer: {product.farmer}</p>}
          </div>
        ))}
      </div>

      {isLoggedIn && isAddModalOpen && (
        <AddProductModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}

export default ProductListing;