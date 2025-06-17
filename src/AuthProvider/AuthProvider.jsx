import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, updateProfile, GithubAuthProvider } from "firebase/auth";
import auth from "../Firebase/firebase.init";
import AxiosPublic from "../UseHooks/AxiosPublic";
import axios from "axios";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const axiosPublic = AxiosPublic()



    const handleRegister = (email, password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleLogin = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userProfileUpdate = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    const GoogleAProvider = new GoogleAuthProvider()
    const loginWithGoogle = () => {
        setLoading(false)
        return signInWithPopup(auth, GoogleAProvider)
    }

    const githubProvider = new GithubAuthProvider()
    const handleGithubProvider = () => {
        setLoading(false)
        return signInWithPopup(auth, githubProvider)
    }

    const handleSignOut = () => {
        return signOut(auth)
    }
    console.log('users', user);

    useEffect(() => {
        const unSubsCribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            console.log('current user ---->', currentUser?.email);
            if (currentUser?.email) {
                const user = { email: currentUser.email }
                axiosPublic.post('https://adoption-pets-server-site.vercel.app/jwt', user)
                    .then(res => {
                        console.log('responce', res.data);
                    })
            }
            setLoading(false)

        })

        return () => {
            unSubsCribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setUser,
        handleRegister,
        handleLogin,
        userProfileUpdate,
        loginWithGoogle,
        handleSignOut,
        handleGithubProvider
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;