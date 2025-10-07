import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

//---------------------------------Arguments/return data------------------------------------//
interface Ship {
    id: number;
    shipName: string;
    maxFuel: number;
    maxEquip: number;
    size: number;
}



//----------------------------------------------------------------------//

interface ServiceType {
    getShips: () => Promise<Ship[] | undefined>;
    createPlayer: (name: string, ship: Ship) => Promise<boolean>;
}

const Service = createContext<ServiceType>({    // valori di fallback
    getShips: async () => undefined,
    createPlayer: async () => false,
});

interface ServiceProviderProps {
    children: ReactNode;
}


export const ServiceProvider = ({ children }: ServiceProviderProps) => {
    const { token } = useAuth();
    const tokenHeader = token ? { token: `${token}` } : {};
    //--------------------------------Ship-----------------------------------------------//

    const getShips = async (): Promise<Ship[] | undefined> => {
        try {
            const response = await fetch("http://localhost:8080/ship?size=0", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                console.error("Error in the response:", response.status);
                return undefined;
            }

            const ships = await response.json();
            console.log("Ships:", ships);
            return ships;

        } catch (err) {
            console.error("Error in the request:", err);
            return undefined;
        }
    };

    //-----------------------------------------------------------------------------------//

    //--------------------------------Player-----------------------------------------------//

    const createPlayer = async (name: string, ship: Ship): Promise<boolean> => {
        console.log(name, ship);
        try {
            const response = await fetch("http://localhost:8080/player", {
                method: "POST",
                headers: { "Content-Type": "application/json", ...tokenHeader } as HeadersInit,
                body: JSON.stringify({ name, ship }),
            });

            if (!response.ok) {
                console.error("Error in the response:", response.status);
                return false;
            }

            const player = await response.json();
            console.log("Player created:", player);
            return true;

        } catch (err) {
            console.error("Error in the request:", err);
            return false;
        }
    };

    //-----------------------------------------------------------------------------------//

    return (
        <Service.Provider
            value={{
                getShips,
                createPlayer
            }}
        >
            {children}
        </Service.Provider>
    );
}

export const useService = () => useContext(Service);