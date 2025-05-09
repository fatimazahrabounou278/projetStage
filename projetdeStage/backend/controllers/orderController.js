// controllers/orderController.js

const Order = require("../models/Order");

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
  try {
    const { items, total, user } = req.body;

    if (!items || !total || !user) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const newOrder = new Order({ items, total, user });
    await newOrder.save();

    res.status(201).json({ message: "Commande enregistrée", order: newOrder });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Obtenir toutes les commandes (optionnel, utile pour l'admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commandes" });
  }
};
