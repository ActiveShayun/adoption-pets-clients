import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import UseAuth from '../AuthProvider/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import loginAnimation from '../../src/assets/login.json.json'
import Lottie from 'lottie-react';
import login from '../../src/assets/login.json'
import AxiosPublic from '../UseHooks/AxiosPublic';


const Login = () => {
    const { handleLogin } = UseAuth()
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate();
    const location = useLocation()
    const form = location.state?.form?.pathname || '/'
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        // console.log(data)
        handleLogin(data.email, data.password)
            .then(result => {
                const user = result;
                console.log('Login user',user);
                // console.log('login user', user);
                toast.success('Sign in successful')
                // navigate(form, { replace: true })
            })
            .catch(err => {
                console.log('login err', err);
                toast.error('sign in failed')
            })
    }



    return (
        <div className='pt-24'>
            <div className='md:w-6/12 mx-auto  h-[590px] relative rounded-md z-[988]'>
                <Helmet><title>Login Page</title></Helmet>
                <div className='relative rounded-md'>
                    <section
                        class="z-[335] dark:bg-gray-900 absolute w-full mx-auto rounded-md">
                        <div
                            class="flex flex-col items-center justify-center mx-auto  lg:py-0 rounded-md">
                            <div
                                class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div
                                    class="p-6 space-y-4 md:space-y-6 sm:p-8 text-white">
                                    <div className=''>
                                        <h2 className='text-3xl font-medium text-center'>Sign in to your account</h2>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)}
                                        class="space-y-4 md:space-y-6 rounded-md" action="#">
                                        {/* email section */}
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                                            <input type="email"
                                                {...register("email", { required: true })}
                                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                            {/* error handling */}
                                            {errors.email?.type === "required" && (
                                                <p className='text-red-500' role="alert">Email is required</p>
                                            )}
                                        </div>
                                        {/* password */}
                                        <div className='relative'>
                                            <label for="password" class="block mb-2 text-sm font-medium text-white dark:text-white">password</label>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                {...register("password",
                                                    {
                                                        required: true,
                                                        minLength: 6, maxLength: 20,
                                                        pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/
                                                    })}
                                                placeholder="Enter your password"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
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
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-start">
                                                <div class="flex items-center h-5">
                                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                                </div>
                                                <div class="ml-3 text-sm">
                                                    <label for="remember" class="text-white dark:text-gray-300">Remember me</label>
                                                </div>
                                            </div>
                                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                        </div>
                                        {/* submit button */}
                                        <button type="submit"
                                            className="w-full  text-white bg-[#5C78F5]
                                 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign In</button>
                                        {/* social login section  */}
                                        <div>
                                            <SocialLogin />
                                        </div>
                                        <p class="text-sm font-light text-white dark:text-gray-400 text-center">
                                            Don’t have an account yet? <Link
                                                to={'/register/'}
                                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* add Lottie animation */}
                <div className='absolute top-0 left-0 w-full h-full rounded-md -z-10'>
                    <div className='relative w-full h-full'>
                        <Lottie animationData={loginAnimation} />
                        <div className='bg-black absolute top-0 left-0 opacity-60 w-full h-full'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;