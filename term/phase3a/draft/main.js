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
        gym: 210, sleep: "medium",
        productivity: 3.75, 
         },
    { date: "2026-01-24", 
        gym:  180, 
        sleep: "medium", 
        productivity: 2.5, 
         },
    { date: "2026-01-26", 
        gym: 0, 
        sleep: "low", 
        productivity: 1.67, 
        },
    { date: "2026-01-27", 
        gym: 200, 
        sleep: "medium", 
        productivity: 3.33,
         },
    { date: "2026-01-28", 
        gym: 240, 
        sleep: "high", 
        productivity: 5,  },
    { date: "2026-01-29", 
        gym: 0, 
        sleep: "low", 
        productivity: 3.75 },
    { date: "2026-01-31", 
        gym: 80, 
        sleep: "high", 
        productivity: 5 },
    { date: "2026-02-02", 
        gym: 0, 
        sleep: "medium", 
        productivity: 5 },
    { date: "2026-02-03", 
        gym: 0, 
        sleep: "low", 
        productivity: 1.25 },
    { date: "2026-02-04", 
        gym: 70, 
        sleep: "medium", 
        productivity: 3.75 },
    { date: "2026-02-05", 
        gym: 160, 
        sleep: "low", 
        productivity: 2.5 },
    { date: "2026-02-06", 
        gym: 110, 
        sleep: "low", 
        productivity: 3.33 },
    { date: "2026-02-07", 
        gym: 120, 
        sleep: "medium", 
        productivity: 5 },
    { date: "2026-02-09", 
        gym: 100, 
        sleep: "high", 
        productivity: 3.75  }
];

let dataset = observations.map(d => ({
    workout: d.gym,
    sleep: d.sleep,
    productivity: d.productivity
})); //Extract observation properties into "dataset"

/*Scales on cavas
*/
let xScale = d3.scaleLinear()
    .domain([0, 250]) // gym number of reps
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 5]) // productvity level, on a scale of 1-5
    .range([svgHeight - margin, margin]);

//colors for different levels of sleep duration
let colorScale = d3.scaleOrdinal()
    .domain(["low", "medium", "high"])
    .range(["red", "blue", "green"]);

//draw circle
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("r", 10)
    .attr("cx", d => xScale(d.workout)) //draws and places circle accordingly on scatterplot
    .attr("cy", d => yScale(d.productivity))
    .attr("fill", d => colorScale(d.sleep))
    .attr("opacity", 0.85);

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

/**** Key (legend) ****/
let keyX = svgWidth - 130;
let keyY = margin + 280;

let key = svg.append ("g")
    .attr("transform", "translate(" + keyX + "," + keyY + ")");//group and position the key element in the canvas

key.append("text")
    .attr("x", -5)
    .attr("y", -20)
    .text("Sleep Duration")
    .style("font-weight", "bold");

let categories = ["low", "medium", "high"];

key.selectAll("circle")
    .data(categories)
    .join("circle")
    .attr("cx", 10)
    .attr("cy", (d, i) => i * 28)
    .attr("r", 10)
    .attr("fill", d => colorScale(d));

key.selectAll("text.label")
    .data(categories)
    .join("text")
    .attr("x", 30)
    .attr("y", (d, i) => i * 28 + 5)
    .text(d => d);