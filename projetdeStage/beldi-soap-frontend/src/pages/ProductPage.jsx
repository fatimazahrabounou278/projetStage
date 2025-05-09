import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State pour gérer les erreurs
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message); // Enregistrez l'erreur dans le state
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fonction pour ajouter au panier sans duplicata
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find((item) => item._id === product._id); // Vérifie si le produit est déjà dans le panier
    if (!existingProduct) {
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
      alert(`${product.name} ajouté au panier !`);
    } else {
      alert(`${product.name} est déjà dans votre panier.`);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      {/* Contenu principal */}
      <main style={styles.main}>
        <h1 style={styles.title}>Our Products</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={styles.error}>Erreur : {error}</p> // Affichage de l'erreur
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
                <p style={styles.productPrice}>{product.price}dh</p>
                <button
  onClick={() => window.location.href = 'https://beldi-soap.com/'}
  style={styles.productButton}
>
  View Details
</button>


                <button
                  onClick={() => addToCart(product)} // Utilisation de la fonction d'ajout au panier
                  style={styles.cartButton}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
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
  
  logo: {
    fontSize: '28px',
    color: '#fff',
    fontWeight: '700',
    letterSpacing: '2px',
    margin: 0,
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
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
  error: {
    color: 'red',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default ProductPage;
