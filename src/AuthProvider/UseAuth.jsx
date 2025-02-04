import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const UseAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext;
};

export default UseAuth;