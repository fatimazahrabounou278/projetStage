import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const categories = [
    { name: 'Floral', path: '/category/floral', color: '#fce4ec', image: '/images/Floral.jpg' },
    { name: 'Fresh', path: '/category/fresh', color: '#e3f2fd', image: '/images/Fresh.jpg' },
    { name: 'Gourmand', path: '/category/gourmand', color: '#fff8e1', image: '/images/Gourmand.jpg' },
    { name: 'Vegetal', path: '/category/vegetal', color: '#e8f5e9', image: '/images/Vegetal.jpg' },
    { name: 'Woodlands', path: '/category/woodlands', color: '#efebe9', image: '/images/Woodlands.jpg' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Shop by Scent</h2>
      <div style={styles.grid}>
        {categories.map((cat, idx) => (
          <Link key={idx} to={cat.path} style={{ ...styles.card, backgroundColor: cat.color }}>
            <img src={cat.image} alt={cat.name} style={styles.image} />
            <h3 style={styles.catName}>{cat.name}</h3>
            <p style={styles.desc}>Explore our {cat.name.toLowerCase()} collection</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', margin: '0 auto' },
  title: { textAlign: 'center', fontSize: '2rem', marginBottom: '40px', color: '#2c2c2c' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '30px',
  },
  card: {
    textDecoration: 'none',
    padding: '30px 20px',
    borderRadius: '16px',
    color: '#333',
    textAlign: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  image: {
    height: '100px',
    width :'300',
    objectFit: 'contain',
    marginBottom: '20px',
  },
  catName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: '10px 0',
  },
  desc: {
    fontSize: '0.95rem',
    color: '#555',
  }
};

export default CategoryPage;
