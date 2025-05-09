import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Heart icons from react-icons

const FavoritePage = () => {
  // Sample products with favorite status
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Beldi Soap - Rose', price: 15.99, isFavorite: true },
    { id: 2, name: 'Beldi Soap - Lavender', price: 14.99, isFavorite: false },
  ]);

  const toggleFavorite = (id) => {
    setFavorites(favorites.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2 style={styles.logo}>BeldiSoap</h2>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/products" style={styles.navLink}>Products</a>
          <a href="/about" style={styles.navLink}>About</a>
          <a href="/contact" style={styles.navLink}>Contact</a>
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.favoritesContainer}>
          <h1 style={styles.title}>Your Favorites</h1>
          <div style={styles.favoritesItems}>
            {favorites.length > 0 ? (
              favorites.map(item => (
                <div key={item.id} style={styles.favoriteItem}>
                  <div style={styles.itemDetails}>
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div style={styles.favoriteIcon} onClick={() => toggleFavorite(item.id)}>
                    {item.isFavorite ? (
                      <FaHeart size={24} color="#D32F2F" />
                    ) : (
                      <FaRegHeart size={24} color="#D32F2F" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.emptyFavorites}>Your favorites list is empty!</p>
            )}
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} BeldiSoap. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: '"Segoe UI", sans-serif',
    backgroundColor: '#FFF8F0',
    color: '#4E342E',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#D4A373',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '4px solid #A05C3B',
  },
  logo: {
    fontSize: '24px',
    color: '#fff',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  favoritesContainer: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#5C3E31',
  },
  favoritesItems: {
    marginBottom: '20px',
  },
  favoriteItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  itemDetails: {
    flex: 1,
  },
  favoriteIcon: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyFavorites: {
    textAlign: 'center',
    color: '#7A5B48',
    fontStyle: 'italic',
  },
  footer: {
    backgroundColor: '#D4A373',
    padding: '20px',
    textAlign: 'center',
    color: '#fff',
  },
  footerText: {
    fontSize: '14px',
    marginTop: '5px',
  },
};

export default FavoritePage;
