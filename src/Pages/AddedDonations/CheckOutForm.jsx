import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AxiosSecure from "../../UseHooks/AxiosSecure/AxiosSecure";
import UseAuth from "../../AuthProvider/UseAuth";
import Cards from "../../DashBoard/UserRoutes/MyDonations/Cards";


const CheckOutForm = () => {
    const [clientsSecret, setClientsSecret] = useState('')
    const [error, setError] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { user } = UseAuth()
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = AxiosSecure()
    const { myDonations } = Cards()
    const price = myDonations?.reduce((total, item) => total + Number(item.donationAmount), 0)
    console.log('total price', price);


    useEffect(() => {
        if (price < 50) {
            console.error("Minimum payment amount is 50 cents");
            return;
        }
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                setClientsSecret(res.data.clientSecret)
                console.log('client secret', res.data.clientSecret);
            })
    }, [axiosSecure, price])


    const handleSubmit = async (event) => {

        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) return

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || 'anonymous@example.com',
                name: user?.displayName || 'Anonymous',
            }
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message)
        } else {
            console.log('paymentMethod', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientsSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous@example.com',
                        name: user?.displayName || 'Anonymous',
                    }
                }
            }
        )

        if (paymentIntent) {
            console.log('paymentIntent', paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)

                // save payments in the database
                const paymentInfo = {
                    email: user?.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cardId: myDonations.map(item => item._id),
                    donationId: myDonations.map(item => item.donationId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', paymentInfo)
                console.log('payments save', res.data);
            }

        } else {
            console.log('confirm error', confirmError);

        }

    }
    return (

        <form onSubmit={handleSubmit} className="border" >
            <div className="bg-white border border-gray-300 rounded-lg p-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#000000', // black text
                                '::placeholder': {
                                    color: '#6B7280', // Tailwind's gray-500
                                },
                            },
                            invalid: {
                                color: '#DC2626', // Tailwind's red-600
                                iconColor: '#DC2626',
                            },
                        },
                    }}
                />
                {error && (
                    <p className="text-red-700">{error}</p>
                )}
                {
                    transactionId && (
                        <p className="text-green-600 mt-4">Your Transaction Id : {transactionId}</p>
                    )
                }
            </div>


            <button className="btn w-full mt-4 text-white bg-gradient-to-tr
             from-blue-600 to-yellow-600"
                type="submit"
                disabled={!stripe || !clientsSecret}
            >
                Pay
            </button>
        </form >

    );
};

export default CheckOutForm;