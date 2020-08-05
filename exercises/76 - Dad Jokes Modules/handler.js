import { fetchJoke } from './lib.js';
import { randomItemFromArray } from './utils.js';
import { loader, jokeButton, jokeHolder } from './elements.js';
import buttonText from './button-text.js';

export async function handleClick() {
  showLoader();
  const { joke } = await fetchJoke();
  const sarcasm = randomItemFromArray(buttonText, jokeButton.textContent);
  jokeHolder.textContent = joke;
  jokeButton.firstElementChild.textContent = sarcasm;
  hideLoader();
}

function showLoader() {
  loader.classList.remove('hide');
}

function hideLoader() {
  loader.classList.add('hide');
}
