import Vector from './Vector';

class Player {
    shipId: number;
    fuel: number;
    position: Vector;

    constructor(shipId: number, fuel: number, position: Vector) {
        this.shipId = shipId;
        this.fuel = fuel;
        this.position = position;
    }

}

export default Player;