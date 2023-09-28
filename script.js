const apiKey = 'ec25136b81468ccf1a841ecd'; // Replace with your API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const amountInput = document.getElementById('amount'); 
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const convertButton = document.getElementById('convert');
const resultSpan = document.getElementById('result');
const historyList = document.getElementById('history'); // Add this line

let data;
let conversionHistory = []; // Add this array to store conversion history

fetch(apiUrl)
    .then(response => response.json())
    .then(responseData => {
        data = responseData;
        const currencies = Object.keys(data.conversion_rates);

        currencies.forEach(currency => {
            fromSelect.appendChild(new Option(currency, currency));
            toSelect.appendChild(new Option(currency, currency));
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function convertCurrency() {
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount) && data.conversion_rates[fromCurrency] && data.conversion_rates[toCurrency]) {
        const exchangeRate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        resultSpan.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        
        // Store the conversion in history
        const conversionText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        addToHistory(conversionText);
    } else {
        resultSpan.textContent = 'Noe har skjedd. Sjekk koden din.';
    }
}

function addToHistory(conversionText) {
    conversionHistory.push(conversionText); // Add the conversion to the history array
    updateHistoryList(); // Update the history list
}

function updateHistoryList() {
    historyList.innerHTML = ''; // Clear the history list

    // Loop through the conversion history and create list items
    conversionHistory.forEach((conversion, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Conversion ${index + 1}: ${conversion}`;
        historyList.appendChild(listItem);
    });
}

convertButton.addEventListener('click', convertCurrency);