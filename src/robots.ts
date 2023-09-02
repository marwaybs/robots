import { Robot, House, Simulation } from './interfaces';
import { randFullName } from '@ngneat/falso';


export const createRobot = (): Robot => {
    return {
        name: randFullName(),
        x: 0,
        y: 0,
        presentsDelivered: 0,
    }
}

export const createSimulation = (numRobots: number, sequence: string): Simulation => {
    const robots = Array.from(Array(numRobots), () => createRobot());
    return {
        robots,
        numRobots: numRobots,
        sequence,
        sequenceIndex: 0,
        houses: [],
    }
};


export const updatePosition = (robot: Robot, direction: string): Robot => {
    switch (direction) {
        case '^':
            robot.y++;
            break;
        case 'v':
            robot.y--;
            break;
        case '>':
            robot.x++;
            break;
        case '<':
            robot.x--;
            break;
        default:
            console.log('Invalid direction')
            break;
    }
    return robot;
}

export const updateHouse = (x: number, y: number, houses: House[]): House[] => {
    const house = houses.find(house => house.x === x && house.y === y)
    if (house) {
        house.numPresents++;
    } else {
        houses.push({
            x: x,
            y: y,
            numPresents: 1,
        })
    }
    return houses;
}

export const checkIfUniquePosition = (robots: Robot[], robotIndex: number): boolean => {
    const robot = robots[robotIndex];

    for (let i = 0; i < robots.length; i++) {
        if (i === robotIndex) {
            continue;
        }
        if (robots[i].x === robot.x && robots[i].y === robot.y) {
            return false;
        }
    }

    return true;
}


export const stepOneTurn = (simulation: Simulation): Simulation => {
    const robotIndex = simulation.sequenceIndex % simulation.numRobots

    // update the current robot's position in the simulation
    simulation.robots[robotIndex] = updatePosition(
        simulation.robots[robotIndex],
        simulation.sequence[simulation.sequenceIndex]
    );

    if (checkIfUniquePosition(simulation.robots, robotIndex)) {
        simulation.robots[robotIndex].presentsDelivered++;
        const currentRobot = simulation.robots[robotIndex];
        simulation.houses = updateHouse(currentRobot.x, currentRobot.y, simulation.houses);
    }
    simulation.sequenceIndex++;
    return simulation;
}

