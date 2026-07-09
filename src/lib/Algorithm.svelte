<script>
  import { runSimulation } from '../assets/lib/runAlgorithm.js'
    import Chart from './chart.svelte';
  let numRounds = 10;
  let baseAnger = 0.25;
  let cost = 1;
  let benefit = 3;
  let algorithm1 = "titForTat";
  let algorithm2 = "smart";
  let results = {
    player1Actions: [],
    player2Actions: [],
    player1Scores: [],
    player2Scores: [],
    player1StateLevels: [],
    player2StateLevels: [],
    csvContent: ""
  };
  let player1Classes = ""
  let player2Classes = ""
  function handleRunSimulation() {
    console.log("Running simulation with parameters:", {
      numRounds,
      baseAnger,
      cost,
      benefit,
      algorithm1,
      algorithm2,
    });
    results = runSimulation(baseAnger, numRounds, cost, benefit, true, algorithm1, algorithm2);
    if (results.player1Scores[results.player1Scores.length - 1] > results.player2Scores[results.player2Scores.length - 1]) {
      player1Classes = "greenNumBox"
      player2Classes = "redNumBox"
    } else if (results.player1Scores[results.player1Scores.length - 1] < results.player2Scores[results.player2Scores.length - 1]) {
      player1Classes = "redNumBox"
      player2Classes = "greenNumBox"
    } else {
      player1Classes = ""
      player2Classes = ""
    }
    console.log(results);

  }

  function downloadCSV() {
    const blob = new Blob([results.csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    let filename = `simulation_results_${algorithm1}_vs_${algorithm2}_${new Date().toISOString()}.csv`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

Number of Rounds: <input type="number" bind:value={numRounds} min="1" />
Base Anger: <input type="number" bind:value={baseAnger} min="0" max="1" step="0.01" />
Cost: <input type="number" bind:value={cost} min="0" step="0.01" />
Benefit: <input type="number" bind:value={benefit} min="0" step="0.01" />
<div class="grid">
  <div class="dropBoxDiv">
    <select bind:value={algorithm1}>
      <option value="titForTat">Tit for Tat</option>
      <option value="smart">Smart</option>
      <option value="trump">Trump</option>
      <option value="europeanUnion">European Union</option>
    </select>
  </div>
  <div class="dropBoxDiv">
    <select bind:value={algorithm2}>
      <option value="titForTat">Tit for Tat</option>
      <option value="smart">Smart</option>
      <option value="trump">Trump</option>
      <option value="europeanUnion">European Union</option>
    </select>
  </div>
</div>
<button on:click={handleRunSimulation}>Run Simulation</button>
<h2>Results</h2>
<Chart {results} />
<div class="spaceUnder"></div>
<div class="grid">
<div class={"numberBox " + player1Classes}>
  <p class="sub">Player 1 Score</p>
  <p><b>{results?.player1Scores[results?.player1Scores?.length - 1] ?? "0"}</b></p>
</div>
<div class={"numberBox " + player2Classes}>
  <p class="sub">Player 2 Score</p>
  <p><b>{results?.player2Scores[results?.player2Scores?.length - 1] ?? "0"}</b></p>
</div>
</div>

<button on:click={downloadCSV}>Download CSV</button>