"use strict"

/* Configuration variables: drawing */
let svgWidth = 600;
let svgHeight = 400;
let margin = 25;

/* Resize  div to match width of visualization. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border. */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/* Observations (Gym (number of reps) and productivity result)
*/
let observations = [
    { date: "2026-01-23", 
        gym: 210, productivity: 3.75 },
    { date: "2026-01-24", 
        gym:  180, productivity: 2.5 },
    { date: "2026-01-26", 
        gym: 0, productivity: 1.67 },
    { date: "2026-01-27", 
        gym: 200, productivity: 3.33 },
    { date: "2026-01-28", 
        gym: 240, productivity: 5 },
    { date: "2026-01-29", 
        gym: 0, productivity: 3.75 },
    { date: "2026-01-31", 
        gym: 80, productivity: 5 },
    { date: "2026-02-02", 
        gym: 0, productivity: 5 },
    { date: "2026-02-03", 
        gym: 0, productivity: 1.25 },
    { date: "2026-02-04", 
        gym: 70, productivity: 3.75 },
    { date: "2026-02-05", 
        gym: 160, productivity: 2.5 },
    { date: "2026-02-06", 
        gym: 110, productivity: 3.33 },
    { date: "2026-02-07", 
        gym: 120, productivity: 5 },
    { date: "2026-02-09", 
        gym: 100, productivity: 3.75  }
];

let dataset = observations.map(d => ({
    workout: d.gym, 
    productivity: d.productivity
}));

/*Scales on cavas
*/
let xScale = d3.scaleLinear()
    .domain([0, 250]) // gym number of reps
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 5]) // productvity level, on a scale of 1-5
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("r", 10)
    .attr("cx", d => xScale (d.workout))
    .attr("cy", d => yScale(d.productivity))
    .attr("fill", "black");

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 3))
    .attr("text-anchor", "middle")
    .text("Workout level (total reps)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 3)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Productivity level (0-5)")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("0,0");

// value labels

//origin label
svg.append("text")
    .attr("x", svgWidth - margin)
    .attr("y", svgHeight - (margin/3))
    .attr("text-anchor", "middle")
    .text("250");

    //x max label
svg.append("text")
    .attr("x", margin - 10)
    .attr("y", margin + 5)
    .attr("text-anchor", "end")
    .text("5");