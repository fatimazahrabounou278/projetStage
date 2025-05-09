import React, { useEffect, useState } from 'react';
import { FaBox, FaChartLine, FaClipboardCheck, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [salesStats, setSalesStats] = useState({ totalSales: 0, totalRevenue: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await fetch('http://localhost:5000/api/products');
        const productsData = await resProducts.json();

        setProducts(productsData);

        // You can modify the salesStats if you have any sales-related data to calculate
        const totalSales = 0;  // Update accordingly if needed
        const totalRevenue = 0;  // Update accordingly if needed
        setSalesStats({ totalSales, totalRevenue });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(prev => prev.filter(p => p._id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const editProduct = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  const addProduct = () => {
    navigate('/admin/add-product');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-cards">
        <div className="card">
          <div className="card-content">
            <FaBox className="icon" />
            <div className="text">
              <h2>Products in Stock</h2>
              <p>{products.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <FaClipboardCheck className="icon" />
            <div className="text">
              <h2>Total Sales</h2>
              <p>{salesStats.totalSales}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <FaChartLine className="icon" />
            <div className="text">
              <h2>Total Revenue</h2>
              <p>{salesStats.totalRevenue.toFixed(2)}Dh</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={addProduct} className="add-product-button">
        <FaPlus className="icon" /> Add Product
      </button>
      <h2 className="products-title">Liste des Produits</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.imageUrl}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>
                <button
                  onClick={() => editProduct(p._id)}
                  className="edit-button"
                >
                  Éditer
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .dashboard-container {
          padding: 20px;
        }

        .dashboard-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 30px;
        }

        .add-product-button {
          background-color: #2ecc71;
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stats-cards {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
        }

        .card {
          width: 30%;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
          display: flex;
          align-items: center;
        }

        .card-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .icon {
          font-size: 3rem;
          color: #3498db;
        }

        .text {
          font-size: 1.2rem;
        }

        .products-title {
          font-size: 2rem;
          font-weight: bold;
          margin: 40px 0 20px;
        }

        .product-table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .product-table th, .product-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
          text-align: left;
        }

        .product-table th {
          background-color: #f5f5f5;
        }

        .edit-button, .delete-button {
          padding: 6px 12px;
          margin-right: 10px;
          font-size: 0.9rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-button {
          background-color: #3498db;
          color: white;
        }

        .delete-button {
          background-color: #e74c3c;
          color: white;
        }

        .edit-button:hover {
          background-color: #2980b9;
        }

        .delete-button:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
