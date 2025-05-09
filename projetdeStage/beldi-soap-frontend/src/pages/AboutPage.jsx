import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer' ;
const AboutPage = () => {
  return (
    <div>
      <Navbar/>
    <div style={styles.page}>
      
      <div style={styles.container}>
        <h1 style={styles.title}>About BeldiSoap</h1>
        <p style={styles.text}>
          BeldiSoap is a Moroccan e-commerce brand committed to offering high-quality, traditional black soaps
          made from olive oil, eucalyptus, and other natural ingredients. Each product is handmade, preserving the
          ancestral rituals of Moroccan Hammams.
        </p>
        <p style={styles.text}>
          Our mission is to bring you the authenticity of Moroccan skincare, ensuring a natural and luxurious
          experience from the comfort of your home. Proudly crafted with love, tradition, and care.
        </p>
        <img
          src="https://images.unsplash.com/photo-1603126631373-7fdc47c4c218"
          alt="Beldi Soap"
          style={styles.image}
        />
     
      </div>
      <Footer/>  
    </div>
  
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#FFF8F0',
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: '"Segoe UI", sans-serif',
    color: '#4E342E',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginTop: '30px',
  },
};

export default AboutPage;












