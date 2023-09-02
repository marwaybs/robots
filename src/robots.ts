import { Robot, House, Simulation } from './interfaces';
import { randFullName } from '@ngneat/falso';


export const createSimulation = (numRobos: number, sequence: string): Simulation => {
    const robots = Array.from(Array(numRobos), () => createRobot());
    return {
        robots,
        sequence,
        sequenceIndex: 0,
        houses: [],
    }
};

export const createRobot = (): Robot => {
    return {
        name: randFullName(),
        x: 0,
        y: 0,
        presentsDelivered: 0,
    }
}