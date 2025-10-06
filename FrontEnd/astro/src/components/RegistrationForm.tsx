import { useState } from "react";
import { useAuth } from "../context/AuthContext";


interface RegistrationFormProps {
    onCancel: () => void;  // function passed by Home component
}

function RegistrationForm({ onCancel }: RegistrationFormProps) {

    const { signup } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        userName: "",
        password: "",
        repeatPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;   // e stands for event, target is the DOM element which generated the event(in our case an input element)
        setFormData(prev => ({ ...prev, [name]: value }));  // sets the field value of which name corresponds to {field}
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // avoids page refresh

        if (formData.password !== formData.repeatPassword) {        // psw check
            alert("The passwords don't match");
            return;
        }
        const success = await signup(formData.email, formData.userName, formData.password);
        if (success) {
            alert("Signup completed!");
            onCancel();
        } else {
            alert("Signup failed...");
        }
    };



    return <div>
        <form onSubmit={handleSubmit}>
            {["email", "userName", "password", "repeatPassword"].map(field => (
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

            <button type="submit">Sign up</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    </div>
}

export default RegistrationForm;