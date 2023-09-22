const apiKey = 'ec25136b81468ccf1a841ecd'; // API koden jeg fikk av nettsiden
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const amountInput = document.getElementById('amount'); // Denne koden linker opp med htmlen og får teksten til og faktis ha en betydning
const currencySelect = document.getElementById('currency');
const convertButton = document.getElementById('convert'); // dette er buttonen du trykker for å converte pengene det koden her gjør her gjør at den gjør noe mer en å bare være en button
const resultSpan = document.getElementById('result');

// Fetch and populate currency options
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.conversion_rates);
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
                const exchangeRate = data.conversion_rates[selectedCurrency];
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