import { useService } from "./services/GameService";
import type { Ship, Vector, Player } from "./model/objects";
import { vEqual } from "./model/objects";
import { useEffect, useState, useMemo } from "react";



export const printVector = (vector: Vector) => {
  return <span>{vector.x}, {vector.y}, {vector.z}</span>
}

export const printPlayer = (player: Player) => {  // return the essentials infos
  return <span>{player.name} | {player.ship.name} | {player.ship.maxFuel}/{player.fuel} | {printVector(player.position)}</span>
}

interface Props {
  player: Player,
  onBack: () => void;
}

interface Pair {
  left: Player;
  right: boolean;
}

export const ShowInfo = ({ player, onBack }: Props) => { // return all the player known infos
  return <div>
    {/*player info*/}
    {/*ship info*/}
    {/*equip info*/}
    {/*messages*/}
    <button onClick={onBack}>Back</button>
  </div>
}


export const NavigationInterface = ({ player, onBack }: Props) => {
  let position = player.position;
  const [destination, setDestination] = useState<Vector>(position);
  const [message, setMessage] = useState<string>("");
  const { moveTo } = useService();

  const { distance, fuel } = useMemo(() => {
    const dx = player.position.x - destination.x;
    const dy = player.position.y - destination.y;
    const dz = player.position.z - destination.z;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    return { distance: d, fuel: d / 100 };
  }, [position.x, position.y, position.z, destination.x, destination.y, destination.z]);

  const handleChange = (key: keyof Vector, raw: string) => {
    const n = Number(raw);
    setDestination(prev => ({ ...prev, [key]: Number.isNaN(n) ? 0 : n }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //update the state

    if (vEqual(destination, player.position)) {
      setMessage("You are already at that position.");
      return;
    }
    const response: Pair | undefined = await moveTo(destination);
    if (response === undefined) return
    console.log(response.right);
    console.log(response.left);
    if (response.right) {
      player = response.left;
      setMessage("You moved to a new position!");
      return;
    }
    setMessage("Error: You need more fuel!");
    return;

  };

  return (
    <div>
      <p>
        Your position: | {player.position.x} | {player.position.y} | {player.position.z} |
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          X:
          <input
            name="x"
            type="number"
            value={destination.x}
            onChange={(e) => handleChange("x", e.target.value)}
          />
        </label>
        <label>
          Y:
          <input
            name="y"
            type="number"
            value={destination.y}
            onChange={(e) => handleChange("y", e.target.value)}
          />
        </label>
        <label>
          Z:
          <input
            name="z"
            type="number"
            value={destination.z}
            onChange={(e) => handleChange("z", e.target.value)}
          />
        </label>

        <button type="submit">Go!</button>
        <p>Distance: {distance}</p>
        <p>Fuel required: {fuel}</p>
        <p>{message}</p>
      </form>

      <button onClick={onBack}>Back</button>
    </div>
  );
};

