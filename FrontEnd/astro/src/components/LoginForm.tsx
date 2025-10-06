import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function LoginForm({ onCancel }: { onCancel: () => void }) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) onCancel(); // chiude il form se login ok
        else alert("Login fallito");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default LoginForm;