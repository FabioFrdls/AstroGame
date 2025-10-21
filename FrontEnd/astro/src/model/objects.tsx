export interface Ship {
    id: number;
    name: string;
    maxFuel: number;
    maxEquip: number;
    size: number;
}

export interface Vector {
    x: number;
    y: number;
    z: number;
}

export const vEqual = (a: Vector, b: Vector) =>
    a.x === b.x && a.y === b.y && a.z === b.z;

export interface Player {
    id: number;
    ship: Ship;
    name: string;
    fuel: number;
    position: Vector;
}

