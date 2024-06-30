// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all checkbox inputs that toggle sections
    const sectionToggles = document.querySelectorAll('input[type="checkbox"][id^="toggle-"]');
    // Select all radio, checkbox, and number inputs
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"], input[type="number"]');

    // Add change event listeners to section toggles to show/hide sections
    sectionToggles.forEach((toggle) => {
        toggle.addEventListener('change', toggleSection);
    });

    // Add change event listeners to all inputs to recalculate price on change
    inputs.forEach((input) => {
        input.addEventListener('change', calculatePrice);
    });

    // Initial calculation of the price when the page loads
    calculatePrice();
});

// Function to show or hide a section based on the checkbox state
function toggleSection(event) {
    const sectionId = event.target.id.replace('toggle-', ''); // Extract section ID
    const section = document.getElementById(`${sectionId}-options`); // Get section element
    section.style.display = event.target.checked ? 'block' : 'none'; // Show or hide section
    calculatePrice(); // Recalculate the price
}

// Function to calculate the total price and update the UI
function calculatePrice() {
    // Select all checked radio buttons and checkboxes, and all number inputs
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const inputs = document.querySelectorAll('input[type="number"]');

    let totalPrice = 0;
    let subtotalInteriorRevit = 0;
    let subtotalInteriorNoRevit = 0;
    let subtotalExteriorRevit = 0;
    let subtotalExteriorNoRevit = 0;
    let subtotalAmenities = 0;

    // Calculate price for checked radio buttons
    radios.forEach((radio) => {
        const price = parseFloat(radio.getAttribute('data-price')); // Get price from data attribute
        const unitsInput = document.getElementById(`units-${radio.id}`); // Get corresponding units input
        const units = parseInt(unitsInput.value); // Get number of units
        const itemTotal = price * units; // Calculate item total

        totalPrice += itemTotal; // Add to total price

        // Add item total to the appropriate subtotal
        if (radio.name === 'interior-revit') {
            subtotalInteriorRevit += itemTotal;
        } else if (radio.name === 'interior-no-revit') {
            subtotalInteriorNoRevit += itemTotal;
        } else if (radio.name === 'exterior-revit') {
            subtotalExteriorRevit += itemTotal;
        } else if (radio.name === 'exterior-no-revit') {
            subtotalExteriorNoRevit += itemTotal;
        }
    });

    // Calculate price for checked checkboxes
    checkboxes.forEach((checkbox) => {
        if (!checkbox.id.startsWith('toggle-')) { // Ignore section toggles
            const price = parseFloat(checkbox.getAttribute('data-price')); // Get price from data attribute
            const unitsInput = document.getElementById(`units-${checkbox.id}`); // Get corresponding units input
            const units = parseInt(unitsInput.value); // Get number of units
            const itemTotal = price * units; // Calculate item total

            totalPrice += itemTotal; // Add to total price

            // Add item total to the appropriate subtotal
            if (checkbox.id.includes('revisions')) {
                if (checkbox.id.includes('revit')) {
                    if (checkbox.id.includes('interior')) {
                        subtotalInteriorRevit += itemTotal;
                    } else {
                        subtotalExteriorRevit += itemTotal;
                    }
                } else {
                    if (checkbox.id.includes('interior')) {
                        subtotalInteriorNoRevit += itemTotal;
                    } else {
                        subtotalExteriorNoRevit += itemTotal;
                    }
                }
            } else {
                subtotalAmenities += itemTotal;
            }
        }
    });

<<<<<<< HEAD
    // Update the UI with the calculated subtotals and total price
=======
>>>>>>> 82a567345fbf97aea7303704756823c5adf81d06
    document.getElementById('subtotal-interior-revit').innerText = formatNumberWithCommas(subtotalInteriorRevit.toFixed(2));
    document.getElementById('subtotal-interior-no-revit').innerText = formatNumberWithCommas(subtotalInteriorNoRevit.toFixed(2));
    document.getElementById('subtotal-exterior-revit').innerText = formatNumberWithCommas(subtotalExteriorRevit.toFixed(2));
    document.getElementById('subtotal-exterior-no-revit').innerText = formatNumberWithCommas(subtotalExteriorNoRevit.toFixed(2));
    document.getElementById('subtotal-amenities').innerText = formatNumberWithCommas(subtotalAmenities.toFixed(2));
    document.getElementById('total-price').innerText = formatNumberWithCommas(totalPrice.toFixed(2));
}

// Function to clear the selection of a given section
function clearSelection(sectionName) {
    const radios = document.querySelectorAll(`input[name="${sectionName}"]`); // Select all radio buttons in the section
    radios.forEach((radio) => {
        radio.checked = false; // Uncheck each radio button
    });
<<<<<<< HEAD
    calculatePrice(); // Recalculate the price
}

// Function to format a number with commas
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to the number
=======
    calculatePrice();
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
>>>>>>> 82a567345fbf97aea7303704756823c5adf81d06
}