import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ← ajout

const CheckoutPage = () => {
  const navigate = useNavigate(); // ← ajout
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Commande confirmée !");
    localStorage.removeItem("cart");

    // Redirection vers la page de paiement
    navigate("/payment"); // ← redirection ici
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Paiement</h1>
      <div style={styles.content}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Informations de livraison</h2>
          <input type="text" name="fullName" placeholder="Nom complet" required onChange={handleChange} style={styles.input} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} style={styles.input} />
          <input type="text" name="address" placeholder="Adresse" required onChange={handleChange} style={styles.input} />
          <input type="text" name="city" placeholder="Ville" required onChange={handleChange} style={styles.input} />
          <input type="text" name="postalCode" placeholder="Code postal" required onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.submitBtn}>Confirmer la commande</button>
        </form>

        <div style={styles.summary}>
          <h2>Résumé du panier</h2>
          {cart.map((item, index) => (
            <div key={index} style={styles.item}>
              <span>{item.name} x {item.quantity || 1}</span>
              <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <h3>Total : ${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    padding: "40px",
    fontFamily: "Roboto, sans-serif",
  },
  title: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    gap: "40px",
    flexWrap: "wrap",
  },
  form: {
    flex: 1,
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  submitBtn: {
    marginTop: "20px",
    padding: "14px",
    backgroundColor: "#008060",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  summary: {
    flex: 1,
    minWidth: "300px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
};

export default CheckoutPage;
