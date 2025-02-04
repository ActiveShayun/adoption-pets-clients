import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AxiosPublic from '../UseHooks/AxiosPublic';
import UseAuth from '../AuthProvider/UseAuth';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const Register = () => {
    const [showPassword, setShowPassword] = useState(true)
    const { handleRegister, userProfileUpdate } = UseAuth()
    const useAxios = AxiosPublic()
    const navigate = useNavigate();
    const location = useLocation()
    const form = location?.state?.form?.pathname || '/';
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {
        // console.log(data)
        try {
            const userPhoto = {
                image: data.userImg[0]
            }
            // hot imgbb api and get image url
            const result = await useAxios.post(img_hosting_api, userPhoto, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            // console.log('hosting img', result.data.data.url);

            if (result.data.success) {
                const imgUrl = result.data.data.url;
                handleRegister(data.email, data.password)
                    .then(result => {
                        const user = result.user;
                        // console.log('register', user, user.displayName);
                        toast.success('user create successful')

                        // update user name and photo
                        userProfileUpdate({
                            displayName: data.name,
                            photoURL: imgUrl
                        })
                        if (user) {
                            const users = {
                                name: data.name,
                                email: user.email,
                                userPhoto: imgUrl,
                                role: false
                            }
                            // console.log('database user', users);
                            // user infoRmation store database 
                            const res = useAxios.post('/users', users)
                            // console.log('user store database', res);
                        }
                        navigate(form, { replace: true })
                    })
                    .catch(err => {
                        // console.log('register error', err);
                        toast.error('user create failed', err)
                    })
            }
        } catch (error) {
            // console.log('error', error);
        }

    }
    return (
        <div >
            <Helmet><title>Register Page</title></Helmet>
            <section class="bg-gray-50 dark:bg-gray-900 py-24">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <SectionTitle subheading={' Create an account'} />
                            <form onSubmit={handleSubmit(onSubmit)}
                                class="space-y-4 md:space-y-6" action="#">
                                {/* user photo */}
                                <div>
                                    <label class="block text-sm mb-2 font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
                                    <input
                                        {...register("userImg", { required: true })}
                                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required />
                                    <p class="my-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                </div>
                                {/* error handling */}
                                {errors.photo?.type === "required" && (
                                    <p className='text-red-500' role="alert">Photo URL is required</p>
                                )}

                                <div>
                                    {/* user name */}
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text"
                                        {...register("name", { required: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required="" />
                                </div>

                                {/* email section */}
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email"
                                        {...register("email", { required: true })}
                                        placeholder="name@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                {/* error handling */}
                                {errors.email?.type === "required" && (
                                    <p className='text-red-500' role="alert">Email is required</p>
                                )}
                                {/* password */}
                                <div className='relative'>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password",
                                            {
                                                required: true,
                                                minLength: 6, maxLength: 20,
                                                pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/
                                            })}
                                        placeholder="Enter your password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <span className='absolute top-10 right-2'
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>
                                {/* error handling */}
                                <div>
                                    {errors.password?.type === "required" && (
                                        <p className='text-red-500' role="alert">Password is required</p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className='text-red-500' role="alert">Password is Minimum length of 6</p>
                                    )}
                                    {errors.password?.type === "pattern" && (
                                        <p className='text-red-500' role="alert"> One uppercase letter,One lowercase letter, One digit, One special character, Minimum length of 6 characters</p>
                                    )}
                                </div>
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                {/* submit button */}
                                <button type="submit"
                                    className="w-full  text-white bg-[#5C78F5]
                                 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                {/* social login section  */}
                                <div>
                                    <SocialLogin />
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                    Already have an account?
                                    <Link to={'/login/'} className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-center">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;