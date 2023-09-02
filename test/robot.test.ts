import { createSimulation, createRobot } from "../src/robots";

describe('Create Robot', () => {
    const simulation = createRobot();
    it('should create a robot with 0 presents delivered', async () => {
        expect(simulation.presentsDelivered).toEqual(0);
    })
})

describe('Create Simulation', () => {
    const simulation = createSimulation(10, '<<>');
    it('should create a simulation with 10 robots', async () => {
        expect(simulation.robots.length).toEqual(10);
    }
    )
})