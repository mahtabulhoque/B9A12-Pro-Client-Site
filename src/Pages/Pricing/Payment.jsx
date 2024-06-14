// Payment.js
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  return (
    <div>
        <SectionTitle heading={'make your payment'}></SectionTitle>
      
     <div>
     <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
     </div>
    </div>
  );
};

export default Payment;
