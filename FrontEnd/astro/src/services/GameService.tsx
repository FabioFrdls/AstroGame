import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import type { Ship, Vector, Player } from "../model/objects";


interface ServiceType {
    getShips: () => Promise<Ship[] | undefined>;
    createPlayer: (name: string, ship: Ship) => Promise<boolean>;
    getPlayer: () => Promise<Player | null | undefined>;
    deletePlayer: () => Promise<boolean>;
    moveTo: (destination: Vector) => Promise<Pair | undefined>;
}

const GameService = createContext<ServiceType>({    // valori di fallback
    getShips: async () => undefined,
    createPlayer: async () => false,
    getPlayer: async () => undefined,
    deletePlayer: async () => false,
    moveTo: async () => undefined
});

interface ServiceProviderProps {
    children: ReactNode;
}

interface Pair {
    left: Player;
    right: boolean;
}

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
    const { token } = useAuth();
    const tokenHeader = token ? { token: `${token}` } : {};
    //------------------------------Get--Ships-----------------------------------------------//

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

    //------------------------------Create--Player-----------------------------------------------//

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

    //-------------------------------Get--Player----------------------------------------------//

    const getPlayer = async (): Promise<Player | null | undefined> => {
        try {
            const response = await fetch("http://localhost:8080/player/getPlayer", {
                method: "GET",
                headers: { "Content-Type": "application/json", ...tokenHeader } as HeadersInit,
            });
            console.log(token);

            if (response.status === 204) {
                console.log("Player not found (null)");
                return null;
            }

            if (!response.ok) {
                console.error("Error in the response:", response.status);
                return undefined;
            }

            const player = await response.json();
            console.log("Player:", player);
            return player;

        } catch (err) {
            console.error("Error in the request:", err);
            return undefined;
        }
    };

    //------------------------------------------------------------------------------------//

    //------------------------------Delete--Player-----------------------------------------------//

    const deletePlayer = async (): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:8080/player", {
                method: "DELETE",
                headers: { "Content-Type": "application/json", ...tokenHeader } as HeadersInit,
            });

            if (!response.ok) {
                console.error("Error in the response:", response.status);
                return false;
            }

            const player = await response.json();
            console.log("Player deleted:", player);
            return true;

        } catch (err) {
            console.error("Error in the request:", err);
            return false;
        }
    };

    //-----------------------------------------------------------------------------------//


    //----------------------------------Move----------------------------------------------//
    const moveTo = async (destination: Vector): Promise<Pair | undefined> => {

        try {
            const response = await fetch("http://localhost:8080/player/move", {
                method: "PUT",
                headers: { "Content-Type": "application/json", ...tokenHeader } as HeadersInit,
                body: JSON.stringify(destination),
            });
            console.log(token);
            console.log(destination);
            if (!response.ok) {
                console.error("Error in the response:", response.status);
                return undefined;
            }

            const player = await response.json();
            console.log("Player:", player);
            return player;

        } catch (err) {
            console.error("Error in the request:", err);
            return undefined;
        }
    };
    //------------------------------------------------------------------------------------//


    return (
        <GameService.Provider
            value={{
                getShips,
                createPlayer,
                getPlayer,
                deletePlayer,
                moveTo
            }}
        >
            {children}
        </GameService.Provider>
    );
}

export const useService = () => useContext(GameService);