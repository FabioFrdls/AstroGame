import { useState } from "react";
import { useGmContext } from "../context/GameContext";
import { useService } from "../services/GameService";
import { useEffect } from "react";
import type { Ship, Vector, Player } from "../model/objects";
import { printVector, printPlayer, NavigationInterface, ShowInfo } from "../GameLogic";


function GameScreen() {

    const { getPlayer, deletePlayer } = useService();
    const [player, setPlayer] = useState<Player | null | undefined>(undefined);
    const [deleted, setDeleted] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const result = await getPlayer();
            setPlayer(result);
        })();
    }, []);

    useEffect(() => {
        if (deleted == true) {
            setPlayer(null);
            setDeleted(false);
        }

    });

    /* useEffect(() => {
 
     })*/

    const {
        activeUI,
        step,
        name,
        surname,
        ships,
        currentScreen,
        setActiveUI,
        setName,
        setSurname,
        setShip,
        handleNext,
        setCurrentScreen
    } = useGmContext();

    type Location = "start" | "ship";
    const backgrounds: Record<Location, string> = {
        start: "/art/start.png",
        ship: "/art/ship.png",
    };


    const handlePause = () => setCurrentScreen("pause");
    const handleOptions = () => setCurrentScreen("options");
    const handleResume = () => setCurrentScreen("game");
    const handleNavigation = () => setActiveUI("navigation");
    const handleInfo = () => setActiveUI("info");
    const handleBack = () => setActiveUI("none");
    const handleDelete = async (): Promise<void> => {
        deletePlayer();
        setDeleted(true);
    }


    return (
        <div>
            {currentScreen === "game" && (
                <div>
                    {player === undefined ? (
                        <p>Ops! Some problems occurred</p>
                    ) : (<>
                        {player === null ? (
                            <div style={{ position: "relative", width: "800px", margin: "0 auto" }}>
                                {/* Background */}
                                <img src={backgrounds["start"]} alt={"start"} width="800" />
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
                                                                key !== "id" && (
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

                        ) : (<div>
                            <img src={backgrounds["ship"]} alt={"ship"} width="800" />
                            {printPlayer(player)}
                            {activeUI === "none" && (
                                <>
                                    <button onClick={handleInfo}>Info</button>
                                    <button onClick={handleNavigation}>Navigation</button>
                                </>
                            )}

                            {activeUI === "navigation" && (
                                <NavigationInterface player={player} onBack={handleBack} />
                            )}

                            {activeUI === "info" && (
                                <ShowInfo player={player} onBack={handleBack} />
                            )}
                        </div>)}
                    </>)}

                    <button onClick={handlePause}>Pause</button>
                    <button onClick={handleOptions}>Options</button>
                </div>
            )}

            {currentScreen === "pause" && (
                <div>
                    <p>Pause</p>;
                    <button onClick={handleResume}>Resume</button>
                    <button onClick={handleOptions}>Options</button>
                </div>
            )}

            {currentScreen === "options" && (
                <div>
                    <div>
                        <p>Options</p>
                        <button onClick={handleDelete}>Delete Player</button>
                        <button>Exit</button>
                    </div>
                    <button onClick={handleResume}>Back</button>
                </div>
            )}
        </div>
    );
}



export default GameScreen;
