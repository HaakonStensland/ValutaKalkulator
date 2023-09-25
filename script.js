const apiKey = 'ec25136b81468ccf1a841ecd'; // API koden jeg fikk av nettsiden
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const changeSelect = document.getElementById('changeSelect');
const resultSpan = document.getElementById('result');

let data;

function updateConversion() {
    const amount = parseFloat(amountInput.value);
    const selectedChangeCurrency = changeSelect.value;
    const exchangeRate = data.conversion_rates[selectedChangeCurrency];

    if (!isNaN(amount) && data && exchangeRate) {
        const convertedAmount = (amount / exchangeRate).toFixed(2);
        resultSpan.textContent = `${amount} ${currencySelect.value} = ${convertedAmount} ${selectedChangeCurrency}`;
    } else {
        resultSpan.textContent = 'Conversion not possible. Please check your inputs.';
    }
}

fetch(apiUrl)
    .then(response => response.json())
    .then(responseData => {
        data = responseData;
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            currencySelect.appendChild(new Option(currency, currency));
            changeSelect.appendChild(new Option(currency, currency));
        });

        changeSelect.addEventListener('change', updateConversion);
        updateConversion();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        resultSpan.textContent = 'Error fetching currency data. Please try again later.';
    });