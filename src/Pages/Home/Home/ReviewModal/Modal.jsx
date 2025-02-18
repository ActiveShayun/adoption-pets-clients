import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import UseAuth from '../../../../AuthProvider/UseAuth';
import ReactStars from "react-rating-stars-component";
import AxiosPublic from '../../../../UseHooks/AxiosPublic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
    const { user } = UseAuth()
    const [rating, setRating] = useState(0)
    const [error, setError] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const axiosPublic = AxiosPublic()
    const navigate = useNavigate()

    const submitReview = async (e) => {
        e.preventDefault()
        // rating validation
        // console.log(rating);
        if (rating === 0) {
            return setError('please select rating')
        } else {
            setError('')
        }

        const form = new FormData(e.target)
        const initialData = Object.fromEntries(form.entries())
        //  console.log(initialData);

        const { ...newReview } = initialData
        newReview.rating = rating

        newReview.clients = {
            name: user?.displayName,
            photo: user?.photoURL
        }

        // review add/post method
        try {
            const res = await axiosPublic.post(`/addReview`, newReview)
            console.log(res);
            if (res.data.insertedId) {
                toast.success('Service review successful')
                navigate('/')
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    console.log(rating);

    return (
        <div>
            {/* add review section*/}
            <div >
                {/* Review Section */}
                <div>
                    <div className='flex items-center justify-between'>
                        <h3 className="text-3xl font-bold text-green-400">Leave a Review</h3>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                    <form onSubmit={submitReview} className="space-y-6 mt-6">
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-lg mb-2">Email</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    className="w-full p-3 rounded-md text-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-lg mb-2">Deadline</label>
                                <DatePicker
                                    className="w-full p-3 rounded-md text-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Review</label>
                            <textarea
                                name='review'
                                rows="4"
                                className="w-full p-3 rounded-md text-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Write your review..."
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Rating</label>
                            <ReactStars count={10} onChange={ratingChanged} size={30} activeColor="#FFD700" />
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-lg font-bold rounded-lg text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Modal;