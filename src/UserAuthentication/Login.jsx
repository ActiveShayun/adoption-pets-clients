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
                console.log('Login user', user);
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

        <div className="pt-24">
            <div className="md:w-6/12 mx-auto h-[700px] relative rounded-md z-[988]">
                <Helmet>
                    <title>Login Page</title>
                </Helmet>

                <div className="relative rounded-md">
                    <section className="z-[335] absolute w-full mx-auto rounded-md">
                        <div className="flex flex-col items-center justify-center mx-auto lg:py-0 rounded-md">
                            <div className="w-full shadow md:mt-0 sm:max-w-md xl:p-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-white">
                                    <div>
                                        <h1 className="text-3xl font-medium text-center">
                                            Sign in to your account
                                        </h1>
                                    </div>

                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-4 md:space-y-6 rounded-md"
                                        noValidate
                                    >
                                        {/* Email Section */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-white"
                                            >
                                                Your email
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                                className="bg-gray-500 text-white w-full py-2 px-3 rounded-md"
                                                placeholder="name@company.com"
                                                autoComplete="email"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 mt-1 text-sm">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password Section */}
                                        <div className="relative">
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-white"
                                            >
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Minimum length of 6 characters'
                                                    },
                                                    pattern: {
                                                        value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/,
                                                        message: 'Must contain uppercase, lowercase, number, and special character'
                                                    }
                                                })}
                                                placeholder="Enter your password"
                                                className="bg-gray-500 text-white w-full py-2 px-3 rounded-md"
                                                autoComplete="current-password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-10 right-2 text-gray-300 hover:text-white"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-500 text-sm">
                                                {errors.password.message}
                                            </p>
                                        )}

                                        {/* Remember Me & Forgot Password */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="remember"
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                                    />
                                                </div>
                                                <label
                                                    htmlFor="remember"
                                                    className="ml-3 text-sm text-white"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                            <Link
                                                to="/forgot-password"
                                                className="text-sm font-medium text-primary-600 hover:underline"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-[#5C78F5] hover:bg-[#4a68d4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200"
                                        >
                                            Sign In
                                        </button>

                                        {/* Social Login */}
                                        <div>
                                            <SocialLogin />
                                        </div>

                                        {/* Sign Up Link */}
                                        <p className="text-sm font-light text-white text-center">
                                            Don't have an account yet?{' '}
                                            <Link
                                                to="/register"
                                                className="font-medium text-primary-600 hover:underline"
                                            >
                                                Sign up
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Lottie Animation Background */}
                <div className="absolute top-0 left-0 w-full h-full rounded-md -z-10">
                    <div className="relative w-full h-full">
                        <Lottie
                            animationData={loginAnimation}
                            loop={true}
                            className="w-full h-full"
                        />
                        <div className="bg-black absolute top-0 left-0 opacity-60 w-full h-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;