import React, { useState, useEffect } from 'react';
import { getProducts } from '../config/firebase';
import AddProductModal from './AddProductModel';
import ProductDetail from './ProductDetail';

function ProductListing({ user }) {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [isAddModalOpen]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const isAdmin = user?.email === 'admin@admin.com';

  return (
    <div className="container">
      <div className="header">
        <h2>Farm Fresh Products</h2>
        {isAdmin && (
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
            <p>Farmer: {product.farmer}</p>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
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