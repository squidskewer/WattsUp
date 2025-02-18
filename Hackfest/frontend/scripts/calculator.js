// Appliance power consumption in watts
const appliancePower = {
    'fridge': 150,
    'washer': 500,
    'dryer': 3000,
    'dishwasher': 1800,
    'ac': 3500,
    'heater': 1500,
    'tv': 100,
    'computer': 200
};

function calculateCost() {
    // Get input values from the calculator.html
    const appliance = document.getElementById('appliance').value;
    const hours = parseFloat(document.getElementById('hours').value);
    const rate = parseFloat(document.getElementById('rate').value);

    // Calculate costs using simple math formulas
    const dailyKWh = (appliancePower[appliance] * hours) / 1000;
    const dailyCost = (dailyKWh * rate) / 100;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;

    // Display results
    document.getElementById('daily-cost').textContent = 
        `Daily Cost: $${dailyCost.toFixed(2)}`;
    document.getElementById('monthly-cost').textContent = 
        `Monthly Cost: $${monthlyCost.toFixed(2)}`;
    document.getElementById('yearly-cost').textContent = 
        `Yearly Cost: $${yearlyCost.toFixed(2)}`;
}

// Add event listener when document loads
document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.querySelector('.calculator-content button');
    calculateButton.addEventListener('click', calculateCost);
});
