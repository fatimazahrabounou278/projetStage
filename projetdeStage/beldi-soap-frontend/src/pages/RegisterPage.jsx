import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/auth/register', { username, email, password });
      alert('🌿 ' + response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Erreur d’inscription:', error.response || error);
      setErrorMsg(error.response?.data?.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌲 Créer un compte</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            placeholder="Mot de passe"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMsg && <p style={styles.error}>{errorMsg}</p>}
          <button type="submit" style={styles.button}>S’inscrire</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #e8f5e9, #fbe9e7)',
    fontFamily: "'Merriweather', serif",
  },
  card: {
    backgroundColor: '#fdfaf6',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 18px rgba(139, 69, 19, 0.2)',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
    border: '1px solid #d7ccc8',
  },
  title: {
    color: '#5d4037',
    marginBottom: '20px',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #a1887f',
    backgroundColor: '#fffaf5',
  },
  button: {
    padding: '12px',
    backgroundColor: '#6d4c41',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  error: {
    color: '#c62828',
    fontSize: '14px',
    marginTop: '5px',
  },
};

export default RegisterPage;
