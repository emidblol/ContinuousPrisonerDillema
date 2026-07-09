import { algorithm as titForTatAlgorithm } from './titForTat.js';
import { algorithm as trumpAlgorithm } from './EscalatoryAlgorithm.js';
import { algorithm as smartAlgorithm } from './SmartAlgorithm.js';
import { algorithm as europeanUnionAlgorithm } from './EuropeanUnionAlgorithm.js';
import { calculatePayoff } from './CPD.js';
// const fs = require('fs');

/**
 * @typedef {'titForTat'|'smart'|'trump'|'europeanUnion'} AlgorithmName
 */

/**
 * @typedef {Object} response
 * @property {Number[]} player1Actions - The player's action for the current round (0 for defect, 1 for cooperate).
 * @property {Number[]} player2Actions - The opponent's action for the current round (0 for defect, 1 for cooperate).
 * @property {Number[]} player1StateLevels - The player's state levels for the current round.
 * @property {Number[]} player2StateLevels - The opponent's state levels for the current round.
 * @property {Number[]} player1Scores - The player's scores for the current round.
 * @property {Number[]} player2Scores - The opponent's scores for the current round.
 * @property {String} csvContent - The CSV content of the simulation results.
 */
/**
 * 
 * @param {Number} BaseAnger Base anger level
 * @param {Number} rounds amount of rounds
 * @param {Number} cost Cost of cooperating
 * @param {Number} maxBenefit Maximum benefit from cooperating
 * @param {Boolean} csvFormat Returns extra data in CSV format if true, otherwise returns JSON format
 * @param {AlgorithmName} algorithm1 The name of the first algorithm to use
 * @param {AlgorithmName} algorithm2 The name of the second algorithm to use
 * @returns {response} The results of the simulation, including actions, state levels, and scores for both players
 */
function runSimulation(BaseAnger, rounds, cost, maxBenefit, csvFormat, algorithm1, algorithm2) {
    let state1 = {}
    let state2 = {}
    switch (algorithm1) {
        case 'smart':
            state1 = { exploit: 0 };
            break;
        case 'trump':
            state1 = { anger: BaseAnger };
            break;
        default: 
            state1 = {};
            break;
    }
    switch (algorithm2) {
        case 'smart':
            state2 = { exploit: 0 };
            break;
        case 'trump':
            state2 = { anger: BaseAnger };
            break;
        default:
            state2 = {};
            break;
    }
    let player1Score = 0; // Score for player
    let player2Score = 0; // Score for opponent
    let player1PreviousAction = undefined; // Previous action of player 1
    let player2PreviousAction = undefined; // Previous action of player 2

    let player1Actions = []; // Store player 1 actions for analysis
    let player2Actions = []; // Store player 2 actions for analysis
    let player1StateLevels = []; // Store player 1 state levels for analysis
    let player2StateLevels = []; // Store player 2 state levels for analysis
    let player1Scores = []; // Store player 1 scores for analysis
    let player2Scores = []; // Store player 2 payoffs for analysis

    for (let i = 0; i < rounds; i++) {
        // Default settings
        let strat1 = smartAlgorithm(player1PreviousAction, player2PreviousAction, state1);
        let strat2 = trumpAlgorithm(player2PreviousAction, player1PreviousAction, state2);
        switch (algorithm1) {
            case 'titForTat':
                strat1 = titForTatAlgorithm(player1PreviousAction, player2PreviousAction, state1);
                break;
            case 'smart':
                strat1 = smartAlgorithm(player1PreviousAction, player2PreviousAction, state1);
                break;
            case 'trump':
                strat1 = trumpAlgorithm(player1PreviousAction, player2PreviousAction, state1);
                break;
            case 'europeanUnion':
                strat1 = europeanUnionAlgorithm(player1PreviousAction, player2PreviousAction, state1);
                break;
            default:
                strat1 = smartAlgorithm(player1PreviousAction, player2PreviousAction, state1);
                break;
        }
        switch (algorithm2) {
            case 'titForTat':
                strat2 = titForTatAlgorithm(player2PreviousAction, player1PreviousAction, state2);
                break;
            case 'smart':
                strat2 = smartAlgorithm(player2PreviousAction, player1PreviousAction, state2);
                break;
            case 'trump':
                strat2 = trumpAlgorithm(player2PreviousAction, player1PreviousAction, state2);
                break;
            case 'europeanUnion':
                strat2 = europeanUnionAlgorithm(player2PreviousAction, player1PreviousAction, state2);
                break;
            default:
                strat2 = smartAlgorithm(player2PreviousAction, player1PreviousAction, state2);
                break;
        }

        let payoff1 = calculatePayoff(strat1.action, strat2.action, maxBenefit, cost);
        let payoff2 = calculatePayoff(strat2.action, strat1.action, maxBenefit, cost);

        player1Score += payoff1;
        player2Score += payoff2;

        player1PreviousAction = strat1.action;
        player2PreviousAction = strat2.action;
        state1 = strat1.state;
        state2 = strat2.state;

        player1Actions.push(strat1.action);
        player2Actions.push(strat2.action);
        switch (algorithm1) {
            case 'titForTat':
                player1StateLevels.push(-1);
                break;
            case 'smart':
                player1StateLevels.push(strat1.state.exploit);
                break;
            case 'trump':
                player1StateLevels.push(strat1.state.anger);
                break;
            default:
                player1StateLevels.push(-1);
                break;
        }
        switch (algorithm2) {
            case 'titForTat':
                player2StateLevels.push(-1);
                break;
            case 'smart':
                player2StateLevels.push(strat2.state.exploit);
                break;
            case 'trump':
                player2StateLevels.push(strat2.state.anger);
                break;
            default:
                player2StateLevels.push(-1);
                break;
        }
        player1Scores.push(player1Score);
        player2Scores.push(player2Score);
    }
    let csvContent = "";
    if (csvFormat) {
        csvContent = "Round;Player 1 Action;Player 2 Action;Player 1 State Level;Player 2 State Level;Player 1 Score;Player 2 Score\n";
        for (let i = 0; i < rounds; i++) {
            csvContent += `${i + 1};${player1Actions[i]};${player2Actions[i]};${player1StateLevels[i]};${player2StateLevels[i]};${player1Scores[i]};${player2Scores[i]}\n`;
        }
    }
    console.log(rounds);
    const jsonContent = {
        player1Actions: player1Actions,
        player2Actions: player2Actions,
        player1StateLevels: player1StateLevels,
        player2StateLevels: player2StateLevels,
        player1Scores: player1Scores,
        player2Scores: player2Scores,
        csvContent: csvContent
    };
    return jsonContent;
}

export { runSimulation };