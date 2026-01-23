"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/
let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

let elephantEarLeft = drawing.append ("polygon")
.attr ("points", closedPolygon (50,110,125,125,115,245,85,230))
.attr ("fill", "#D3D3D3");

let elephantRightEar = drawing.append ("polygon")
.attr ("points", closedPolygon (450,110,375,125,385,245,410,240))
.attr ("fill", "#D3D3D3");

let elephantBackEar = drawing.append ("circle")
.attr ("cx", 100)
.attr ("cy", 120)
.attr ("r", 50)
.attr ("fill", "#D3D3D3");

let elephantBackEarRight = drawing.append ("circle")
.attr ("cx", 400)
.attr ("cy", 120)
.attr ("r", 50)
.attr ("fill", "#D3D3D3");

//polygons to represent the elephant's tusks

let elephantLeftTusk = drawing.append ("polygon")
.attr ("points", closedPolygon (175,220,175,260,155,230))
.attr ("fill", "#D3D3D3");

let elephantRightTusk = drawing.append ("polygon")
.attr ("points", closedPolygon (325,220,325,260,345,230))
.attr ("fill", "#D3D3D3");


//i will draw three overlapping circles to make up the elephant's head

let elephantHeadSideOne = drawing.append ("circle")
.attr ("cx", 190)
.attr ("cy", 150)
.attr ("r", 75)
.attr ("fill", "gray");


let elephantHeadSideTwo = drawing.append ("circle")
.attr ("cx", 305)
.attr ("cy", 150)
.attr ("r", 75)
.attr ("fill", "gray");

let elephantFace = drawing.append ("rect")
.attr ("x", 175)
.attr ("y", 100)
.attr ("width", 150)
.attr ("height", 120)
.attr ("fill", "gray");

//smaller circles of elephant's eyes to occupy appropriate spaces

let elephantLeftEye = drawing.append ("circle")
.attr ("cx", 190)
.attr ("cy", 160)
.attr ("r", 20)
.attr ("fill", "white");

let elephantRightEye = drawing.append ("circle")
.attr ("cx", 310)
.attr ("cy", 160)
.attr ("r", 20)
.attr ("fill", "white");

let elephantEyeBallRight = drawing.append ("circle")
.attr ("cx", 310)
.attr ("cy", 165)
.attr ("r", 8)

let elephantLeftEyeBall = drawing.append ("circle")
.attr ("cx", 190)
.attr ("cy", 165)
.attr ("r", 8)
 

//polygons to represent elephant trunk

let elephantTrunk = drawing.append ("rect")
.attr ("x", 215)
.attr ("y", 200)
.attr ("width", 70)
.attr ("height", 110)
.attr ("fill", "gray");

let elephanFold = drawing.append ("line")
.attr ("x1", 215)
.attr ("y1", 235)
.attr ("x2", 285)
.attr ("y2", 245)
.attr ("stroke", "black")
.attr ("stroke-width", 2)

let elephantFoldTwo = drawing.append ("line")
.attr ("x1", 216)
.attr ("y1", 260)
.attr ("x2", 285)
.attr ("y2", 270)
.attr ("stroke-width", 2)
.attr ("stroke", "black")

let trunkFoldThree = drawing.append ("line")
.attr ("x1", 215)
.attr ("y1", 285)
.attr ("x2", 285)
.attr ("y2", 295)
.attr ("stroke-width", 2)
.attr ("stroke", "black")
