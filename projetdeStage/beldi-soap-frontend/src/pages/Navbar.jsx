import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserName(storedUser);
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    setCartCount(totalItems);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName("");
  };

  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img
          src="/images/BioProgreen_logo-01.webp"
          alt="Logo"
          style={styles.logoImage}
        />
        <h1 style={styles.brandName}>BeldiSoap</h1>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <a href="/home" style={styles.navLink}>
          Home
        </a>

        <div
          style={styles.dropdown}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <a href="/products" style={styles.navLink}>
            Produits
          </a>
          {showDropdown && (
            <div style={styles.dropdownContent}>
              <a href="/categorie/floral" style={styles.dropdownItem}>
                Floral
              </a>
              <a href="/categorie/fruity" style={styles.dropdownItem}>
                Fruity
              </a>
              <a href="/categorie/vegetal" style={styles.dropdownItem}>
                Vegetal
              </a>
            </div>
          )}
        </div>

        <a href="/about" style={styles.navLink}>
          About
        </a>
        <a href="/contact" style={styles.navLink}>
          Contact
        </a>
      </nav>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.href = `/search?query=${encodeURIComponent(
              searchTerm
            )}`;
          }
        }}
        style={styles.searchInput}
      />

      {/* User + Cart */}
      <div style={styles.userZone}>
        {userName && (
          <>
            <span style={styles.hello}>Hello, {userName}</span>
            <a href="/profile" style={styles.profileButton}>
              <FaUserCircle size={20} /> Profile
            </a>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
        {!userName && (
          <a href="/login" style={styles.authButton}>
            Login
          </a>
        )}

        <a href="/cart" style={styles.cartIcon}>
          <FaShoppingCart size={22} />
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </a>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#e9ded1",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #b99b7f",
    fontFamily: '"Poppins", sans-serif',
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  brandName: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#5d4037",
    margin: 0,
    letterSpacing: "1px",
  },
  searchInput: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginLeft: "20px",
    width: "200px",
  },

  nav: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },
  navLink: {
    color: "#5d4037",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    position: "relative",
    cursor: "pointer",
  },
  dropdown: {
    position: "relative",
  },
  dropdownContent: {
    position: "absolute",
    top: "30px",
    left: 0,
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "10px",
    borderRadius: "6px",
    zIndex: 999,
  },
  dropdownItem: {
    display: "block",
    padding: "5px 10px",
    color: "#5d4037",
    textDecoration: "none",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  userZone: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  hello: {
    fontWeight: "500",
    color: "#5d4037",
  },
  profileButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#d7b899",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "5px",
    fontWeight: "600",
    textDecoration: "none",
  },
  authButton: {
    padding: "6px 12px",
    backgroundColor: "#a05c3b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    textDecoration: "none",
  },
  logoutButton: {
    backgroundColor: "#b44e3b",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    fontWeight: "600",
    cursor: "pointer",
  },
  cartIcon: {
    position: "relative",
    color: "#5d4037",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    backgroundColor: "#f44336",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default Navbar;
