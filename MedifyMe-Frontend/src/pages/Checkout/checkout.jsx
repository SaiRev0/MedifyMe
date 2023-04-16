import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navbar from "../../components/Navbar/Navbar";
import CheckoutForm from "../../components/Checkoutform/Checkoutform";

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const url = 
  
  // let url;
  // if (import.meta.env.MODE === "development") {
  //   url = "http://34.87.104.131:8080/payments/create_payment_intent";
  // } else {
  //   url = "https://medifyme-pvpz.onrender.com/payments/create_payment_intent";
  // }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/payments/create_payment_intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <Navbar />
      {clientSecret && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
