import React, { useEffect, useState } from 'react';
import API from '../../api'; // Vérifie que le chemin est correct
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get('/auth/profile');
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setErrorMsg("Données utilisateur introuvables.");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        setErrorMsg("Impossible de charger le profil. Veuillez vous reconnecter.");
        // navigate('/login'); // Active cette ligne si tu veux rediriger automatiquement
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Déconnecter
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Profil utilisateur</h2>

        {loading ? (
          <p>Chargement du profil...</p>
        ) : errorMsg ? (
          <p style={styles.error}>{errorMsg}</p>
        ) : (
          <>
            <div style={styles.infoBlock}>
              <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Rôle :</strong> {user.role}</p>
            </div>
            <button style={styles.button} onClick={handleLogout}>
              🔒 Se déconnecter
            </button>
          </>
        )}
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
    background: 'linear-gradient(to bottom right, #ede7f6, #e1f5fe)',
    fontFamily: "'Merriweather', serif",
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'left',
    border: '1px solid #ccc',
  },
  title: {
    color: '#3f51b5',
    marginBottom: '20px',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoBlock: {
    fontSize: '16px',
    lineHeight: '1.6',
  },
  error: {
    color: '#d32f2f',
    fontSize: '14px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default ProfilePage;
