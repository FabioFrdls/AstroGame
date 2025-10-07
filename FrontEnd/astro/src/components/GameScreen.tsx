
import { useState } from "react";
import { useService } from "../services/Service";


type Location = "start" | "ship";

function GameScreen() {

    const [location, setLocation] = useState<Location>("start");
    const backgrounds: Record<Location, string> = {
        start: "/art/start.png",
        ship: "/art/ship.png",
    };

    const { getShips, createPlayer } = useService();
    const [name, setName] = useState("Lino");
    const [surname, setSurname] = useState("Banfi");
    const [ships, setShips] = useState<Ship[] | undefined>(undefined);
    const [ship, setShip] = useState({
        id: 0,
        shipName: "",
        maxFuel: 0,
        maxEquip: 0,
        size: 0
    });

    interface Ship {
        id: number;
        shipName: string;
        maxFuel: number;
        maxEquip: number;
        size: number;
    }

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
                setLocation("ship");
        }
    }

    return (
        <div style={{ position: "relative", width: "800px", margin: "0 auto" }}>
            {/* Background */}
            <img src={backgrounds[location]} alt={location} width="800" />

            {/* Overlay HUD */}
            <div style={{
                position: "absolute", top: 20, right: 20,
                background: "rgba(0,0,0,0.6)", color: "white",
                padding: "10px", borderRadius: "8px"
            }}>
                <p>Fuel: 120</p>
                <p>Crew Morale: 85%</p>
            </div>

            {/* Menu di navigazione */}
            <div style={{
                position: "absolute", bottom: 20, left: "50%",
                transform: "translateX(-50%)"
            }}>
                {step == 0 ? (<>
                    <p>Choose your player name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button type="button" onClick={async () => await handleNext(step)}>Next</button>
                </>) : (<>
                    {step == 1 ? (<>
                        <p>Choose your player surname</p>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        <button type="button" onClick={async () => await handleNext(step)}>Next</button>
                    </>) : (<>
                        {step == 2 ? (<>
                            {ships == undefined || ships.length == 0 ? (
                                <p>No ships to show</p>
                            ) : (<>
                                <p>Choose your ship</p>
                                <ul>
                                    {ships.map(s => (<div key={s.id} className="ship-card">
                                        <ul>
                                            {Object.entries(s).map(([key, value]) => (
                                                key !== "id" && ( // escludi campi che non vuoi mostrare
                                                    <li key={`${s.id}-${key}`}>
                                                        <strong>{key}:</strong> {String(value)}
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                        <button type="button" onClick={async () => { setShip(s); await handleNext(step) }}>Next</button>
                                    </div>

                                    ))}
                                </ul>

                            </>)}
                        </>) : (<>
                            <p>Create Player and start!</p>
                            <button type="button" onClick={async () => await handleNext(step)}>Next</button>
                        </>)}

                    </>)}
                </>)}

            </div>
        </div>
    );
};

export default GameScreen;
