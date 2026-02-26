"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 600;

/* configuring variables: margins */
let topMargin = 60
let rightMargin = 180
let bottomMargin = 60
let leftMargin = 70

/* Resize  div to match width of visualization. */
d3.select("#container")
    .style("width", svgWidth + "px")

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
// svg.append("rect")
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("stroke-dasharray", "5")
//     .attr("x", leftMargin)
//     .attr("y", topMargin)
//     .attr("width", svgWidth - leftMargin - rightMargin)
//     .attr("height", svgHeight - topMargin - bottomMargin);

/* Observations (Gym (number of reps) and productivity result)
*/
let observations = [
    { date: "2026-01-23", 
        gym: 210, 
        sleep: "medium",
        meditation: 15,
        productivity: 3.75, 
         },
    { date: "2026-01-24", 
        gym:  180, 
        sleep: "medium",
        meditation: 16, 
        productivity: 2.5, 
         },
    { date: "2026-01-26", 
        gym: 0, 
        sleep: "low",
        meditation: 15, 
        productivity: 1.67, 
        },
    { date: "2026-01-27", 
        gym: 200, 
        sleep: "medium",
        meditation: 14, 
        productivity: 3.33,
         },
    { date: "2026-01-28", 
        gym: 240, 
        sleep: "high",
        meditation: 15, 
        productivity: 5,  },
    { date: "2026-01-29", 
        gym: 0, 
        sleep: "low", 
        meditation: 18,
        productivity: 3.75 },
    { date: "2026-01-31", 
        gym: 80, 
        sleep: "high",
        meditation: 19, 
        productivity: 5 },
    { date: "2026-02-02", 
        gym: 0, 
        sleep: "medium",
        meditation: 14, 
        productivity: 5 },
    { date: "2026-02-03", 
        gym: 0, 
        sleep: "low",
        meditation: 15, 
        productivity: 1.25 },
    { date: "2026-02-04", 
        gym: 70, 
        sleep: "medium",
        meditation: 15, 
        productivity: 3.75 },
    { date: "2026-02-05", 
        gym: 160, 
        sleep: "low", 
        meditation: 10,
        productivity: 2.5 },
    { date: "2026-02-06", 
        gym: 110, 
        sleep: "low",
        meditation: 15, 
        productivity: 3.33 },
    { date: "2026-02-07", 
        gym: 120, 
        sleep: "medium",
        meditation: 15, 
        productivity: 5 },
    { date: "2026-02-09", 
        gym: 100, 
        sleep: "high",
        meditation: 14, 
        productivity: 3.75  }
];


let dataset = observations.map(d => ({
    workout: d.gym,
    sleep: d.sleep,
    meditation: d.meditation,
    productivity: d.productivity
}));

/* sort: largest bubbles drawn first
*/
dataset.sort (function (a,b){
    return (b.workout - a.workout) 

});

/*Scales on cavas
*/
let xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, function(d) {
        return d.meditation
    })) // min and max meditation minutes
    .range([leftMargin, svgWidth - rightMargin]);

let yScale = d3.scalePow().exponent(2)
    .domain(d3.extent(dataset, function(d) {
        return d.productivity 
    })) // min and max productvity level, on a scale of 1-5
    .range([svgHeight - bottomMargin, topMargin]);

let rScale = d3.scaleSqrt()
    .domain(d3.extent(dataset, function(d) {
        return d.workout
    } ))
    .range([5, 30]);

/* color encoding
*/
function colorScale(d) {
    if (d.sleep === "low") return "red";
    else if (d.sleep === "medium") return "blue";
    else return "green"
}

/* axis lines
*/
svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(d3.max(dataset, function(d) {
        return d.meditation
    })))
    .attr("y2", yScale(0))
    .attr("stroke", "black");

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(0))
    .attr("y2", yScale(d3.max(dataset, function(d) {
        return  d.productivity
    })))
    .attr("stroke", "black");

/* draw circles
*/
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("r", function(d) {
        return rScale(d.workout)})
    .attr("cx", function(d) {
        return xScale (d.meditation)}) 
    .attr("cy", function(d) {
        return yScale(d.productivity)})
    .attr("fill", function(d) {
        return colorScale (d)})
    .attr("opacity", 0.75);

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - 15)
    .attr("text-anchor", "middle")
    .text("Meditation Duration (minutes)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Productivity level (0-5)")
    .attr("transform", "rotate(-90)");

/* size Key
*/

/* Key Box*/
svg.append("rect")
    .attr("x", svgWidth - 175)
    .attr("y", 230)
    .attr("width", 170)
    .attr("height", 170)
    .attr("fill", "none")
    .attr("stroke", "black");

/* Key Title */    
svg.append("text")
    .attr("x", svgWidth - 150)
    .attr("y", 220)
    .text("Workout Level (Reps)");

let sizeKey = [50, 120, 240];

sizeKey.forEach(function(d, i) {
    svg.append("circle")
    .attr("cx", svgWidth - 130)
    .attr("cy", 250 + i * 55)
    .attr("r", rScale(d))
    .attr("fill", "gray");

svg.append("text")
    .attr("x", svgWidth - 100)
    .attr("y", 265 + i * 50)
    .text(d + "reps")
});

/* Color Key
*/

/* Color key box */
svg.append("rect")
.attr("x", svgWidth - 175)
.attr("y", 430)
.attr("width", 170)
.attr("height", 140)
.attr("fill", "none")
.attr("stroke", "black");

/* Color Key Title*/
svg.append("text")
    .attr("x", svgWidth - 150)
    .attr("y", 425)
    .text("Sleep Duration");

let colorKey = [
    {label: "Low sleep", sleep: "low"},
    {label: "Medium sleep", sleep: "medium"},
    {label: "High sleep", sleep: "high"}
];

colorKey.forEach(function(d, i) {
    svg.append("rect")
    .attr("x", svgWidth - 140)
        .attr("y", 450 + i * 40)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", colorScale(d));

    svg.append("text")
        .attr("x", svgWidth - 110)
        .attr("y", 465 + i * 40)
        .text(d.label);
});


