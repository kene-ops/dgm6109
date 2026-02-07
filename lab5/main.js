"use strict";

/* *** START Do not modify this section of code ***** */
document.getElementById("action").addEventListener("click", processForm);

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

function processForm() {

    let choice1 = document.getElementById("choice1").value;
    let x1 = Number(document.getElementById("x1").value);
    let y1 = Number(document.getElementById("y1").value);

    let choice2 = document.getElementById("choice2").value;
    let x2 = Number(document.getElementById("x2").value);
    let y2 = Number(document.getElementById("y2").value);

    let showOrigin = document.getElementById("origins").value == "yes";
    drawing.selectAll('svg>*').remove();
    
    makeDrawing(drawing, choice1, x1, y1, choice2, x2, y2, showOrigin)
}


/* *** END SECTION ***** */

 /* *****makeDrawing ()***** */

function makeDrawing (canvas, choice1, x1, y1, choice2, x2, y2, showOrigin) {

    // Help function to safely call any drawing function
function safeDraw(funcName, targetCanvas, x, y, showOrigin) {
    if (typeof window[funcName] === "function") {
        try {
            //try the standard parameter order first
            window[funcName](targetCanvas, x, y, showOrigin);
    } catch (e) {
        console.warn(`${funcName} standard call failed. try alternative parameter orders`);
    
          //Try other common parameter orders
        try {window[funcName](x, y, targetCanvas, showOrigin); return; } catch (e) {}
        try {window[funcName](x, y, showOrigin, targetCanvas); return; } catch (e) {}
        try {window[funcName](targetCanvas, x, y); return; } catch (e) {}

        console.error(`could not draw ${funcName}.check the function parameters.`);
    }

} else {
    console.error(`Function $(funcName) not found! Did you include the JS file?`);
}
}
    //Create groups for drawings
    let item1 = canvas.append("g");
    safeDraw(choice1, item1, x1, y1, showOrigin);

    let item2 = canvas.append("g");
    safeDraw(choice2, item2, x2, y2, showOrigin);

//run animation
switcheroo(item1, x1, y1, item2, x2, y2);
}