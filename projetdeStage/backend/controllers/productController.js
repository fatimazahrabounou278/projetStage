const Product = require('../models/Product');

// Afficher tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // Renvoie tous les produits
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Afficher un seul produit (y compris l'image en base64)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image.toString('base64'), // L'image en base64 pour l'afficher dans le frontend
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter un nouveau produit (y compris l'image)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageBuffer = req.file.buffer; // Récupère l'image téléchargée

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: imageBuffer,
    });

    await newProduct.save(); // Sauvegarde le produit dans la base de données
    res.status(201).json(newProduct); // Réponse avec le produit créé
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
