const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration de multer pour stocker les fichiers dans le dossier 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Spécifie le dossier où stocker les fichiers
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Génère un nom unique pour chaque fichier
  },
});

const upload = multer({ storage });

// Route GET pour obtenir tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // Retourne tous les produits
  } catch (err) {
    res.status(500).json({ error: 'Server error' }); // Gestion des erreurs serveur
  }
});

// Route POST pour ajouter un nouveau produit
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Si une image est téléchargée, on définit son URL

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl, // L'URL de l'image du produit
    });

    await newProduct.save(); // Sauvegarde le produit dans la base de données
    res.status(201).json(newProduct); // Réponse avec le produit créé
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' }); // Gestion des erreurs
  }
});

// Route DELETE pour supprimer un produit par son ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé' }); // Si le produit n'est pas trouvé
    }
    
    // Supprimer l'image associée du serveur (si l'image existe)
    if (deletedProduct.imageUrl && fs.existsSync('.' + deletedProduct.imageUrl)) {
      fs.unlinkSync('.' + deletedProduct.imageUrl); // Supprimer le fichier image du dossier 'uploads'
    }

    res.json({ message: 'Produit supprimé avec succès' }); // Message de succès
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' }); // Gestion des erreurs serveur
  }
});

// Route PUT pour mettre à jour un produit par son ID (y compris l'image)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: 'Produit introuvable' }); // Si le produit n'est pas trouvé

    // Mise à jour des champs
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    // Si une nouvelle image est fournie
    if (req.file) {
      // Supprimer l'ancienne image (optionnel)
      if (product.imageUrl && fs.existsSync('.' + product.imageUrl)) {
        fs.unlinkSync('.' + product.imageUrl); // Supprime l'image ancienne du dossier 'uploads'
      }

      // Assigner la nouvelle image au produit
      product.imageUrl = `/uploads/${req.file.filename}`;
    }

    await product.save(); // Sauvegarder le produit mis à jour
    res.json(product); // Retourner le produit mis à jour
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Échec de la mise à jour du produit' }); // Gestion des erreurs
  }
});

module.exports = router; // Exporter les routes pour être utilisées ailleurs
