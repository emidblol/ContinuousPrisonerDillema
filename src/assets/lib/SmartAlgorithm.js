/**
 * @typedef {Object} state
 * @property {number} [exploit] - The player's current level of exploitation, which influences their actions in the game.
 * @property {number} [anger] - The player's current level of anger, which influences their actions in the game.
 */

/**
 * @typedef {Object} response
 * @property {number} action - The player's action for the current round (0 for defect, 1 for cooperate).
 * @property {state} state - The state of the algorithm, which can be used to store additional information if needed.
 */

/**
 * Runs a smarter algorithm made to beat the Trump Algorithm
 * @param {number|undefined} previousMe 
 * @param {number|undefined} previousOpponent 
 * @param {state} state 
 * @returns {response} - The player's action for the current round (0 for defect, 1 for cooperate).
 */
function algorithm(previousMe, previousOpponent, state) {

    if (state.exploit === undefined) {
        state.exploit = 0; // Initial exploit level
    }

    if (previousMe === undefined || previousOpponent === undefined) {
        return {
            action: 1,
            state
        };
    }

    let action;

    // Opponent cooperated
    if (previousOpponent > 0.7) {

        // Cooperate most of the time
        if (state.exploit < 3) {
            action = 0.8;
            state.exploit++;
        } else {
            // Small exploitation
            action = 0.6;
            state.exploit = 0;
        }

    } else {

        // Immediate forgiveness
        action = 1.0;
        state.exploit = 0;
    }

    return {
        action,
        state
    };
}

export { algorithm };