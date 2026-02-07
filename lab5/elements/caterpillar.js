"use strict";

/*
    Function: caterpillar

    Purpose:
    Draws a caterpillar on the provided SVG canvas at a specified
    horizontal and vertical position.

    Required Parameters:
    canvas      → The SVG drawing area (D3 selection) to draw on
    xPosition   → The horizontal origin point of the caterpillar
    yPosition   → The vertical origin point of the caterpillar
    showOrigin  → Boolean value (true/false) that determines
                  whether the origin point is displayed

    Returns:
    The SVG canvas that was passed into the function,
    with the caterpillar added to it.
*/

function caterpillar(canvas, xPosition, yPosition, showOrigin) {

    // ---------------- BODY SEGMENTS ----------------
    for (let i = 0; i < 4; i++) {
        canvas.append("ellipse")
            .attr("cx", xPosition + i * 50)
            .attr("cy", yPosition)
            .attr("rx", 30)
            .attr("ry", 25)
            .attr("fill", "green");
    }

    // ---------------- HEAD ----------------
    canvas.append("ellipse")
        .attr("cx", xPosition - 45)
        .attr("cy", yPosition)
        .attr("rx", 35)
        .attr("ry", 30)
        .attr("fill", "limegreen");

    // ---------------- EYES ----------------
    canvas.append("circle")
        .attr("cx", xPosition - 55)
        .attr("cy", yPosition - 10)
        .attr("r", 4)
        .attr("fill", "black");

    canvas.append("circle")
        .attr("cx", xPosition - 35)
        .attr("cy", yPosition - 10)
        .attr("r", 4)
        .attr("fill", "black");

    // ---------------- ANTENNAE ----------------
    canvas.append("line")
        .attr("x1", xPosition - 60)
        .attr("y1", yPosition - 30)
        .attr("x2", xPosition - 75)
        .attr("y2", yPosition - 60)
        .attr("stroke", "black");

    canvas.append("line")
        .attr("x1", xPosition - 30)
        .attr("y1", yPosition - 30)
        .attr("x2", xPosition - 15)
        .attr("y2", yPosition - 60)
        .attr("stroke", "black");

    // ---------------- MOUTH (Closed Default) ----------------
    canvas.append("line")
        .attr("x1", xPosition - 55)
        .attr("y1", yPosition + 10)
        .attr("x2", xPosition - 35)
        .attr("y2", yPosition + 10)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // ---------------- FEET ----------------
    for (let j = 0; j < 4; j++) {
        canvas.append("circle")
            .attr("cx", xPosition + j * 50)
            .attr("cy", yPosition + 30)
            .attr("r", 4)
            .attr("fill", "black");
    }

    // ---------------- ORIGIN POINT ----------------
    if (showOrigin === true) {
        canvas.append("circle")
            .attr("cx", xPosition)
            .attr("cy", yPosition)
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    // Return the modified canvas
    return canvas;
}