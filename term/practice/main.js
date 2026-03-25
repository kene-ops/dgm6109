"use strict"

let svgWidth = 1200
let svgHeight = 900

let margin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 80
}

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")

let data, xAxis, yAxis, xScale, yScale, colorScale

(async function () {
    data = await d3.json("observations.json").then(buildVisualization)
    console.log("here")
})();


function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);
    drawVisualization(renderData, svg);
    return data;
}

function buildScales(data) {

    xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (value) {
            return value.gym
        })]) // gym number of reps, from zero to the max
        .range([margin.left, svgWidth - margin.right])

    yScale = d3.scaleLinear()
        .domain([0, 5]) // productivity level, on a scale of 1-5
        .range ([svgHeight - margin.bottom, margin.top])

/* colors for different levels of sleep duration */
    colorScale = d3.scaleOrdinal()
        .domain (["low", "medium", "high"])
        .range(["yellow", "orange", "green"])
}

function organizeData(data) {

    let organized = data.map(function (value) {
        return {
            date: value.date,
            gym: value.gym,
            meals: value.meals,
            sleep: value.sleep,
            productivity: value.productivity
        }
    })
    return organized;
}

function drawVisualization(data, drawing) {
    
   xAxis = d3.axisBottom(xScale)
   yAxis = d3.axisLeft(yScale)

/* Draw X Axis */
drawing.append("g")
    .attr("transform", `translate(0,${svgHeight - margin.bottom})`)
    .call(xAxis)

/* Draw Y Axis */
drawing.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)

/* X Axis Label */
    drawing.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - 10)
    .attr("text-anchor", "middle")
    .text("Gym Level (Reps)")

/* Y Axis Label */
drawing.append("text") 
    .attr("transform", "rotate(-90)") 
    .attr("x", -svgHeight / 2) 
    .attr("y", 30) 
    .attr("text-anchor", "middle") 
    .text("Productivity Level")

/* Drawing the Rectangles for Data Points */

drawing.selectAll("rect.dataPoint") //creates a rectangle for each observation
    .data(data) 
    .enter() 
    .append("rect") 
    .attr("class", "dataPoint") 
    .attr("x", function(value) {
        return xScale(value.gym) - 16 //gym determines the x location
    })   
    .attr("y", function(value) {
        return yScale(value.productivity) - 10 //productivity determines the y location
    }) 
    .attr("width", 32) 
    .attr("height", 20) 
    .attr("fill", function(value) {
        return colorScale(value.sleep) //sleep duration determines the rect color
    }) 
    .attr("opacity", 0.7)
    .attr("stroke", "black")

/* Drawing Meal Circles/dots */
drawing.selectAll("g.mealCircles")
    .data(data)
    .enter()
    .append("g")
    .attr("class","mealCircles")
    .each(function(value){

        let x = xScale(value.gym)
        let y = yScale(value.productivity)
        let startingX;

        if (value.meals === 1) {
            startingX = x; // exactly in the center
        }else if (value.meals === 2) {
            startingX = x - 4; //shifted left so the pair is centered
        }else if (value.meals === 3) {
            startingX = x - 8; // shifted further left for three circle
        }else {
            startingX = x - ((value.meals - 1) * 8) / 2;
        }

        for(let i = 0; i < value.meals; i++){ //this loop draws circles depending on meal count

            d3.select(this)
                .append("circle")
                .attr("cx", startingX + (i * 8))
                .attr("cy", y )
                .attr("r", 2.5)
                .attr("fill","black")

        }
    })

/* --- Legend Container --- */

// Create one main group for all legend elements
let legendContainer = drawing.append("g")
    .attr("transform", `translate(${svgWidth - 170}, ${margin.top + 550})`);

// 1. Add the "Cover" Rectangle first so it's in the background
legendContainer.append("rect")
    .attr("x", -10)        // Padding to the left
    .attr("y", -20)        // Padding above the first title
    .attr("width", 150)    // Wide enough for text
    .attr("height", 280)   // Tall enough for both legends
    .attr("stroke", "black")
    .attr("fill", "none")

/* Move Key (legend) from the left of the canvas to the right then down */    
let legend = drawing.append("g") 
    .attr("transform", `translate(${svgWidth - 150},600)`)

    /* Key (Legend) for Sleep */
legend.append("text") 
    .text("Sleep Duration") 
    .attr("font-weight", "bold")

legend.append("rect") 
    .attr("x",0) 
    .attr("y",20) 
    .attr("width",15) 
    .attr("height",15) 
    .attr("fill","red") 
legend.append("text") 
    .attr("x",25) 
    .attr("y",32) 
    .text("Low")

legend.append("rect") 
    .attr("x",0) 
    .attr("y",50) 
    .attr("width",15) 
    .attr("height",15) 
    .attr("fill","blue")    
legend.append("text") 
    .attr("x",25) 
    .attr("y",62) 
    .text("Medium") 
    
legend.append("rect") 
    .attr("x",0) 
    .attr("y",80) 
    .attr("width",15) 
    .attr("height",15) 
    .attr("fill","green")    
legend.append("text") 
    .attr("x",25) 
    .attr("y",92) 
    .text("High")

/* Legend for Meals */
let mealLegend = drawing.append("g")
    .attr("transform", `translate(${svgWidth - 150},730)`)

mealLegend.append("text")
    .text(" No. of Meals")
    .attr("font-weight","bold")

// one meal
mealLegend.append("circle") 
    .attr("cx",7)
    .attr("cy",20)
    .attr("r",3)
    .attr("fill","black")
mealLegend.append("text")
    .attr("x",30)
    .attr("y",24)
    .text("1 Meal")

// two meals
mealLegend.append("circle")
    .attr("cx",4)
    .attr("cy",40)
    .attr("r",3)
    .attr("fill","black")
mealLegend.append("circle")
    .attr("cx",12)
    .attr("cy",40)
    .attr("r",3)
    .attr("fill","black")
mealLegend.append("text")
    .attr("x",30)
    .attr("y",44)
    .text("2 Meals")

// three meals
mealLegend.append("circle")
    .attr("cx",2)
    .attr("cy",60)
    .attr("r",3)
    .attr("fill","black")
mealLegend.append("circle")
    .attr("cx",10)
    .attr("cy",60)
    .attr("r",3)
    .attr("fill","black")
mealLegend.append("circle")
    .attr("cx",18)
    .attr("cy",60)
    .attr("r",3)
    .attr("fill","black")
mealLegend.append("text")
    .attr("x",30)
    .attr("y",64)
    .text("3 Meals")
}