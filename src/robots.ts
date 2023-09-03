import { Simulation } from './interfaces';
import { createRobot, updatePosition, updateHouse, checkIfUniquePosition } from './helpers';

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
    // sequenceIndex is incremented in stepOneTurn by one for each function call
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
// console.log("houses with more than 1 present: " + queryHousesByNumPresents(simulation, 1));
