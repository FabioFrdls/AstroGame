import RegistrationForm from "../components/RegistrationForm";
import { useState } from 'react';

function Home() {
    const [showForm, setShowForm] = useState(false);
    return <>
        <h2>Welcome to AstroGame!</h2>
        <div>
            <button onClick={() => setShowForm(true)}>Sign up</button>
            {showForm && (
                <RegistrationForm onCancel={() => setShowForm(false)} />
            )}
            <button>Log in</button>
        </div>
    </>
}

export default Home;