# Interview Excercise 

## Problem Description

The excercise can be found at: https://weeverapps.github.io/interviews/robot.html


## Solution

The function: `createSimulation` will create a new simulation which takes the number of robots (default to 1) and a sequence of movements (ex. "^^VV<>") as arguments. 

It will start all robots off at the coordinates (0,0). Then you may pass the created simulation into the following functions:
-  `stepOneTurn` to step a single step in the movement sequence
-  `runFullSimulation` to run the whole sequence
-  `printCurrentPositionsOfRobots` to print the current positions of robots to console and also return an object containing the name, x and y coordinates of each robot
-  `queryHousesByNumPresents` to return how many houses have `numPresents` amount of presents or more

## Running the solution

 **To setup:**

 ```npm install```

 **To run tests:**

 ```npm run test```

 **To run a sample simulation and see logged results:**

 1. Uncomment the [final block of comments](https://github.com/marwaybs/robots/blob/828a2a376596ad5d95193256100ef486b460bf26/src/robots.ts#L61-L67) in `src/robots.ts` which contain the following:

 ```
// Runs the simulation with 3 robots with the sequence ^^VV<>
// prints the starting position and the final position of the robots
let simulation = createSimulation(3, "^^VV<>");
printCurrentPositionsOfRobots(simulation);
simulation = runFullSimulation(simulation);
printCurrentPositionsOfRobots(simulation);
// prints the number of houses with at least 1 present
console.log("houses with more than 1 present: " + queryHousesByNumPresents(simulation, 1));
```

2. Run `npm run start`

## Stack
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) - For testing
- [falso](https://github.com/ngneat/falso) - To generate fake names