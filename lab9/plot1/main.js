"use strict";

/*
   Configuration & SVG Setup
*/

let svgWidth = 800;
let svgHeight = 600;

let topMargin = 60;
let rightMargin = 200;
let bottomMargin = 60;
let leftMargin = 70;

// Create SVG canvas
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Draw canvas border
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// Dataset

let observations = [
    { date: "2026-01-23", 
        gym: 210, 
        sleep: 400, 
        meditation: 15, 
        productivity: 3.75 
    },
    { date: "2026-01-24", 
        gym: 180, 
        sleep: 345, 
        meditation: 16, 
        productivity: 2.5 
    },
    { date: "2026-01-26", 
        gym: 0, 
        sleep: 305, 
        meditation: 15, 
        productivity: 1.67 
    },
    { date: "2026-01-27", 
        gym: 200, 
        sleep: 330, 
        meditation: 14, 
        productivity: 3.33 
    },
    { date: "2026-01-28", 
        gym: 240, 
        sleep: 420, 
        meditation: 15, 
        productivity: 5 
    },
    { date: "2026-01-29", 
        gym: 0, 
        sleep: 240, 
        meditation: 18, 
        productivity: 3.75 
    },
    { date: "2026-01-31", 
        gym: 80, 
        sleep: 420, 
        meditation: 19, 
        productivity: 5 
    },
    { date: "2026-02-02", 
        gym: 0, 
        sleep: 360, 
        meditation: 14, 
        productivity: 5 
    },
    { date: "2026-02-03", 
        gym: 0, 
        sleep: 300, 
        meditation: 15, 
        productivity: 1.25 
    },
    { date: "2026-02-04", 
        gym: 70, 
        sleep: 340, 
        meditation: 15, 
        productivity: 3.75 
    },
    { date: "2026-02-05", 
        gym: 160, 
        sleep: 300, 
        meditation: 10, 
        productivity: 2.5 
    },
    { date: "2026-02-06", 
        gym: 110, 
        sleep: 300, 
        meditation: 15, 
        productivity: 3.33 
    },
    { date: "2026-02-07", 
        gym: 120, 
        sleep: 360, 
        meditation: 15, 
        productivity: 5 
    },
    { date: "2026-02-09", 
        gym: 100, 
        sleep: 480, 
        meditation: 14, 
        productivity: 3.75 
    }
];

let dataset = observations
    .filter(d => d.gym > 0) //filter out the days of zero gym
    .map(d => ({
        gym: d.gym,
        sleep: d.sleep,
        meditation: d.meditation,
        productivity: d.productivity
}));

// Chart dimensions

let innerWidth = svgWidth - leftMargin - rightMargin;
let innerHeight = svgHeight - topMargin - bottomMargin;

// Chart group
let chart = svg.append("g")
    .attr("transform", `translate(${leftMargin}, ${topMargin})`);

// Scales

let xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, function(d) {
        return d.gym}))
    .range([0, innerWidth]);

let yScale = d3.scaleLinear()
    .domain([0, 5])
    .range([innerHeight, 0]);

let sizeScale = d3.scaleSqrt()
    .domain(d3.extent(dataset, function(d) {
        return d.sleep}))
    .range([5, 30]);

// Color scale for meditation (categorical)
function colorScale(med) {
    if (med >= 18) return "green";    // High meditation time
    else if (med >= 14) return "blue";  // Medium
    else return "purple";             // Low
}

// Axes
chart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

chart.append("g")
    .call(d3.axisLeft(yScale));

// Axis labels
chart.append("text")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 45)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Gym (minutes)");

chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Productivity (1–5)");

// Circles
chart.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", function(d) {
        return xScale(d.gym)})
    .attr("cy", function(d) {
        return yScale(d.productivity)})
    .attr("r", function(d) {
        return sizeScale(d.sleep)})
    .attr("fill", function(d) {
        return colorScale(d.meditation)})
    .attr("opacity", 0.75);

// legend box
let sizeLegendX = svgWidth - 180;
let sizeLegendY = 180;

svg.append("rect")
    .attr("x", sizeLegendX)
    .attr("y", sizeLegendY)
    .attr("width", 160)
    .attr("height", 180)
    .attr("fill", "none")
    .attr("stroke", "black");

// Title
svg.append("text")
    .attr("x", sizeLegendX + 10)
    .attr("y", sizeLegendY + 20)
    .attr("font-weight", "bold")
    .text("Sleep (minutes)");

// Circles and labels
let sizeKey = [240, 360, 480];  
sizeKey.forEach((d, i) => {
    svg.append("circle")
        .attr("cx", sizeLegendX + 30)
        .attr("cy", sizeLegendY + 50 + i * 50)
        .attr("r", sizeScale(d))
        .attr("fill", "gray")
        .attr("opacity", 0.75);

    svg.append("text")
        .attr("x", sizeLegendX + 70)
        .attr("y", sizeLegendY + 55 + i * 50)
        .text(d);
});

// Color legend box
let colorLegendX = svgWidth - 180;
let colorLegendY = sizeLegendY + 200;

svg.append("rect")
    .attr("x", colorLegendX)
    .attr("y", colorLegendY)
    .attr("width", 160)
    .attr("height", 140)
    .attr("fill", "none")
    .attr("stroke", "black");

// Title
svg.append("text")
    .attr("x", colorLegendX + 10)
    .attr("y", colorLegendY + 20)
    .attr("font-weight", "bold")
    .text("Meditation (minutes)");

// Color boxes and labels
let colorKey = [
    {label: "Low (<14)", color: "purple"},
    {label: "Medium (14–17)", color: "blue"},
    {label: "High (>=18)", color: "green"}
];

colorKey.forEach((d, i) => {
    svg.append("rect")
        .attr("x", colorLegendX + 20)
        .attr("y", colorLegendY + 40 + i * 30)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", d.color);

    svg.append("text")
        .attr("x", colorLegendX + 50)
        .attr("y", colorLegendY + 55 + i * 30)
        .text(d.label);
});