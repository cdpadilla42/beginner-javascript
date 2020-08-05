import { generateOptions } from './utils.js';
import currencies from './currencies.js';
import { handleInput } from './handlers.js';
import { form, fromSelect, toSelect } from './elements.js';

export function init() {
  // when page loads, run this code

  const optionsHTML = generateOptions(currencies);
  // populate the options elements
  fromSelect.innerHTML = optionsHTML;
  toSelect.innerHTML = optionsHTML;

  form.addEventListener('input', handleInput);
}
