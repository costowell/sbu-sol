"use strict";
/* Types */
/* Constants */
const DEFAULT = "\x1B[0m";
const BOLD = "\x1B[1m";
const UNDERLINE = "\x1B[4m";
/* Global Vars */
let matchNum = 1;
/* Functions */
// Processes an N dimensional array of matches structured like a bracket
// (See Match type to see how that might look)
function processMatches(matches) {
    // If processing an array of arrays, process the sub-arrays first
    let wrestlerA = Array.isArray(matches[0]) ? processMatches(matches[0]) : matches[0];
    if (matches.length < 2)
        return wrestlerA;
    let wrestlerB = Array.isArray(matches[1]) ? processMatches(matches[1]) : matches[1];
    console.log(`\n${UNDERLINE}Match ${matchNum++}: ${wrestlerA.name} vs ${wrestlerB.name}${DEFAULT}`);
    let currentWrestlerNum = 0;
    let match = [Object.assign({}, wrestlerA), Object.assign({}, wrestlerB)]; // Deep copy so that we don't change the health for the next match
    while (true) {
        let currentWrestler = match[currentWrestlerNum];
        let opponentWrestler = match[(currentWrestlerNum + 1) % 2];
        // Select a random move
        let selectedMove = currentWrestler.moves[Math.floor(Math.random() * currentWrestler.moves.length)];
        // Use move
        if (selectedMove.type === "finisher" && currentWrestler.health >= 45 && Math.random() < 0.5) {
            // Move failed
            console.log(`${currentWrestler.name} failed to perform ${selectedMove.name} on ${opponentWrestler.name}. ${opponentWrestler.name}'s health: ${opponentWrestler.health}.`);
        }
        else {
            // Move succeeded
            opponentWrestler.health -= selectedMove.damage;
            console.log(`${currentWrestler.name} performs ${selectedMove.name} on ${opponentWrestler.name}. ${opponentWrestler.name}'s health: ${opponentWrestler.health}.`);
        }
        // If move defeats the opponent
        if (opponentWrestler.health <= 0) {
            console.log(`${opponentWrestler.name}'s health is below 0. ${BOLD}${currentWrestler.name} wins!${DEFAULT}`);
            return currentWrestlerNum == 0 ? wrestlerA : wrestlerB; // Returns the unmodified wrestler
        }
        // Switch opponent's turn
        currentWrestlerNum = (currentWrestlerNum + 1) % 2;
    }
}
// Takes an array of 1-4 wrestlers, constructs a bracket, and outputs how the tournament goes
function runTournament(wrestlers) {
    let matches = wrestlers
        .sort(() => Math.random() - 0.5) // Shuffle array
        .reduce((acc, v) => {
        // If the last element is not a complete pair, add to it,
        // otherwise create a new pair
        if (acc[acc.length - 1].length < 2)
            acc[acc.length - 1].push(v);
        else
            acc.push([v]);
        return acc;
    }, [[]]);
    matchNum = 1; // In case of multiple calls to runTournament, reset the match counter
    let winner = processMatches(matches);
    console.log(`\n${BOLD}${winner.name} wins the tournament!${DEFAULT}`);
}
/* Run the solution */
runTournament([
    {
        name: "The Hulk",
        health: 150,
        moves: [
            { name: "Hulk Smash", damage: 70, type: "signature" },
            { name: "Hulk Crush", damage: 150, type: "finisher" }
        ]
    },
    {
        name: "Mario",
        health: 100,
        moves: [
            { name: "Super Jump", damage: 30, type: "signature" },
            { name: "Super Hammer", damage: 70, type: "signature" },
            { name: "Hat Throw", damage: 20, type: "signature" },
            { name: "Incinerate", damage: 150, type: "finisher" }
        ]
    },
    {
        name: "Iron Man",
        health: 150,
        moves: [
            { name: "Power Punch", damage: 45, type: "signature" },
            { name: "Power Blast", damage: 60, type: "signature" },
            { name: "Missiles", damage: 150, type: "finisher" }
        ]
    },
    {
        name: "Imposter from Among Us",
        health: 50,
        moves: [
            { name: "Kill", damage: 150, type: "finisher" },
        ]
    }
]);
