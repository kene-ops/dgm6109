"use strict";

/**
 * Draws an elephant using SVG shapes.
 *
 * @param {Object} svg - The SVG drawing area to draw into.
 * @param {number} x - Horizontal position of the drawing origin.
 * @param {number} y - Vertical position of the drawing origin.
 * @param {boolean} showOrigin - Whether to display the origin point.
 * @param {string} earStyle - Determines whether ears are flared or normal.
 * @returns {Object} The modified SVG drawing area.
 */
function elephant(svg, x, y, showOrigin, earStyle) {

    let elephantX = x;
    let elephantY = y;

    // LEFT EAR
    svg.append("polygon")
        .attr("points", closedPolygon(
            elephantX + 35, elephantY + 60,
            elephantX + 110, elephantY + 75,
            elephantX + 100, elephantY + 195,
            elephantX + 70, elephantY + 180
        ))
        .attr("fill", "#D3D3D3");

    // RIGHT EAR
    svg.append("polygon")
        .attr("points", closedPolygon(
            elephantX + 435, elephantY + 60,
            elephantX + 325, elephantY + 75,
            elephantX + 370, elephantY + 195,
            elephantX + 395, elephantY + 190
        ))
        .attr("fill", "#D3D3D3");

    // BACK EARS
    svg.append("circle")
        .attr("cx", elephantX + 75)
        .attr("cy", elephantY + 70)
        .attr("r", 50)
        .attr("fill", "#D3D3D3");

    svg.append("circle")
        .attr("cx", elephantX + 385)
        .attr("cy", elephantY + 70)
        .attr("r", 50)
        .attr("fill", "#D3D3D3");

    // TUSKS
    svg.append("polygon")
        .attr("points", closedPolygon(
            elephantX, elephantY + 120,
            elephantX, elephantY + 160,
            elephantX, elephantY + 130
        ))
        .attr("fill", "#D3D3D3");

    svg.append("polygon")
        .attr("points", closedPolygon(
            elephantX + 150, elephantY + 120,
            elephantX + 150, elephantY + 160,
            elephantX + 170, elephantY + 130
        ))
        .attr("fill", "#D3D3D3");

    // HEAD
    svg.append("circle")
        .attr("cx", elephantX + 15)
        .attr("cy", elephantY + 50)
        .attr("r", 75)
        .attr("fill", "gray");

    svg.append("circle")
        .attr("cx", elephantX + 130)
        .attr("cy", elephantY + 50)
        .attr("r", 75)
        .attr("fill", "gray");

    svg.append("rect")
        .attr("x", elephantX)
        .attr("y", elephantY)
        .attr("width", 150)
        .attr("height", 120)
        .attr("fill", "gray");

    // EYES
    svg.append("circle")
        .attr("cx", elephantX + 15)
        .attr("cy", elephantY + 60)
        .attr("r", 20)
        .attr("fill", "white");

    svg.append("circle")
        .attr("cx", elephantX + 135)
        .attr("cy", elephantY + 60)
        .attr("r", 20)
        .attr("fill", "white");

    svg.append("circle")
        .attr("cx", elephantX + 15)
        .attr("cy", elephantY + 65)
        .attr("r", 8);

    svg.append("circle")
        .attr("cx", elephantX + 135)
        .attr("cy", elephantY + 65)
        .attr("r", 8);

    // TRUNK
    svg.append("rect")
        .attr("x", elephantX + 40)
        .attr("y", elephantY + 100)
        .attr("width", 70)
        .attr("height", 110)
        .attr("fill", "gray");

    svg.append("line")
        .attr("x1", elephantX + 40)
        .attr("y1", elephantY + 135)
        .attr("x2", elephantX + 110)
        .attr("y2", elephantY + 145)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    svg.append("line")
        .attr("x1", elephantX + 40)
        .attr("y1", elephantY + 160)
        .attr("x2", elephantX + 110)
        .attr("y2", elephantY + 170)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    svg.append("line")
        .attr("x1", elephantX + 40)
        .attr("y1", elephantY + 185)
        .attr("x2", elephantX + 110)
        .attr("y2", elephantY + 195)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // EAR STYLE (FLARED OR NORMAL)
    if (earStyle === "flared") {
        svg.append("polygon")
            .attr("points", closedPolygon(
                elephantX - 80, elephantY + 10,
                elephantX - 10, elephantY + 25,
                elephantX - 20, elephantY + 145,
                elephantX - 70, elephantY + 130
            ))
            .attr("fill", "#D3D3D3");
    } else {
        svg.append("polygon")
            .attr("points", closedPolygon(
                elephantX - 50, elephantY + 10,
                elephantX - 10, elephantY + 25,
                elephantX - 20, elephantY + 145,
                elephantX - 40, elephantY + 130
            ))
            .attr("fill", "#D3D3D3");
    }

    // ORIGIN POINT
    if (showOrigin) {
        svg.append("circle")
            .attr("cx", elephantX)
            .attr("cy", elephantY)
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return svg;
}
