import { useState } from "react";

interface LoginFormProps {
    onCancel: () => void;  // function passed by Home component
}

function LoginForm({ onCancel }: LoginFormProps) {
    const fields = ["userName", "password"];


    interface LogData {
        userName: string;
        password: string;
    }

    const [formData, setFormData] = useState<LogData>({
        userName: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;   // e stands for event, target is the DOM element which generated the event(in our case an input element)
        setFormData(prev => ({ ...prev, [name]: value }));  // sets the field value of which name corresponds to {field}
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // avoids page refresh

        const { userName, password } = formData;
        const userData: LogData = { userName, password };   // instance of Data
        console.log("Dati pronti per la fetch:", userData);

        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Net error");
            }

            const user: { userName: string; token: string } = await response.json();
            localStorage.setItem("username", user.userName);
            localStorage.setItem("token", user.token);

            console.log("Response:", user);

            if (user) {
                alert("Login completed");
                onCancel();
            } else {
                alert("Error: ");
            }
        } catch (err) {
            console.error(err);
            alert("Impossible to contact the server");
        }
    };

    return <div>
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
                <div key={field}>
                    <label>{field}</label>
                    <input
                        type={field.toLowerCase().includes("password") ? "password" : "text"} // sets the type
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <button type="submit">Log in</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    </div>
}

export default LoginForm;