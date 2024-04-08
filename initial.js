const wrestlers = [
  {
    "name": "Wrestler A",
    "health": 100,
    "moves": [
      { "name": "Move A", "damage": 45, "type": "signature" },
      { "name": "Move B", "damage": 20, "type": "signature" },
      { "name": "Finishing Move", "damage": 100, "type": "finisher"}
    ]
  },
  {
    "name": "Wrestler B",
    "health": 100,
    "moves": [
      { "name": "Move C", "damage": 45, "type": "signature" },
      { "name": "Move D", "damage": 20, "type": "signature" },
      { "name": "Finishing Move", "damage": 100, "type": "finisher"}
    ]
  },
  {
    "name": "Wrestler C",
    "health": 100,
    "moves": [
      { "name": "Move E", "damage": 45, "type": "signature" },
      { "name": "Move F", "damage": 20, "type": "signature" },
      { "name": "Finishing Move", "damage": 100, "type": "finisher"}
    ]
  },
  {
    "name": "Wrestler D",
    "health": 100,
    "moves": [
      { "name": "Move G", "damage": 45, "type": "signature" },
      { "name": "Move H", "damage": 20, "type": "signature" },
      { "name": "Finishing Move", "damage": 100, "type": "finisher"}
    ]
  }
];

/**
  * @param {any[]} matches
  */
function processMatches(matches, matchNum = 1) {
  // If processing the big array, process the sub-arrays first
  let wrestlerA = Array.isArray(matches[0]) ? processMatches(matches[0], matchNum++) : matches[0];
  let wrestlerB = Array.isArray(matches[1]) ? processMatches(matches[1], matchNum++) : matches[1];
  if (!wrestlerB) return wrestlerA;

  console.log(`Match ${matchNum}: ${wrestlerA.name} vs ${wrestlerB.name}`);
  return processMatch([wrestlerA, wrestlerB]);
}

/**
  * @param {any[]} match 
  */
function processMatch(match) {
  let currentWrestlerNum = 0;
  while (true) {
    let currentWrestler = match[currentWrestlerNum];
    let opponentWrestler = match[(currentWrestlerNum + 1) % 2];

    // Select a random move
    let selectedMove = currentWrestler.moves[Math.floor(Math.random() * currentWrestler.moves.length)];

    // Use move
    if (selectedMove.type === "finisher" && currentWrestler.health >= 45 && Math.random() < 0.5) {
      // Move failed
      console.log(`${currentWrestler.name} failed to perform ${selectedMove.name} on ${opponentWrestler.name}. ${opponentWrestler.name}'s health: ${opponentWrestler.health}.`)
    } else {
      // Move succeeded
      opponentWrestler.health -= selectedMove.damage;
      console.log(`${currentWrestler.name} performs ${selectedMove.name} on ${opponentWrestler.name}. ${opponentWrestler.name}'s health: ${opponentWrestler.health}.`)
    }

    // If move defeats the opponent
    if (opponentWrestler.health <= 0) {
      console.log(`${opponentWrestler.name}'s health is below 0. ${currentWrestler.name} wins!`)
      return currentWrestler;
    }

    // Switch opponent's turn
    currentWrestlerNum = (currentWrestlerNum + 1) % 2;
  }
}

// Make matches
let matches = wrestlers
  .sort(() => Math.random() - 0.5) // Shuffle array
  .reduce((acc, v) => {
    // If the last element is not a complete pair, add to it,
    // otherwise create a new pair
    if (acc[acc.length -1].length < 2) acc[acc.length - 1].push(v)
    else acc.push([v]);
    return acc;
  }, [[]])

let winner = processMatches(matches);
console.log(`\n${winner.name} wins the tournament!`);
