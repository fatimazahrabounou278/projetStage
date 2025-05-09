import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ Product added successfully!");
      setForm({ name: "", description: "", price: "", category: "" });
      setImage(null);
      navigate("/Admin");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error adding product.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select category</option>
          <option value="Floral">Floral</option>
          <option value="Fruity">Fruity</option>
          <option value="Fresh">Fresh</option>
          <option value="Gourmand">Gourmand</option>
          <option value="Vegetal">Vegetal</option>
          <option value="Woodlands">Woodlands</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: { maxWidth: "500px", margin: "40px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: {
    padding: "10px",
    background: "#008060",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default AddProductPage;
