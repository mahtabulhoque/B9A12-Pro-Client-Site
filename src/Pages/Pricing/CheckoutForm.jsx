import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false); // State to track payment completion
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the client secret from the backend on component mount
    axiosSecure
      .post("/create-payment-intent", { price: 99.99 })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Error creating payment intent", err);
        setError("Failed to fetch client secret. Please try again later.");
      });
  }, [axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Failed to load Stripe. Please refresh the page.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card Element not found");
      return;
    }

    try {
      // Create PaymentMethod using card element
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        return;
      }

      // Confirm payment intent with client secret and payment method
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      // If payment succeeds
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setPaymentCompleted(true); // Mark payment as completed

        const payment = {
          email: user?.email || "anonymous",
          price: 99.99,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(),
        };

        // Save payment details to your backend
        axiosSecure
          .post("/payments", payment)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              position: "top",
              icon: "success",
              title: `${user?.displayName} Thank you for your payment`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((err) => {
            console.error("Payment saving error:", err);
            setError("Payment saving failed. Please contact support.");
          });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Payment failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 md:mt-20 lg:mt-28 bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          type="submit"
          disabled={!stripe || !clientSecret || paymentCompleted} // Disable button when payment is completed
        >
          {paymentCompleted ? "Payment Completed" : "Pay"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {transactionId && !paymentCompleted && (
          <p className="mt-4 text-green-500">
            Your Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
