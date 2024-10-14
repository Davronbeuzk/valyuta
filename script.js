const apiKey = '5e73b407f9623dcc90c8727c';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;



const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultElement = document.getElementById('result');
const button = document.querySelector('button');


fetch(`${apiUrl}USD`)
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach(currency => {
      const optionFrom = document.createElement('option');
      const optionTo = document.createElement('option');
      optionFrom.value = optionTo.value = currency;
      optionFrom.text = optionTo.text = currency;
      fromCurrencySelect.appendChild(optionFrom);
      toCurrencySelect.appendChild(optionTo);
    });
  })
  .catch(error => console.error('Error fetching currency data:', error));


button.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (!amount || !fromCurrency || !toCurrency) {
    resultElement.textContent = 'Please fill all fields!';
    return;
  }

  fetch(`${apiUrl}${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const conversionRate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * conversionRate).toFixed(2);
      resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    })
    .catch(error => console.error('Error during conversion:', error));
});
