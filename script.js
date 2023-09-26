  const apiKey = 'ec25136b81468ccf1a841ecd'; // Replace with your API key
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
        const amountInput = document.getElementById('amount');
        const fromSelect = document.getElementById('from');
        const toSelect = document.getElementById('to');
        const convertButton = document.getElementById('convert');
        const resultSpan = document.getElementById('result');
        let data;

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
            } else {
                resultSpan.textContent = 'Conversion not possible. Please check your inputs.';
            }
        }

        convertButton.addEventListener('click', convertCurrency);