// Constants
const rates = {};
const rateUSD = document.querySelector('[data-value="USD"]');
const rateEUR = document.querySelector('[data-value="EUR"]');
const rateGBP = document.querySelector('[data-value="GBP"]');
const select = document.querySelector('#select');
const input = document.querySelector('#input');
const resultInput = document.querySelector('#result');
const inputValue = parseInt(input.value);

getCurrencies();

async function getCurrencies() {

    // API
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    // Add items to object "rates"
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    
    // Const of valute rates
    const valueUSD = rates.USD.Value;
    const valueEUR = rates.EUR.Value;
    const valueGBP = rates.GBP.Value;

    // Add content to valute rates 
    rateUSD.textContent = valueUSD.toFixed(2);
    rateEUR.textContent = valueEUR.toFixed(2);
    rateGBP.textContent = valueGBP.toFixed(2);

    // Red or green
    valueUSD < rates.USD.Previous ? rateUSD.classList.add('bottom') : rateUSD.classList.add('top');
    valueEUR < rates.EUR.Previous ? rateEUR.classList.add('bottom') : rateEUR.classList.add('top');
    valueGBP < rates.GBP.Previous ? rateGBP.classList.add('bottom') : rateGBP.classList.add('top');

    // Convert
    const innerResult = function() {
        if (select.value === 'USD') {
            let n = (parseInt(input.value) / valueUSD).toFixed(2);
            resultInput.value = n;
        }
        if (select.value === 'EUR') {
            let n = (parseInt(input.value) / valueEUR).toFixed(2);
            resultInput.value = n;
        }
        if (select.value === 'GBP') {
            let n = (parseInt(input.value) / valueGBP).toFixed(2);
            resultInput.value = n;
        }
    }

    input.addEventListener('input', innerResult);
    select.addEventListener('change', innerResult);
 
}