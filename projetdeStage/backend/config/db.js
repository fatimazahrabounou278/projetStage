require('dotenv').config(); // 👈 très important
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // 👈 utilise la variable d'environnement
    console.log('✅ MongoDB connecté avec succès');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
    process.exit(1); // quitte l'app si la connexion échoue
  }
};

module.exports = connectDB;
