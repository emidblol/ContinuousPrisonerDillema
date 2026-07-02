//Continuous Prisoner's Dilemma. 0 is fully defect, 1 is fully cooperate. Payoff is calculated as follows:

/**
 * Calculates the payoff for a player in a Continuous Prisoner's Dilemma (CPD) game.
 * @param {number} playerMe - The player's action (0 for defect, 1 for cooperate).
 * @param {number} playerOpponent - The opponent's action (0 for defect, 1 for cooperate).
 * @param {number} maxBenefit - The maximum benefit from cooperating.
 * @param {number} cost - The cost of cooperating.
 * @returns {number} - The payoff for the player.
 */
function calculatePayoff(playerMe, playerOpponent, maxBenefit, cost) {
    return (maxBenefit * playerOpponent) - (cost * playerMe);
}

export { calculatePayoff };