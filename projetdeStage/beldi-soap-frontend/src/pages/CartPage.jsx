import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    updateLocalStorage(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      updateLocalStorage(updatedCart);
    } else {
      removeFromCart(index);
    }
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    updateLocalStorage(updatedCart);
  };

  const total = cart.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

  return (
    <div style={{ padding: "40px", fontFamily: "Roboto, sans-serif" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    onClick={() => decreaseQuantity(index)}
                    style={btnStyle}
                  >
                    −
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    style={btnStyle}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                style={removeBtnStyle}
              >
                Remove
              </button>
            </div>
          ))}
          <h2>Total: ${total.toFixed(2)}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={checkoutBtnStyle}
          >
            Procéder au paiement
          </button>
        </>
      )}
    </div>
  );
};

const btnStyle = {
  padding: "5px 12px",
  backgroundColor: "#A05C3B",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "18px",
};

const removeBtnStyle = {
  padding: "10px 16px",
  backgroundColor: "#ff6b6b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const checkoutBtnStyle = {
  marginTop: "30px",
  padding: "14px 24px",
  backgroundColor: "#008060",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
};

export default CartPage;
