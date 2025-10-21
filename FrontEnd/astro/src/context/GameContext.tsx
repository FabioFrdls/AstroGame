import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useService } from "../services/GameService";
import { useState } from "react";
import type { Ship } from "../model/objects";

type Location = "start" | "ship";
type ActiveUI = "none" | "navigation" | "info" | "inventory";
type Screen = "game" | "pause" | "options";

interface GmContextType {
    activeUI: ActiveUI;
    step: number;
    name: string;
    surname: string;
    ships: Ship[] | undefined;
    ship: Ship | null;
    location: Location;
    currentScreen: string;
    setActiveUI: (a: ActiveUI) => void;
    setName: (n: string) => void;
    setSurname: (s: string) => void;
    setShip: (ship: Ship) => void;
    setLocation: (loc: Location) => void;
    handleNext: (num: number) => Promise<void>;
    setCurrentScreen: (screen: Screen) => void;
}

const GameContext = createContext<GmContextType | null>(null);

interface GameContProviderProps {
    children: ReactNode;
}



export const GameContProvider = ({ children }: GameContProviderProps) => {

    const [currentScreen, setCurrentScreen] = useState<Screen>("game");
    const [activeUI, setActiveUI] = useState<ActiveUI>("none");
    const [location, setLocation] = useState<Location>("start");
    const { getShips, createPlayer } = useService();
    const [name, setName] = useState("Lino");
    const [surname, setSurname] = useState("Banfi");
    const [ships, setShips] = useState<Ship[] | undefined>(undefined);
    const [ship, setShip] = useState({
        id: 0,
        name: "",
        maxFuel: 0,
        maxEquip: 0,
        size: 0
    });


    const [step, setStep] = useState(0);

    const handleNext = async (num: number): Promise<void> => {
        switch (num) {
            case 0:
                setStep(1);
                break;
            case 1:
                const result = await getShips();
                setShips(result);
                setStep(2);
                break;
            case 2:
                setStep(3);
                break
            case 3:
                createPlayer(name + ' ' + surname, ship);
                setStep(4);     // to complete
                setLocation("ship");
        }
    }


    return (
        <GameContext.Provider
            value={{
                activeUI,
                step,
                name,
                surname,
                ships,
                ship,
                location,
                currentScreen,
                setActiveUI,
                setName,
                setSurname,
                setShip,
                setLocation,
                handleNext,
                setCurrentScreen
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export const useGmContext = (): GmContextType => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGmContext must be used within a GameContProvider");
    return ctx;
};