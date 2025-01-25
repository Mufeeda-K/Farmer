import React, { useState } from 'react';
import { addProduct } from '../config/firebase';
import ReactMarkdown from 'react-markdown';

const AddProductModal = ({ isOpen, onClose }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    farmer: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...productData,
        price: parseFloat(productData.price),
        createdAt: new Date()
      });
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Short Description"
            value={productData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
          <input
            type="text"
            name="farmer"
            placeholder="Farmer Name"
            value={productData.farmer}
            onChange={handleChange}
            required
          />
          <textarea
            name="details"
            placeholder="Detailed Product Description (Markdown supported)"
            value={productData.details}
            onChange={handleChange}
            rows="4"
          />
          <div>
            <h3>Preview:</h3>
            <ReactMarkdown>{productData.details || '*No details provided*'}</ReactMarkdown>
          </div>
          <div className="modal-actions">
            <button type="submit">Add Product</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;