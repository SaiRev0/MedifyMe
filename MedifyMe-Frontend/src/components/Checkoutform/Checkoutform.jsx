import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./Checkoutform.module.css";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  let return_url;
  if (import.meta.env.MODE === "development") {
    return_url = "http://localhost:80/video_room";
  } else {
    return_url = "https://medifymeiitbhu.me/video_room";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      toast.success("Payment Successful");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className={styles.paymentDiv}>
      <form className={styles.payment_form} onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          className={styles.submit}
        >
          <span className={styles.button_text}>
            {isLoading ? (
              <div className={styles.spinner} id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {message && <div className={styles.payment_message}>{message}</div>}
      </form>
    </div>
  );
}
