document.addEventListener('DOMContentLoaded', () => {
    const sectionToggles = document.querySelectorAll('input[type="checkbox"][id^="toggle-"]');
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"], input[type="number"]');

    sectionToggles.forEach((toggle) => {
        toggle.addEventListener('change', toggleSection);
    });

    inputs.forEach((input) => {
        input.addEventListener('change', calculatePrice);
    });

    calculatePrice();
});

function toggleSection(event) {
    const sectionId = event.target.id.replace('toggle-', '');
    const section = document.getElementById(`${sectionId}-options`);
    section.style.display = event.target.checked ? 'block' : 'none';
    calculatePrice();
}

function calculatePrice() {
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const inputs = document.querySelectorAll('input[type="number"]');

    let totalPrice = 0;
    let subtotalInteriorRevit = 0;
    let subtotalInteriorNoRevit = 0;
    let subtotalExteriorRevit = 0;
    let subtotalExteriorNoRevit = 0;
    let subtotalAmenities = 0;

    radios.forEach((radio) => {
        const price = parseFloat(radio.getAttribute('data-price'));
        const unitsInput = document.getElementById(`units-${radio.id}`);
        const units = parseInt(unitsInput.value);
        const itemTotal = price * units;

        totalPrice += itemTotal;

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

    checkboxes.forEach((checkbox) => {
        if (!checkbox.id.startsWith('toggle-')) {
            const price = parseFloat(checkbox.getAttribute('data-price'));
            const unitsInput = document.getElementById(`units-${checkbox.id}`);
            const units = parseInt(unitsInput.value);
            const itemTotal = price * units;

            totalPrice += itemTotal;

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

    document.getElementById('subtotal-interior-revit').innerText = formatNumberWithCommas(subtotalInteriorRevit.toFixed(2));
    document.getElementById('subtotal-interior-no-revit').innerText = formatNumberWithCommas(subtotalInteriorNoRevit.toFixed(2));
    document.getElementById('subtotal-exterior-revit').innerText = formatNumberWithCommas(subtotalExteriorRevit.toFixed(2));
    document.getElementById('subtotal-exterior-no-revit').innerText = formatNumberWithCommas(subtotalExteriorNoRevit.toFixed(2));
    document.getElementById('subtotal-amenities').innerText = formatNumberWithCommas(subtotalAmenities.toFixed(2));
    document.getElementById('total-price').innerText = formatNumberWithCommas(totalPrice.toFixed(2));
}

function clearSelection(sectionName) {
    const radios = document.querySelectorAll(`input[name="${sectionName}"]`);
    radios.forEach((radio) => {
        radio.checked = false;
    });
    calculatePrice();
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}