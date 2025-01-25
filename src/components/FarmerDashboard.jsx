import React, { useState, useEffect } from 'react';
import { getProducts, addProduct } from '../config/firebase';
import ReactMarkdown from 'react-markdown';

function ProductListing({ user }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    farmer: user?.email || '',
    details: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        createdAt: new Date()
      };
      
      await addProduct(productToAdd);
      fetchProducts();
      setIsAddProductModalOpen(false);
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        price: '',
        farmer: user?.email || '',
        details: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const isAdmin = user?.email === 'admin@admin.com';

  return (
    <div className="container">
      <div className="header">
        <h2>Farm Fresh Products</h2>
        {isAdmin && (
          <button 
            onClick={() => setIsAddProductModalOpen(true)}
            className="add-product-btn"
          >
            + Add Product
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid-container">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Farmer: {product.farmer}</p>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Short Description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
              <input
                type="text"
                name="farmer"
                placeholder="Farmer Name"
                value={newProduct.farmer}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="details"
                placeholder="Detailed Product Description (Markdown supported)"
                value={newProduct.details}
                onChange={handleInputChange}
                rows="4"
              />
              
              {/* Markdown Preview */}
              <div className="markdown-preview">
                <h3>Preview:</h3>
                <ReactMarkdown>{newProduct.details || '*No details provided*'}</ReactMarkdown>
              </div>

              <div className="modal-actions">
                <button type="submit">Add Product</button>
                <button 
                  type="button" 
                  onClick={() => setIsAddProductModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedProduct.name}</h2>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
            <p><strong>Farmer:</strong> {selectedProduct.farmer}</p>
            
            <div className="product-details">
              <h3>Product Details</h3>
              <ReactMarkdown>
                {selectedProduct.details || '*No additional details*'}
              </ReactMarkdown>
            </div>

            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListing;