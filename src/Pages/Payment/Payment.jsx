import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY_PK);
const Payment = () => {

    return (
        <div className="bg-gradient-to-tr from-green-400 to-yellow-600 pt-28 lg:w-7/12 mx-auto text-black pb-5 px-4 ">
            <div className="bg-black p-4 rounded-lg">
                <SectionTitle subheading={'Please Enter Your Card Number'} />
        
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;