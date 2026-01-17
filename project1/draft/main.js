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

//i will draw three overlapping circles to make up the elephant's head

let elephantHeadOne = drawing.append ("circle")
.attr ("cx", 200)
.attr ("cy", 150)
.attr ("r", 60)
.attr ("fill", "gray");


let elephantHeadTwo = drawing.append ("circle")
.attr ("cx", 260)
.attr ("cy", 150)
.attr ("r", 60)
.attr ("fill", "gray");

let elephantHeadThree = drawing.append ("circle")
.attr ("cx", 320)
.attr ("cy", 150)
.attr ("r", 60)
.attr ("fill", "gray");

//smaller circles of elephant's eyes to occupy appropriate spaces

let elephantLeftEye = drawing.append ("circle")
.attr ("cx", 235)
.attr ("cy", 150)
.attr ("r", 8)
.attr ("fill", "black");

let elephantRightEye = drawing.append ("circle")
.attr ("cx", 285)
.attr ("cy", 150)
.attr ("r", 8)
.attr ("fill", "black");

//drawing of polygons for elephant's ears 

let elephantEarLeft = drawing.append ("polygon")
.attr ("points", closedPolygon (130,150,200,90,180,240))
.attr ("fill", "gray");

let elephantRightEar = drawing.append ("polygon")
.attr ("points", closedPolygon (390, 150, 320, 90, 340, 240))
.attr ("fill", "gray");

//polygons to represent the elephant's tusks

let elephantLeftTusk = drawing.append ("polygon")
.attr ("points", closedPolygon (230, 190, 225, 240, 230, 240))
.attr ("fill", "ash");

let elephantRightTusk = drawing.append ("polygon")
.attr ("points", closedPolygon (290, 190, 285, 240, 290, 240))
.attr ("fill", "ash");

//polygons to represent elephant trunk

let elephantTrunk = drawing.append ("polygon")
.attr ("points,", closedPolygon (245, 210, 40, 70))
.attr ("fill", "gray");


