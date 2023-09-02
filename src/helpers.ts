import { Robot, House } from './interfaces';
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
        });
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
