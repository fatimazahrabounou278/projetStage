// pages/PaymentPage.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_..."); // Remplace par ta clé publique Stripe

const PaymentPage = () => {
  const totalAmount = 50; // Remplace par ton montant réel, par ex. depuis le panier

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={totalAmount} />
    </Elements>
  );
};

export default PaymentPage;
