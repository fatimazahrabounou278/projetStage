import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // ID depuis l'URL

  // Charger les données du produit à éditer
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setForm({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          category: res.data.category,
        });
      } catch (err) {
        setMessage('');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('category', form.category);
    if (image) data.append('image', image);

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, data);
      setMessage('✅ Product updated successfully!');
      navigate('/Admin/AllProducts')
    } catch (error) {
      setMessage('❌ Failed to update product.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        encType="multipart/form-data"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="price"
          type="number"
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
          onChange={handleFileChange}
          accept="image/*"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Update Product
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '40px auto', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', background: '#0062cc', color: '#fff', border: 'none', cursor: 'pointer' },
};

export default EditProduct;
