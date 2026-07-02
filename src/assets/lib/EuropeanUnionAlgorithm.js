// Basic Tit for Tat strategy implementation for the Continuous Prisoner's Dilemma (CPD). The strategy starts with cooperation and then mimics the opponent's previous move. If the opponent cooperates, it continues to cooperate; if the opponent defects, it defects in the next round.
/**
 * @typedef {Object} state
 * @property {number} [exploit] - The player's current level of exploitation, which influences their actions in the game.
 * @property {number} [anger] - The player's current level of anger, which influences their actions in the game.
 */

/**
 * @typedef {Object} Response
 * @property {number} action - The player's action for the current round (0 for defect, 1 for cooperate).
 * @property {state} state - The updated state of the algorithm.
 */


/**
 * Tit for Tat strategy for the Continuous Prisoner's Dilemma (CPD).
 * @param {number|undefined} previousPlayerMe - The player's previous action (0 for defect, 1 for cooperate).
 * @param {number|undefined} previousPlayerOpponent - The opponent's previous action (0 for defect, 1 for cooperate).
 * @param {state} state - The state of the algorithm, which can be used to store additional information if needed.
 * @returns {Response} - The player's action for the current round (0 for defect, 1 for cooperate).
 */
function algorithm(previousPlayerMe, previousPlayerOpponent, state) {
    // If it's the first round, cooperate
    if (previousPlayerMe === undefined || previousPlayerOpponent === undefined) {
        return { action: 1, state }; // Cooperate
    }

    // Mimic the opponent's previous action
    return { action: Math.max(0, Math.min(1, previousPlayerOpponent+.5)), state };
}

// @ts-ignore
export { algorithm };