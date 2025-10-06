import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import Game from "./Game";
import { useState } from 'react';
import { useAuth } from "../context/AuthContext";


function Home() {
    const [showRegForm, setShowRegForm] = useState(false);

    const [showLogForm, setShowLogForm] = useState(false);

    const { isLoggedIn, logout } = useAuth();


    return <>

        <h2>Welcome to AstroGame!</h2>
        <div>
            {isLoggedIn ? (
                <>
                    <button onClick={logout}>Log out</button>
                    <button onClick={Game}>Play</button>
                </>

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