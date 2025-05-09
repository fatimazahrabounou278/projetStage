import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

const CategorieFresh = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProductsByCategory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      const filtered = res.data.filter(
        (p) => p.category?.toLowerCase() === 'fresh'
      );
      setProducts(filtered);
    } catch (error) {
      console.error('Erreur lors du chargement des produits Fresh:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        <h1 style={styles.title}>Fresh Collection</h1>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div style={styles.productList}>
            {products.map((product) => (
              <div key={product._id} style={styles.productCard}>
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  style={styles.productImage}
                />
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productDescription}>{product.description}</p>
                <p style={styles.productPrice}>${product.price}</p>

                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  style={styles.productButton}
                >
                  View Details
                </button>

                <button
                  onClick={() => {
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    localStorage.setItem('cart', JSON.stringify([...cart, product]));
                    alert(`${product.name} added to cart!`);
                  }}
                  style={styles.cartButton}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} BeldiSoap. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: '"Roboto", sans-serif',
    backgroundColor: '#f9f5f0',
    color: '#4E342E',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    padding: '60px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    marginBottom: '40px',
    fontWeight: '700',
  },
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '30px',
    padding: '0 20px',
  },
  productCard: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  productName: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '10px 0 5px',
  },
  productDescription: {
    fontSize: '14px',
    color: '#6D4C41',
    marginBottom: '10px',
  },
  productPrice: {
    fontSize: '16px',
    color: '#008060',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productButton: {
    display: 'inline-block',
    margin: '10px 5px 5px',
    padding: '8px 12px',
    backgroundColor: '#A05C3B',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
  },
  cartButton: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  footer: {
    backgroundColor: '#A05C3B',
    padding: '20px',
    textAlign: 'center',
    color: '#fff',
    fontSize: '14px',
  },
};

export default CategorieFresh;
