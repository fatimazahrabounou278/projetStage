import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.links}>
          <a href="/" style={styles.link}>Accueil</a>
          <a href="/products" style={styles.link}>Produits</a>
          <a href="/about" style={styles.link}>À propos</a>
          <a href="/contact" style={styles.link}>Contact</a>
        </div>

        <div style={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.icon}>
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.icon}>
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.icon}>
            <FaTwitter />
          </a>
        </div>

        <p style={styles.copy}>
          © {new Date().getFullYear()} BeldiSoap. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#A05C3B',
    color: '#fff',
    padding: '30px 20px',
    textAlign: 'center',
    marginTop: 'auto',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'color 0.3s',
  },
  socials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '20px',
    marginBottom: '15px',
  },
  icon: {
    color: '#fff',
    transition: 'transform 0.3s',
  },
  copy: {
    fontSize: '12px',
    opacity: 0.8,
  },
};

export default Footer;
