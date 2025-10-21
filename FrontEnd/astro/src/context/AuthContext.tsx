import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    username: string | null;
    token: string | null;
    signup: (email: string, userName: string, password: string) => Promise<boolean>;
    login: (userName: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({    // valori di fallback
    isLoggedIn: false,
    username: null,
    token: null,
    signup: async () => false,
    login: async () => false,
    logout: async () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [username, setUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const isLoggedIn = !!token;

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUsername = localStorage.getItem("username");

        if (!savedToken) return;

        const validateToken = async () => {
            try {
                const res = await fetch("http://localhost:8080/user/getCurrentToken", {
                    method: "GET",
                    headers: { "token": savedToken },
                });

                if (res.ok) {
                    const valid = await res.json(); // true o false
                    if (valid) {
                        setToken(savedToken);
                        setUsername(savedUsername);
                    } else {
                        console.warn("Token non valido — rimuovo dal localStorage");
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                    }
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                }
            } catch (error) {
                console.error("Errore nel controllo token:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("username");
            }
        };
        validateToken();
    }, []);

    //----------------------------Signup-------------------------------------//

    const signup = async (email: string, userName: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:8080/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, userName, password }),
            });

            if (!response.ok) {
                console.error("Errore nella registrazione:", response.status);
                return false;
            }

            const user = await response.json();
            console.log("Utente registrato:", user);

            // opzionale: effettua login automatico
            setUsername(user.userName);
            localStorage.setItem("username", user.userName);
            return true;

        } catch (err) {
            console.error("Errore fetch signup:", err);
            return false;
        }
    };
    //-----------------------------------------------------------------//

    //-----------------------------Login-----------------------------------//

    const login = async (userName: string, password: string) => {
        try {
            const res = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password }),
            });

            if (!res.ok) {
                console.log("Login failed");
                return false;
            }

            const data: { userName: string; token: string } = await res.json();
            setUsername(data.userName);
            setToken(data.token);
            localStorage.setItem("username", data.userName);
            localStorage.setItem("token", data.token);
            console.log("Login completed: " + data.userName + ", " + data.token);
            return true;
        } catch (err) {
            console.error("Error:", err);
            return false;
        }
    };

    //-----------------------------------------------------------------//

    //---------------------------Logout--------------------------------------//

    const logout = async () => {
        try {
            if (!token) return;
            const res = await fetch("http://localhost:8080/user/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json", token },
            });
            if (!res.ok) console.error("Errore logout backend");
            else console.log('logout ok');
        } catch (err) {
            console.error("Errore fetch logout:", err);
        } finally {
            setUsername(null);
            setToken(null);
            localStorage.removeItem("username");
            localStorage.removeItem("token");
        }
    };

    //-----------------------------------------------------------------//

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                username,
                token,
                signup,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
