import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

const loadStripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY_PK)
const DonationPay = () => {
    return (
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
                Please payment with stripe</h2>
            <Elements stripe={loadStripePromise}>
                <CheckOutForm />
            </Elements>
        </div>
    );
};

export default DonationPay;