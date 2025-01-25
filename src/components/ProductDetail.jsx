import React from 'react';
import ReactMarkdown from 'react-markdown';

const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-detail-modal">
      <div className="product-detail-content">
        <h2>{product.name}</h2>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Farmer:</strong> {product.farmer}</p>
        
        <div className="product-details">
          <h3>Product Details</h3>
          <ReactMarkdown>{product.details || '*No additional details*'}</ReactMarkdown>
        </div>

        <div className="product-actions">
          <button onClick={() => alert('Contact feature coming soon!')}>Contact Farmer</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;