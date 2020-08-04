import { returnHi as sayHi, last } from './utils.js';
import wes from './wes.js';

import { handleButtonClick } from './handlers.js';

const button = document.querySelector('button');

button.addEventListener('click', handleButtonClick);
