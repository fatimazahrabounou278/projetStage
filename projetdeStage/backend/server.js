const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
require('dotenv').config();

const app = express(); // <- doit venir AVANT tout `app.use(...)`

// Middleware pour servir les fichiers uploadés
app.use('/uploads', express.static('uploads')); // Sert les fichiers statiques depuis le dossier 'uploads'

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/uploads', express.static('uploads'));
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/beldi_soap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Database connected'))
.catch((error) => {
  console.error('❌ Database connection error:', error.message);
  process.exit(1);
});

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);
// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
