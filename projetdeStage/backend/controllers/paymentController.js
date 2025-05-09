// controllers/paymentController.js
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_..."); // remplace par ta clé secrète Stripe

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = "eur" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convertir en centimes
      currency,
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    res.status(500).json({ error: "Erreur de paiement" });
  }
};
