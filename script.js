const apiKey = 'YOUR_API_KEY'; // Replace with your Fixer.io API key
const apiUrl = `https://data.fixer.io/api/latest?base=USD&access_key=${apiKey}`;
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const convertButton = document.getElementById('convert');
const resultSpan = document.getElementById('result');

// Fetch and populate currency options
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.text = currency;
            option.value = currency;
            currencySelect.appendChild(option);
        });
    });

// Convert currency
convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const selectedCurrency = currencySelect.value;

    if (!isNaN(amount)) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const exchangeRate = data.rates[selectedCurrency];
                const convertedAmount = (amount * exchangeRate).toFixed(2);
                resultSpan.textContent = `${amount} USD = ${convertedAmount} ${selectedCurrency}`;
            })
            .catch(error => {
                console.error(error);
                resultSpan.textContent = 'Error fetching data. Please try again later.';
            });
    } else {
        resultSpan.textContent = 'Please enter a valid amount.';
    }
});