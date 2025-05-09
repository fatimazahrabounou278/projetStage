import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";

const HomePage = () => {
  const categories = [
    { name: "Floral", path: "/category/floral", color: "#fce4ec" },
    { name: "Fresh", path: "/category/fresh", color: "#e1f5fe" },
    { name: "Gourmand", path: "/category/gourmand", color: "#fff8e1" },
    { name: "Vegetal", path: "/category/vegetal", color: "#e8f5e9" },
    { name: "Woodlands", path: "/category/woodlands", color: "#efebe9" },
    { name: "Fruity", path: "/category/fruity", color: "#efebe9" },
  ];

  return (
    <div style={styles.page}>
      <Navbar />
      <a href="/cart" style={styles.cartIcon}>
        <FaShoppingCart size={24} color="#fff" />
      </a>

      {/* Welcome Hero Section */}
      <section style={styles.welcomeSection}>
        <div style={styles.welcomeOverlay}>
          <h1 style={styles.welcomeTitle}>WELCOME TO BELDI SOAP</h1>
          <p style={styles.welcomeSubtitle}>Letting your true beauty shine</p>
          <p style={styles.welcomeDesc}>
            Offer a black soap that combines tradition and effectiveness,
            and stand out in the natural products market.
          </p>
          <a href="/category" style={styles.heroButton}>
            Discover Our Soaps
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Nos Collections</h2>
        <div style={styles.categoriesGrid}>
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.path}
              style={{ ...styles.categoryCard, backgroundColor: cat.color }}
            >
              <h3>{cat.name}</h3>
              <p>Découvrez notre gamme {cat.name.toLowerCase()}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#fff",
    color: "#3E2723",
  },
  cartIcon: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#A05C3B",
    padding: "10px",
    borderRadius: "50%",
    zIndex: 10,
  },
  welcomeSection: {
    backgroundImage: 'url("/images/bg.jpeg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  welcomeOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    color: "#fff",
    padding: "60px 30px",
    borderRadius: "16px",
    textAlign: "center",
    maxWidth: "700px",
  },
  welcomeTitle: {
    fontSize: "48px",
    marginBottom: "20px",
    fontWeight: "700",
  },
  welcomeSubtitle: {
    fontSize: "22px",
    fontStyle: "italic",
    marginBottom: "16px",
  },
  welcomeDesc: {
    fontSize: "16px",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  heroButton: {
    backgroundColor: "#A05C3B",
    color: "#fff",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  categoriesSection: {
    padding: "80px 20px",
    backgroundColor: "#fef9f5",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "40px",
    color: "#A05C3B",
  },
  categoriesGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
  },
  categoryCard: {
    textDecoration: "none",
    padding: "24px",
    borderRadius: "16px",
    width: "220px",
    color: "#4E342E",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
};

export default HomePage;
