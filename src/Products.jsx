import { supabase } from "./CreateItem";
import { CgAddR } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);//used for fetching products from supabase
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);  // State for view modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal visibility
  const [editedProduct, setEditedProduct] = useState({}); // State for editable product fields

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data);
    }
  }

  const handleEdit = (product) => {
    setSelectedProduct(product); // Set the selected product
    setEditedProduct({ ...product }); // Initialize editable fields
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleAddNew = () => {
    setEditedProduct({
      product_name: "",
      description: "",
      image_url: "",
      price_0_5: 0,
      price_6_25: 0,
      price_26_50: 0,
      price_51_100: 0,
      price_100_above: 0,
    }); // Initialize empty fields for a new product
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleView = (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsViewModalOpen(true); // Open the view modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value })); // Update the edited product state
  };

  const handleSave = async () => {
    if (editedProduct.product_id) {
      // Update existing product
      const { error } = await supabase
        .from("products")
        .update(editedProduct)
        .eq("product_id", editedProduct.product_id);

      if (error) {
        console.error("Error updating product:", error);
      } else {
        fetchItems(); // Refresh the product list
        closeModal(); // Close the modal
      }
    } else {
      // Add new product
      const { error } = await supabase.from("products").insert({title : editedProduct.product_name, description: editedProduct.description, image_url: editedProduct.image_url, price_0_5: editedProduct.price_0_5, price_6_25: editedProduct.price_6_25, price_26_50: editedProduct.price_26_50, price_51_100: editedProduct.price_51_100, price_100_above: editedProduct.price_100_above});

      if (error) {
        console.error("Error adding product:", error);
      } else {
        fetchItems(); // Refresh the product list
        closeModal(); // Close the modal
      }
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting product with ID:", id);
    const { error } = await supabase.from("products").delete().eq("product_id", id);

    if (error) {
      console.error("Error deleting product:", error);
    } else {
      fetchItems();
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false); // Close the edit modal
    setIsViewModalOpen(false); // Close the view modal
    setSelectedProduct(null); // Clear the selected product
    setEditedProduct({}); // Clear the edited product state
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Products</h1>

      {/* Product Listing Section */}
      <h2 className="section-title">Product Listing</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price 0 to 5</th>
            <th>Price 6 to 25</th>
            <th>Price 25 to 50</th>
            <th>Price 51 to 100</th>
            <th>Price 100 and above</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td className="product-title">
                <img className="product-img" src={product.image_url} alt={product.product_name} />
                {product.product_name}
              </td>
              <td>{product.description}</td>
              <td>{formatCurrency(product.price_0_5)}</td>
              <td>{formatCurrency(product.price_6_25)}</td>
              <td>{formatCurrency(product.price_26_50)}</td>
              <td>{formatCurrency(product.price_51_100)}</td>
              <td>{formatCurrency(product.price_100_above)}</td>
              <td>
                <div className="action-icons">
                  <button onClick={() => handleEdit(product)} className="edit-btn">
                    ✏️
                  </button>
                  <button onClick={() => handleView(product)} className="view-btn">
                    👁️
                  </button>
                  <button onClick={() => handleDelete(product.product_id)} className="delete-btn">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="New-btn" onClick={handleAddNew}>
        Add New <CgAddR />
      </button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{editedProduct.product_id ? "Edit Product" : "Add New Product"}</h2>
            <div className="modal-content">
              <div className="modal-row">
                <label>Title:</label>
                <input
                  type="text"
                  name="product_name"
                  value={editedProduct.product_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={editedProduct.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image_url"
                  value={editedProduct.image_url || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <label>Price 0 to 5:</label>
                <input
                  type="number"
                  name="price_0_5"
                  value={editedProduct.price_0_5 || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <label>Price 6 to 25:</label>
                <input
                  type="number"
                  name="price_6_25"
                  value={editedProduct.price_6_25 || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <label>Price 25 to 50:</label>
                <input
                  type="number"
                  name="price_26_50"
                  value={editedProduct.price_26_50 || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <label>Price 51 to 100:</label>
                <input
                  type="number"
                  name="price_51_100"
                  value={editedProduct.price_51_100 || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <label>Price 100 and above:</label>
                <input
                  type="number"
                  name="price_100_above"
                  value={editedProduct.price_100_above || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>View Product</h2>
            <div className="modal-content">
              <div className="modal-row">
                <label>Title:</label>
                <p>{selectedProduct.product_name}</p>
              </div>
              <div className="modal-row">
                <label>Description:</label>
                <p>{selectedProduct.description}</p>
              </div>
              <div className="modal-row">
                <label>Price 0 to 5:</label>
                <p>{formatCurrency(selectedProduct.price_0_5)}</p>
              </div>
              <div className="modal-row">
                <label>Price 6 to 25:</label>
                <p>{formatCurrency(selectedProduct.price_6_25)}</p>
              </div>
              <div className="modal-row">
                <label>Price 25 to 50:</label>
                <p>{formatCurrency(selectedProduct.price_26_50)}</p>
              </div>
              <div className="modal-row">
                <label>Price 51 to 100:</label>
                <p>{formatCurrency(selectedProduct.price_51_100)}</p>
              </div>
              <div className="modal-row">
                <label>Price 100 and above:</label>
                <p>{formatCurrency(selectedProduct.price_100_above)}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;