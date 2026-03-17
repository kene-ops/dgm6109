"use strict"

/*
    Adjust these values to fit your visualization, but be sure to keep them within the size limit given for the project! Feel free to change these variable names if they help you to better understand your code!

    Be sure to remove all code comments and unused variables and code before submitting each version of your visualization!
*/

let svgWidth = 1200
let svgHeight = 900

/* You may use 4 individual variables (such as marginTop or topMargin) if you prefer that to using an Object with 4 properties */

let margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 80
}

/*
    Adjust the below-given SVG creation method to fit your project. In the example code, we have appended an SVG that is the same size as our svgWidth and svgHeight variables.

    We recommend drawing a thin black border around your whole SVG so that it's visually distinctive from the rest of your page, but if you have other ways of distinguishing it, feel free to remove ours!

    Below this, we have commented-out code that will create an SVG "group". You can use this code and then add all elements of your visualization to the group, if you prefer doing this to having to calculate using the margins everywhere.

    The dashed box that we added to the SVG group is useful as a "placeholder" for what should be the maximum area used by your visualization (if you use margins as we have, but that is also totally up to you!). However, we recommend making this box invisible in your final visualization so taht it doesn't clutter your axes and other visual elements.

    If you decide not to use parts of this code, be sure to delete it! Also, be sure to delete this and all other instructional code comments!
*/

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")

/* let viz = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

viz.append("rect")
    .attr("width", svgWidth - (margin.left + margin.right))
    .attr("height", svgHeight - (margin.top + margin.bottom))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5,5") */

/* Some global variables that you may use. You may also add additional ones. Be sure to write a code comment explaining what each variable does, even if you only use the ones that we provided. Remove any that you end up not using.

TIP: You can do end-of-line comments across a list of variables, like this:

    let data,   // my dataset
    xAxis,      // storage for the x axis group
*/

let data, xAxis, yAxis, xScale, yScale, colorScale

/*
    Replace "data.json" with your own well-named JSON file. You can use the name data.json to replace our file, or you can come up with a name that's more specific for your project data (as long as it's a well-named file that ends with .json)!

    REMINDER: All you need to understand about the async function code is that it loads your data and then passes it as a parameter to the function named in .then() (here, function buildVisualization). When that function returns the data, it is then stored in global variable data so that it can be used elsewhere!
*/

(async function () {
    data = await d3.json("observations.json").then(buildVisualization)
    console.log("here")
})();

/*
    TIP: You may need to reorganize the buildVisualization function to suit your application. Think about what each line does!

    Remove any lines of code and variables that you don't need. Your final product should contain the code necessary to produce your visualization! 

    And of course be sure to write good formal function documentation!
*/

function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);
    drawVisualization(renderData, svg);
    return data;
}

function buildScales(data) {
    /*
    Create your scale functions here. If appropriate for your project, you can use the global xScale and yScale variables that we created, but you may need to create additional globals for other scales (such as radius, color, etc.)
    */
    xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (value) {
            return value.gym
        })]) // gym number of reps, from zero to the max
        .range([margin.left, svgWidth - margin.right])

    yScale = d3.scaleLinear()
        .domain([0, 5]) // productivity level, on a scale of 1-5
        .range ([svgHeight - margin.bottom, margin.top])

    //colors for different levels of sleep duration 
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

/**** function drawVisualization(data, viz) ***
 *  
 * This is just a reminder to write good function documentation that includes a description of what the function does, a list of each parameter's expected data type and purpose, and what the function returns (if anything). Be sure to review the lessons on function documentation as you work on this!
 * 
 * Our provided starting point for the function suggests processing your dataset as the first parameter and the SVG or group that you wish to draw to as your second parameter.
 * 
 * You can change these variables as needed. Just make sure that you explain what your code is doing. For example, it is a good idea to additionally list any global variables that your functions depend on.
 * 
*****/
function drawVisualization(data, drawing) {
    /*
    Use this function to draw your data visualization. This includes drawing the X and Y axes, visualizing your data, and providing clear labels and keys.
    
    You may break this up into multiple well-named and well-documented functions if you prefer. You may especially want to do this if you are creating an interactive visualization. One function might draw the elements that only need to be drawn once (e.g., the axes, keys, and labels) while another might draw the elements that get changed in response to a user interaction.
    */
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
    .attr("y", svgHeight - 5)
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
    .attr("opacity", 0.8)

/* Drawing Meal Circles/dots */
drawing.selectAll("g.mealCircles")
    .data(data)
    .enter()
    .append("g")
    .attr("class","mealCircles")
    .each(function(value){

        let x = xScale(value.gym)
        let y = yScale(value.productivity)

        for(let i = 0; i < value.meals; i++){ //this loop draws circles depending on meal count

            d3.select(this)
                .append("circle")
                .attr("cx", x - 4 + (i * 8))
                .attr("cy", y )
                .attr("r", 2.5)
                .attr("fill","black")

        }
    })

/* Key (legend) for Sleep */

let legend = drawing.append("g") 
    .attr("transform", `translate(${svgWidth - 150},600)`)

legend.append("text") 
    .text("Sleep Duration") 
    .attr("font-weight", "bold")

legend.append("rect") 
    .attr("x",0) 
    .attr("y",20) 
    .attr("width",15) 
    .attr("height",15) 
    .attr("fill","yellow") 
legend.append("text") 
    .attr("x",25) 
    .attr("y",32) 
    .text("Low")

legend.append("rect") 
    .attr("x",0) 
    .attr("y",50) 
    .attr("width",15) 
    .attr("height",15) 
    .attr("fill","orange")    
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