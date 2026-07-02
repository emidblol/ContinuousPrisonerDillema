/*A Continuous Prisoner's Dilemma (CPD) algorithm made to mimic President Trump's behavior in a game-theoretic context. 
This algorithm has an extra parameter called "anger", which is basically the ego of the player. 
The more defecting the opponent, the more anger is generated. The more anger, the more likely the player is to defect in future rounds. 
The algorithm also has a randomness factor, to simulate outbursts. In case of a lot of cooperation from the opponent, the anger level decreases massively because it strokes the player's ego.*/

/**
 * @typedef {Object} response
 * @property {number} action - The player's action for the current round (0 for defect, 1 for cooperate).
 * @property {state} state - The state of the algorithm, which can be used to store additional information if needed.
 */

/**
 * @typedef {Object} state
 * @property {number} [anger] - The player's current level of anger, which influences their actions in the game.
 * @property {number} [exploit] - The player's current level of exploitation, which influences their actions in the game.
 */

/**
 * 
 * @param {number} anger The player's current level of anger.
 * @returns {number} The player's action for the current round (0 for defect, 1 for cooperate).
 */
function calculateResponse(anger) {
    // Determine the player's action based on anger and randomness
    let action;
    const randomFactor = Math.random();

    if (anger > 0.5 || randomFactor < 0.1) {
        action = anger-0.5; // Defect
    } else {
        action = anger+0.25; // Cooperate
    }

    return Math.max(0, Math.min(1, action));
}

/**
 * Simulates President Trump's behavior in a Continuous Prisoner's Dilemma.
 * @param {number|undefined} previousPlayerMe - The player's previous action (0 for defect, 1 for cooperate).
 * @param {number|undefined} previousPlayerOpponent - The opponent's previous action (0 for defect, 1 for cooperate).
 * @param {state} state - The state of the algorithm, which can be used to store additional information if needed.
 * @returns {response} - The player's action for the current round (0 for defect, 1 for cooperate).
 */
function algorithm(previousPlayerMe, previousPlayerOpponent, state) {

    if (state.anger === undefined) {
        state.anger = 0.25; // Initial anger level
    }

    if (previousPlayerMe === undefined || previousPlayerOpponent === undefined) {
        // If it's the first round, don't do anything and set anger to 0.25
        return { action: calculateResponse(state.anger), state };
    }
    // Calculate the new anger level based on the opponent's previous action
    state.anger += (previousPlayerOpponent - previousPlayerMe) * 0.1; // Increase anger if opponent defects, decrease if they cooperate

    // Ensure anger stays within bounds [0, 1]
    state.anger = Math.max(0, Math.min(1, state.anger));

    // Determine the player's action based on anger and randomness
    let action = calculateResponse(state.anger);

    return { action:action, state };
}

export { algorithm };