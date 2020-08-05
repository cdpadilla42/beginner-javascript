import { fetchJoke } from './index.js';
import { jokeHolder, jokeButtonSpan, loader } from './elements.js';
import { randomItemFromArray } from './utils.js';
import buttonText from '../data/button-text.js';

export async function handleClick() {
  const { joke } = await fetchJoke(loader);
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
}
