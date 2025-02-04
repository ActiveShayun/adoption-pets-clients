import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorElement = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/')
    }
    return (
        <div className='pt-32'>
            <h4 className='text-4xl font-bold text-center'>Page not Found</h4>
            <button onClick={handleNavigate}
                className='mt-4 font-bold block mx-auto'>Back to home</button>
        </div>
    );
};

export default ErrorElement;