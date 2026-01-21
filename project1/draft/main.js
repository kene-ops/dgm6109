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

  <polygon points="45,100 125,125 125,230 85,230" fill="#D3D3D3" />
  <polygon points="455,100 375,125 375,230 415,230" fill="#D3D3D3" />

  <polygon points="175,220 175,260 155,230" fill="#FFFFE0" />
  <polygon points="325,220 325,260 345,230" fill="#FFFFE0" />

  <rect x="215" y="200" width="70" height="110" fill="#808080" />
  <line x1="215" y1="235" x2="285" y2="245" stroke="black" stroke-width="1" />
  <line x1="215" y1="260" x2="285" y2="270" stroke="black" stroke-width="1" />
  <line x1="215" y1="285" x2="285" y2="295" stroke="black" stroke-width="1" />

  <circle cx="175" cy="150" r="75" fill="#808080" />
  <circle cx="325" cy="150" r="75" fill="#808080" />
  <rect x="175" y="100" width="150" height="120" fill="#808080" />

  <ellipse cx="190" cy="160" rx="20" ry="25" fill="white" />
  <ellipse cx="190" cy="165" rx="8" ry="10" fill="black" />
  
  <ellipse cx="310" cy="160" rx="20" ry="25" fill="white" />
  <ellipse cx="310" cy="165" rx="8" ry="10" fill="black" />
</svg>