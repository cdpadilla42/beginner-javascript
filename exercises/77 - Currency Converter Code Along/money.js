const selectFromCurrency = document.querySelector('[name="from_currency"]');
const selectToCurrency = document.querySelector('[name="to_currency"]');
const amountEl = document.querySelector('[name="from_amount"]');
const toEl = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
const endpoint = 'https://api.exchangeratesapi.io/latest';
const ratesByBase = {};
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

async function getRates(base = 'USD') {
  const fromCode = selectFromCurrency.value;

  const rates = await (await fetch(`${endpoint}?base=${base}`)).json();
  return rates;
}

async function convert(amount, from, to) {
  // first check if we even have the rates to convert from that currency
  if (!ratesByBase[from]) {
    console.log(`Oh no! We don't have ${from} to conver to ${to} so lesgo`);
    // fetch data
    const data = await getRates(from);
    // cache it
    ratesByBase[from] = data.rates;
    console.log('rates', data.rates);
    console.log('cache', ratesByBase);
  }
  // convert amount
  const rate = ratesByBase[from][to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput(e) {
  const rawAmount = await convert(
    amountEl.value,
    selectFromCurrency.value,
    selectToCurrency.value
  );

  toEl.textContent = formatCurrency(rawAmount, selectToCurrency.value);
}

const optionsHTML = generateOptions(currencies);

// TODO append options to the selection fields
selectToCurrency.insertAdjacentHTML('beforeend', optionsHTML);
selectFromCurrency.insertAdjacentHTML('beforeend', optionsHTML);
form.addEventListener('input', handleInput);
