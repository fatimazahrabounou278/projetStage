// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// POST /api/orders - Créer une commande
router.post("/", orderController.createOrder);

// GET /api/orders - Obtenir toutes les commandes (facultatif)
router.get("/", orderController.getAllOrders);

module.exports = router;
