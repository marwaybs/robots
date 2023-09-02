import { Robot, House, Simulation } from './interfaces';
import { randFullName } from '@ngneat/falso';


// Returns a robot object containing a random name, and starting position of (0,0)
export const createRobot = (): Robot => {
    return {
        name: randFullName(),
        x: 0,
        y: 0,
        presentsDelivered: 0,
    }
}

// Creates a new simulation that creates a number of robots starting at (0,0), the passed in sequence, the sequence index at 0, and an empty list of houses
export const createSimulation = (numRobots: number = 1, sequence: string): Simulation => {
    const robots = Array.from(Array(numRobots), () => createRobot());
    return {
        robots,
        numRobots: numRobots,
        sequence,
        sequenceIndex: 0,
        houses: [],
    }
};

// Updates the position of a passed in robot based on the direction provided
export const updatePosition = (robot: Robot, direction: string): Robot => {
    switch (direction) {
        case '^':
            robot.y++;
            break;
        case 'V':
            robot.y--;
            break;
        case '>':
            robot.x++;
            break;
        case '<':
            robot.x--;
            break;
        default:
            throw new Error('Invalid direction provided in sequence: ' + direction);
            break;
    }
    return robot;
}

// Checks if the house exists in the list of houses, if it does, it increments the number of presents, if not, it creates a new house with 1 present
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

// Checks if the robot at the passed in robotIndex is in a unique position compared to all other robots
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

// Steps one turn in the simulation
// This updates the next robot's position with the next movement in the sequence
// It also checks if the robot is in a unique position and delivers a present if so
export const stepOneTurn = (simulation: Simulation): Simulation => {
    if (simulation.sequenceIndex >= simulation.sequence.length) {
        throw new Error("End of sequence reached. Simulation is complete.");
    }
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

// repeatedly calls stepOneTurn until the end of the sequence is reached
export const runFullSimulation = (simulation: Simulation): Simulation => {
    while (simulation.sequenceIndex < simulation.sequence.length) {
        simulation = stepOneTurn(simulation);
    }
    return simulation;
}

// returns an array of robots and their positions
// also prints a table of robots and their positions
export const printCurrentPositionsOfRobots = (simulation: Simulation) => {
    // Unclear what format to return the values, chose to print robots in table to console and return list of robots with coords
    console.table(simulation.robots);
    return simulation.robots.map(robot => { return { name: robot.name, x: robot.x, y: robot.y } });
}

// returns the number of houses that have at least numPresents presents
export const queryHousesByNumPresents = (simulation: Simulation, numPresents: number): number => {
    return simulation.houses.filter(house => house.numPresents >= numPresents).length;
}

// // Runs the simulation with 3 robots with the sequence ^^VV<>
// // prints the starting position and the final position of the robots
// let simulation = createSimulation(3, "^^VV<>");
// printCurrentPositionsOfRobots(simulation);
// simulation = runFullSimulation(simulation);
// printCurrentPositionsOfRobots(simulation);
