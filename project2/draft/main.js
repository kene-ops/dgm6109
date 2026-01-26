"use strict"

let item1, item2, zipCode;

/* IC: We have set up the form buttons for you, as well as the code that will clear the output once the user has successfully filled out the form and the program has given them final output (instead of telling them they need to correct something). We have set things up so that the output area is cleared, but the form remains filled out. This is to make it easier to test your project with slightly different versions of information rather than having to fill out the whole form every time. */

document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

function processForm() {

    /* IC: Assign values from your form inputs here, remembering:
        1) Always work with the value property from the form input

        2) Form data always comes in as type String. You MAY want to convert some inputs to Numbers, but you ALSO may need to analyze some numeric inputs as text (for example, if you need to check how many digits were entered, or only look at certain digits)

        3) You can do additional pre-processing here, if needed, but everything related to validating form input or providing results should go into the other functions provided below OR by functions that those other functions call (which you may also write)
    */
   item1 = document.getElementById("item1").value;
   item2 = document.getElementById("item2").value;
   zipCode = document.getElementById("zip").value;
   

    let evaluationCompleted = false;

    if (validateData()) {
        evaluationCompleted = evaluateAnswers();
    }

    if (evaluationCompleted) {
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    } else {
        rule();
    }
}

function validateData() {
    let valid = true

/* ZIP must be exactly 5 characters */
    if (zipCode.length !== 5) {
        output("please enter a five-digit ZIP code");
        return false;
    }

/* Check that ZIP contains only numbers */

    if (isNaN(zipCode)) {
        output("ZIP code must contain only numbers.");
        return false;
}

/* check that selected items are not the same*/
    if (item1 === item2){
        output("Please select two different items for your meal combo");
        return false;
    }
}

function evaluateAnswers() {

    let zipNum = Number(zipCode);

/* Virgin Islands is an exception */    
    if (zipNum >= 801 && zipNum <= 851 && zipCode.startsWith("00")) {
        output("Unfortunately, ordering is not yet available in the Virgin Island.");
        return false;
    }
    
    let price = 0;
    let discountApplied = false;

/* Item one prices */
    if (item1 ==="Pizza") price += 4.00;
    else if (item1 === "Salad") price += 3.00;
    else if (item1 === "Burger") price += 5.00;
    else if (item1 === "Fries") price += 2.00;

/* Item Two prices */
    if (item2 === "Pizza") price += 4.00;
    else if (item2 === "Salad") price += 3.00;
    else if (item2 === "Burger") price += 5.00;
    else if (item2 === "Fries") price += 2.00;

/* Discounts for Burger + Fries combo */
    if (
        (item1 === "Burger" && item2 === "Fries") ||
        (item1 === "Fries" && item2 === "Burger")
    ) {
        price *= 0.75;
        discountApplied = true;
    }

/* Format price */
    let finalPrice = price.toFixed(2);

/* Output result */
    let message = `Your ${item1} & ${item2} combo will be delivered to your address on file in ZIP code ${zipCode}. The total price will be $${finalPrice}.`;

    if (discountApplied) {
        message += " This includes a 25% discount for our current special combo.";
    }
    output(message);
    return true;
}
