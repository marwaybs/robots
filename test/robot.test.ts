import { createSimulation, createRobot, updatePosition, updateHouse, checkIfUniquePosition, stepOneTurn, runFullSimulation, printCurrentPositionsOfRobots, queryHousesByNumPresents } from "../src/robots";

describe('Create Robots', () => {
    const simulation = createRobot();
    it('should create a robot with 0 presents delivered', async () => {
        expect(simulation.presentsDelivered).toEqual(0);
    })
})

describe('Create Simulation', () => {
    const simulation = createSimulation(10, '^^VV<>');
    it('should create a simulation with 10 robots', async () => {
        expect(simulation.robots.length).toEqual(10);
    }
    )
})

describe('Update Position', () => {
    const robot = createRobot();
    it('should move the robot up', async () => {
        expect(updatePosition(robot, '^').y).toEqual(1);
    })
    it('should move the robot down', async () => {
        expect(updatePosition(robot, 'V').y).toEqual(0);
    })
    it('should move the robot right', async () => {
        expect(updatePosition(robot, '>').x).toEqual(1);
    })
    it('should move the robot left', async () => {
        expect(updatePosition(robot, '<').x).toEqual(0);
    })
    it('should not move the robot', async () => {
        expect(updatePosition(robot, 'x').x).toEqual(0);
    })
})

describe('Update House', () => {
    const houses = updateHouse(2, 2, []);
    it('should create a new house', async () => {
        expect(houses.length).toEqual(1);
    })
    it('should increase the number of presents', async () => {
        expect(updateHouse(2, 2, houses)[0].numPresents).toEqual(2);
    })
})

describe('Check if unique position', () => {
    const samePositionRobots = [{
        name: 'Tom',
        presentsDelivered: 0,
        x: 2,
        y: 1,
    },
    //different from first robot
    {
        name: 'Joelle',
        presentsDelivered: 0,
        x: 2,
        y: 2,
    },
    //same as first robot
    {
        name: 'Dudley',
        presentsDelivered: 0,
        x: 2,
        y: 1,
    }]

    const differentPositionRobots = [{
        name: 'Tom',
        presentsDelivered: 0,
        x: 2,
        y: 1,
    },
    {
        name: 'Joelle',
        presentsDelivered: 0,
        x: 2,
        y: 2,
    },
    {
        name: 'Dudley',
        presentsDelivered: 0,
        x: 3,
        y: 1,
    }]

    it('should return false if the position is not unique', async () => {
        expect(checkIfUniquePosition(samePositionRobots, 0)).toEqual(false);
    })
    it('should return true if the position is unique', async () => {
        expect(checkIfUniquePosition(differentPositionRobots, 0)).toEqual(true);
    })
})

describe('Step one turn', () => {
    const simulation = createSimulation(2, '^^VV<>');
    const newSimulation = stepOneTurn(simulation);
    it('should increase the presents delivered by 1', async () => {
        expect(newSimulation.robots[0].presentsDelivered).toEqual(1);
    })
    it('should increase the sequence index by 1', async () => {
        expect(newSimulation.sequenceIndex).toEqual(1);
    })
    it('should move the robot', async () => {
        expect(newSimulation.robots[0].y).toEqual(1);
    })
    it('should not move the other robot', async () => {
        expect(newSimulation.robots[1].x).toEqual(0);
    })
    it('should throw error if end of sequence', async () => {
        // 
    })
});

describe('Run full simulation', () => {
    let simulation = createSimulation(3, "^^VV<>");
    simulation = runFullSimulation(simulation)
    it('Should have correct state at the end of simulation', async () => {
        expect(simulation.robots[0].presentsDelivered).toEqual(2);
        expect(simulation.robots[1].presentsDelivered).toEqual(1);
        expect(simulation.robots[2].presentsDelivered).toEqual(2);
        expect(simulation.houses.length).toEqual(5);
        expect(simulation.robots[0].x).toEqual(0);
        expect(simulation.robots[0].y).toEqual(0);
        expect(simulation.robots[1].x).toEqual(-1);
        expect(simulation.robots[1].y).toEqual(1);
        expect(simulation.robots[2].x).toEqual(1);
        expect(simulation.robots[2].y).toEqual(-1);
    })
})

describe('Query houses by number of presents', () => {
    let simulation = createSimulation(10, "^^VV<>^^VV<>^^VV<>^^VV<>^^VV<>^^VV<>^^VV<>^^VV<>^^VV<>");
    simulation = runFullSimulation(simulation)
    it('Should return number of houses that have equal to or more than inputted number of presents', async () => {
        expect(queryHousesByNumPresents(simulation, 1)).toEqual(15);
        expect(queryHousesByNumPresents(simulation, 2)).toEqual(8);
        expect(queryHousesByNumPresents(simulation, 3)).toEqual(2);
    })
})