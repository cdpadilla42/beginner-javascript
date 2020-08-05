const selectFromCurrency = document.querySelector('[name="from_currency"]');
const selectToCurrency = document.querySelector('[name="to_currency"]');
const form = document.querySelector('.app form');
const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(([currencyCode, currencyName]) => {
      return `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`;
    })
    .join('');
}

async function getRates(currencyBase) {
  const fromCode = selectFromCurrency.value;
  const baseEndpoint = 'https://api.exchangeratesapi.io/latest';
  const result = await (await fetch(`${baseEndpoint}?base=${fromCode}`)).json();
  return result;
}

async function displayConversion(e) {
  e.preventDefault();
  const toCode = selectToCurrency.value;
  const fetchResults = await getRates();
  const rate = fetchResults.rates[toCode];
  const initialPrice = form.from_amount.value;
  const convertedPrice = (initialPrice * rate).toFixed(2);
  const toAmountEl = document.querySelector('.to_amount');
  toAmountEl.textContent = convertedPrice;
}

const optionsHTML = generateOptions(currencies);

// TODO append options to the selection fields
selectToCurrency.insertAdjacentHTML('beforeend', optionsHTML);
selectFromCurrency.insertAdjacentHTML('beforeend', optionsHTML);
form.addEventListener('change', displayConversion);
