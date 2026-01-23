"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    choice = document.getElementById ("choice").value;
    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

/* set up the drawing canvas - Be sure not to copy this code from your draft project! */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*the origin of this drawing is the top-left corner of the elephant's face rectangle. the coordinates (elephantX, elephantY) represent this point. all other parts of the elephant (ears, eyes, tusks, trunk, head) are positioned relative to this origin so the entire elephant moves together when the user changes the input values.
*/
    let elephantX = xInput;
    let elephantY = yInput;


let elephantEarLeft = drawing.append ("polygon")
.attr ("points", closedPolygon (
    elephantX + 35, elephantY + 60,
    elephantX + 110, elephantY + 75,
    elephantX + 100, elephantY + 195,
    elephantX + 70, elephantY + 180
))
.attr ("fill", "#D3D3D3");

let elephantRightEar = drawing.append ("polygon")
.attr ("points", closedPolygon (
    elephantX + 435, elephantY + 60,
    elephantX + 325, elephantY + 75,
    elephantX + 370,elephantY + 195,
    elephantX + 395 ,elephantY + 190
))
.attr ("fill", "#D3D3D3");

let elephantBackEar = drawing.append ("circle")
.attr ("cx", elephantX + 75)
.attr ("cy", elephantY + 70)
.attr ("r", 50)
.attr ("fill", "#D3D3D3");

let elephantBackEarRight = drawing.append ("circle")
.attr ("cx", elephantX + 385)
.attr ("cy", elephantY + 70)
.attr ("r", 50)
.attr ("fill", "#D3D3D3");

//polygons to represent the elephant's tusks

let elephantLeftTusk = drawing.append ("polygon")
.attr ("points", closedPolygon(
    elephantX, elephantY + 120,
    elephantX, elephantY + 160,
    elephantX, elephantY + 130
))
.attr ("fill", "#D3D3D3");

let elephantRightTusk = drawing.append ("polygon")
.attr ("points", closedPolygon (
    elephantX + 150,elephantY + 120,
    elephantX + 150, elephantY + 160,
    elephantX + 170, elephantY + 130
))
.attr ("fill", "#D3D3D3");


//draw elephant's head

let elephantHeadSideOne = drawing.append ("circle")
.attr ("cx", elephantX + 15)
.attr ("cy", elephantY + 50)
.attr ("r", 75)
.attr ("fill", "gray");


let elephantHeadSideTwo = drawing.append ("circle")
.attr ("cx", elephantX + 130)
.attr ("cy", elephantY + 50)
.attr ("r", 75)
.attr ("fill", "gray");

let elephantFace = drawing.append ("rect")
.attr ("x", elephantX)
.attr ("y", elephantY)
.attr ("width", 150)
.attr ("height", 120)
.attr ("fill", "gray");

//smaller circles of elephant's eyes to occupy appropriate spaces

let elephantLeftEye = drawing.append ("circle")
.attr ("cx", elephantX + 15)
.attr ("cy", elephantY + 60)
.attr ("r", 20)
.attr ("fill", "white");

let elephantRightEye = drawing.append ("circle")
.attr ("cx", elephantX + 135)
.attr ("cy", elephantY + 60)
.attr ("r", 20)
.attr ("fill", "white");

let elephantEyeBallRight = drawing.append ("circle")
.attr ("cx", elephantX + 15)
.attr ("cy", elephantY + 65)
.attr ("r", 8);

let elephantLeftEyeBall = drawing.append ("circle")
.attr ("cx", elephantX + 135)
.attr ("cy", elephantY + 65)
.attr ("r", 8);
 

//polygons to represent elephant trunk

let elephantTrunk = drawing.append ("rect")
.attr ("x", elephantX + 40)
.attr ("y", elephantY + 100)
.attr ("width", 70)
.attr ("height", 110)
.attr ("fill", "gray");

let elephanFold = drawing.append ("line")
.attr ("x1", elephantX + 40)
.attr ("y1", elephantY + 135)
.attr ("x2", elephantX + 110)
.attr ("y2", elephantY + 145)
.attr ("stroke", "black")
.attr ("stroke-width", 2);

let elephantFoldTwo = drawing.append ("line")
.attr ("x1", elephantX + 40)
.attr ("y1", elephantY + 160)
.attr ("x2", elephantX + 110)
.attr ("y2", elephantY + 170)
.attr ("stroke-width", 2)
.attr ("stroke", "black");

let trunkFoldThree = drawing.append ("line")
.attr ("x1", elephantX + 40)
.attr ("y1", elephantY + 185)
.attr ("x2", elephantX + 110)
.attr ("y2", elephantY + 195)
.attr ("stroke-width", 2)
.attr ("stroke", "black");


function drawImage() /*when the user selects "flared", the elephant's ears are wider and positioned farther from the head to make the elephant look alert. When "normal is selected, the ears remain closer to the head"
*/
{
 
if (choice === "flared") {
    drawing.append ("polygon")
    .attr ("points", closedPolygon(
        elephantX - 80, elephantY +10,
        elephantX - 10, elephantY + 25,
        elephantX - 20, elephantY + 145,
        elephantX - 70, elephantY + 130
    ))
    .attr("fill", "#D3D3D3");
} else {
    drawing.append("polygon")
    .attr("points", closedPolygon(
        elephantX - 50, elephantY + 10,
        elephantX - 10, elephantY + 25,
        elephantX - 20, elephantY + 145,
        elephantX - 40, elephantY + 130
    ))
    .attr("fill", "#D3D3D3");

}
    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
