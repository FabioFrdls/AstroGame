import { useState } from "react";

interface User {
    id: BigInteger;
    email: string;
    userName: string;
    password: string;
}


interface RegistrationFormProps {
    onCancel: () => void;  // function passed by Home component
}

function RegistrationForm({ onCancel }: RegistrationFormProps) {

    const fields = ["email", "userName", "password", "repeatPassword"]; // array to map in input fields

    interface Data {         // data to send to backend
        email: string;
        userName: string;
        password: string;
    }

    interface RegistrationData extends Data {    // extension for psw check before the fetch
        repeatPassword: string;
    }

    const [formData, setFormData] = useState<RegistrationData>({
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
        const { email, userName, password } = formData;
        const userData: Data = { email, userName, password };   // intance of Data
        console.log("Dati pronti per la fetch:", userData);

        try {
            const response = await fetch("http://localhost:8080/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Net error");
            }

            const user: User = await response.json();
            console.log("Response:", user);

            if (user) {
                alert("Registration completed");
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

            <button type="submit">Sign up</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    </div>
}

export default RegistrationForm;