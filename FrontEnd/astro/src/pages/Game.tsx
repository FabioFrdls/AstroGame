import { useState } from "react";
import GameScreen from "../components/GameScreen";
import OptionsScreen from "../components/OptionsScreen";
import PauseScreen from "../components/PauseScreen";

function Game() {
    type Screen = "game" | "pause" | "options";
    const [currentScreen, setCurrentScreen] = useState<Screen>("game");

    const handlePause = () => setCurrentScreen("pause");
    const handleOptions = () => setCurrentScreen("options");
    const handleResume = () => setCurrentScreen("game");

    return (
        <div>
            {currentScreen === "game" && (
                <div>
                    <GameScreen />
                    <button onClick={handlePause}>Pause</button>
                    <button onClick={handleOptions}>Options</button>
                </div>
            )}

            {currentScreen === "pause" && (
                <div>
                    <PauseScreen />
                    <button onClick={handleResume}>Resume</button>
                    <button onClick={handleOptions}>Options</button>
                </div>
            )}

            {currentScreen === "options" && (
                <div>
                    <OptionsScreen />
                    <button onClick={handleResume}>Back</button>
                </div>
            )}
        </div>
    );
}



export default Game;
