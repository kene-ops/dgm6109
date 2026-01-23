"use strict";

document.getElementById("submit")
.addEventListener("click", function() {
let fahrenheit = number(fahrenheit).value; //this is the temperature in enugu state, nigeria, in march 2023
let conversionType = document.getElementById(conversionChoice).value;

let celsuis = (fahrenheit - 32) * 5 / 9
let kelvin = (fahrenheit + 459.67) * 5 / 9

output("Temperature kelvin" + ': ' + kelvin)
output("Temperature celsuis" + ': ' + celsuis)
output("Temperature fehrenheit" + ': ' + fahrenheit)

});
let celcius = (fahrenheit - 32) * 5/ 9;
let kelvin = celcius + 273.15;
output("original temperature:" + fahrenheit + "° Fahrenheit");

if (conversionType === "c") {
    output("converted temperature:" + celcius +"° Celsius" );
}

if (conversionType === "k") {
    output ("converted temperature:" + kelvin + "Kelvin");
}

/* 
if (conversionType === "c") {
output("converted temperature:" + celsuis "celcius");
}
if (conversionType === "k") {
output ("converted temperature:" + "kelvin");
}
*/

output ("original temperature:"  + fahrenheit + "fahrenheit");
if (conversionType === "c") {
    output("convert temperature:" + celsius + "celcius");
} else {
    output ("converted temperature:" + kelvin + "kelvin");
}
