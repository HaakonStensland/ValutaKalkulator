const apiKey = 'ec25136b81468ccf1a841ecd'; // API koden jeg fikk av nettsiden
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const convertButton = document.getElementById('convert');
const ChangeButton = document.getElementById('Change');
const resultSpan = document.getElementById('result');
let data; // Declare a variable to store the fetched data


fetch(apiUrl)
    .then(response => response.json())
    .then(responseData => {
        data = responseData; 
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.text = currency;
            option.value = currency;
            currencySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error(error);
        resultSpan.textContent = 'Error fetching currency data. Please try again later.';
    });


convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const selectedCurrency = currencySelect.value;

    if (!isNaN(amount)) {
        if (data) {
            const exchangeRate = data.conversion_rates[selectedCurrency];
            if (exchangeRate) {
                const convertedAmount = (amount * exchangeRate).toFixed(2);
                resultSpan.textContent = `${amount} USD = ${convertedAmount} ${selectedCurrency}`;
            } else {
                resultSpan.textContent = 'Selected currency rate not available.';
            }
        } else {
            resultSpan.textContent = 'Currency data not available. Please try again later.';
        }
    } else {
        resultSpan.textContent = 'Please enter a valid amount.';
    }
});