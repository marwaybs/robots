export interface Robot {
    x: number;
    y: number;
    presentsDelivered: number;
    name: string;
}

export interface House {
    x: number;
    y: number;
    numPresents: number;
}

export interface Simulation {
    houses: House[];
    robots: Robot[];
    numRobots: number;
    sequence: string;
    sequenceIndex: number;
}