import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import AxiosSecure from '../../UseHooks/AxiosSecure/AxiosSecure';
import UseAuth from '../../AuthProvider/UseAuth';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

const CheckOutForm = () => {
    const axiosSecure = AxiosSecure()
    const { id } = useParams()

    // console.log(id);
    const detailsPayment = useLoaderData()
    // console.log(detailsPayment);
    const stripe = useStripe()
    const elements = useElements()
    const [err, setErr] = useState('')
    const [clientsSecret, setClientsSecret] = useState(null)
    const [paymentId, setPaymentId] = useState('')
    const { user } = UseAuth()
    // console.log('clientsSecret', clientsSecret);
    const [Amount, setAmount] = useState(0)
    // console.log(Amount);
 

    useEffect(() => {
        if (Amount > 0 && Amount <= 999999.99) {
            axiosSecure.post('/create-payment-intent', { prise: Amount })
                .then(res => {
                    // console.log(res.data.clientsSecret)
                    setClientsSecret(res.data.clientsSecret)
                })
        }
    }, [Amount])

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 0 && value <= 999999.99) {
            setAmount(parseFloat(value));
        } else {
            setAmount(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (user?.email === detailsPayment.donationEmail) {
        //     return toast.error('Donation owner can not donation provide')
        // }

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setErr(error.message)
            // console.log('payment Err', error);
        } else {
            // toast.success()
            // console.log('payment success', paymentMethod);
            setErr('')
        }

        const { err: paymentErr, paymentIntent } = await stripe.confirmCardPayment(clientsSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous',
                }
            }
        })

        if (paymentIntent) {
            // console.log('payment success', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                toast.success('payment successful')
                setPaymentId(paymentIntent.id)

                const donation = {
                    donationId: detailsPayment._id,
                    petsName: detailsPayment.petsName,
                    petsImage: detailsPayment.petsImage,
                    deadline: detailsPayment.deadline,
                    donnerEmail: user?.email,
                    donnerName: user?.displayName,
                    donationAmount: Amount,

                }
                // save donation info to database
                const res = await axiosSecure.post(`/provide-donation?id=${detailsPayment._id}`, donation)
                // console.log(res);
                if (res.data.insertedId) {
                    toast.success('donation successful')
                }
            }
        }
        else {
            //.log('payment err', paymentErr);
            setPaymentId('')
            toast.error('payment failed')
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-white text-center dark:text-white">Enter Amount</label>
                <input type="text"
                    onChange={handleInputChange}
                    defaultValue={detailsPayment?.amount}
                    max="999999.99"
                    step="0.01"
                    class="bg-gray-50 w-5/12 mx-auto mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter amount" required />
            </div>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#FFFFFF',
                            '::placeholder': {
                                color: '#FFFFFF',
                            },
                        },
                        invalid: {
                            color: '#FBE2E0',
                        },
                    },
                }}
            />
            <button
                className='mt-3 text-white bg-gray-700 px-8 py-2 rounded-lg block mx-auto'
                disabled={!stripe || !clientsSecret}
            >pay</button>
            <p className="text-red-400">{err}</p>
            {
                paymentId && <p className="text-green-600 text-center">
                    Your transaction id,{paymentId}</p>
            }
        </form>
    );
};

export default CheckOutForm;