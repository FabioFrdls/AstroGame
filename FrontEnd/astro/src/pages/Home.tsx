import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import LogOut from "../components/LogOut";
import { useState } from 'react';
import { useEffect } from "react";

function Home() {
    const [showRegForm, setShowRegForm] = useState(false);

    const [showLogForm, setShowLogForm] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    const handleLogout = () => {    // logOut function
        LogOut();
        setIsLoggedIn(false);
    };


    return <>

        <h2>Welcome to AstroGame!</h2>
        <div>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Log out</button>
            ) : (
                <>
                    <button onClick={() => setShowRegForm(true)}>Sign up</button>
                    {showRegForm && (
                        <RegistrationForm onCancel={() => setShowRegForm(false)} />
                    )}
                    <button onClick={() => setShowLogForm(true)}>Log in</button>
                    {showLogForm && (
                        <LoginForm onCancel={() => setShowLogForm(false)} />
                    )}
                </>
            )}
        </div>
    </>
}

export default Home;