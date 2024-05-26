import { InputLabel, useAutocomplete } from "@mui/material";
import { auth, googleAuth } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

function Auth() {
    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, passowrd);
        } catch (err) {
            console.error(err);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuth);
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    console.log(auth?.currentUser?.email);

    return <>
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <input type="password" placeholder="pswrd" onChange={(e) => setPassword(e.target.value)} value={passowrd} />
        <br />
        <button onClick={signIn}>submit</button>
        <button onClick={signInWithGoogle}> Sign In With Google </button>
        <button onClick={logout}> Logout </button>
    </>
}

export default Auth;