import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/auth/login', { email, password });
      if (response.data.token) {
        // Stocker le token dans sessionStorage
        sessionStorage.setItem('token', response.data.token);

        // Rediriger l'utilisateur vers la page d'accueil sans vérifier le rôle
        navigate('/home');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error.response || error);
      setErrorMsg(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login to Your Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <div style={styles.forgotPassword}>
        <a href="/register" style={styles.forgotLink}>registre</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9'
  },
  title: {
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#008060',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    fontSize: '14px'
  },
  forgotPassword: {
    marginTop: '15px'
  },
  forgotLink: {
    textDecoration: 'none',
    color: '#008060',
    fontSize: '14px'
  }
};

export default LoginPage;
