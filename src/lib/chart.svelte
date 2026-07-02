<script lang="ts">
    // export let results;
    let { results } = $props();
    let chart = $state(null);

    import { Line, Chart as Charte } from "svelte-chartjs";
    import zoomPlugin from "chartjs-plugin-zoom";
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from "chart.js";

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        zoomPlugin,
    );
    let maxY = $derived(
        Math.max(
            ...(results.player1Scores || []),
            ...(results.player2Scores || []),
        ),
    );
    let maxX = $derived(results.player1Actions?.length-1 || 10);
    let data = $derived({
        labels: Array.from(
            { length: results.player1Actions.length },
            (_, i) => i + 1,
        ),
        datasets: [
            {
                label: "Player 1 Actions",
                data: results.player1Actions,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
            {
                label: "Player 2 Actions",
                data: results.player2Actions,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
            {
                label: "Player 1 State Levels",
                data: results.player1StateLevels,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            },
            {
                label: "Player 2 State Levels",
                data: results.player2StateLevels,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            },
            {
                label: "Player 1 Scores",
                data: results.player1Scores,
                borderColor: "rgba(255, 206, 86, 1)",
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                tension: 0.4,
            },
            {
                label: "Player 2 Scores",
                data: results.player2Scores,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                tension: 0.4,
            },
        ],
    }));
    let previousResults = results;
    // Watch for changes in results and update the chart accordingly
    $effect(() => {
        if (results !== previousResults) {
            if (
                results.player1Actions &&
                results.player2Actions &&
                results.player1StateLevels &&
                results.player2StateLevels &&
                results.player1Scores &&
                results.player2Scores
            ) {
                if (data.datasets[0] !== undefined) {
                    data.labels = Array.from(
                        { length: results.player1Actions.length },
                        (_, i) => i,
                    );
                    data.datasets[0].data = results.player1Actions;
                    data.datasets[1].data = results.player2Actions;
                    data.datasets[2].data = results.player1StateLevels;
                    data.datasets[3].data = results.player2StateLevels;
                    data.datasets[4].data = results.player1Scores;
                    data.datasets[5].data = results.player2Scores;
                } else {
                    console.error(
                        "Datasets are undefined. Cannot update chart data.",
                    );
                    data = {
                        labels: Array.from(
                            { length: results.player1Actions.length },
                            (_, i) => i + 1,
                        ),
                        datasets: [
                            {
                                label: "Player 1 Actions",
                                data: results.player1Actions,
                                borderColor: "rgba(75, 192, 192, 1)",
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                tension: 0.4,
                            },
                            {
                                label: "Player 2 Actions",
                                data: results.player2Actions,
                                borderColor: "rgba(255, 99, 132, 1)",
                                backgroundColor: "rgba(255, 99, 132, 0.2)",
                                tension: 0.4,
                            },
                            {
                                label: "Player 1 State Levels",
                                data: results.player1StateLevels,
                                borderColor: "rgba(54, 162, 235, 1)",
                                backgroundColor: "rgba(54, 162, 235, 0.2)",
                                tension: 0.4,
                            },
                            {
                                label: "Player 2 State Levels",
                                data: results.player2StateLevels,
                                borderColor: "rgba(54, 162, 235, 1)",
                                backgroundColor: "rgba(54, 162, 235, 0.2)",
                                tension: 0.4,
                            },
                            {
                                label: "Player 1 Scores",
                                data: results.player1Scores,
                                borderColor: "rgba(255, 206, 86, 1)",
                                backgroundColor: "rgba(255, 206, 86, 0.2)",
                                tension: 0.4,
                            },
                            {
                                label: "Player 2 Scores",
                                data: results.player2Scores,
                                borderColor: "rgba(153, 102, 255, 1)",
                                backgroundColor: "rgba(153, 102, 255, 0.2)",
                                tension: 0.4,
                            },
                        ],
                    };
                }
                maxX = results.player1Actions?.length;
                maxY = Math.max(
                    ...(results.player1Scores || []),
                    ...(results.player2Scores || []),
                )+1;
                console.log("maxX:", maxX, "maxY:", maxY);
            }
        }
        chart?.update();
    });
</script>

<Line
    {data}
    options={{
        responsive: true,
        scales: {
                x: {
                    type: "linear",
                    min: 0,
                    max: maxX||10,
                },
                y: {
                    type: "linear",
                    min: 0,
                    max: maxY||10,
                },
            },
        plugins: {
            legend: {
                position: "top",
                display: true,
            },
            title: {
                display: true,
                text: "Simulation Results" + new Date().toLocaleString(),
            },
            
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "xy",
                    scaleMode: "xy"
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                    scaleMode: "xy",
                    threshold: .5,
                },
                limits: {
                    x: { min: 0, max: maxX||10, minRange: 2 },
                    y: {
                        min: 0,
                        max: maxY||10,
                        minRange: 1,
                    },
                },
            },
        },
    }}
    bind:chart
/>
