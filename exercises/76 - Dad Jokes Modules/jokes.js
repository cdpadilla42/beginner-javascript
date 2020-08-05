import { jokeButton } from './elements.js';
import { handleClick } from './handler.js';

jokeButton.addEventListener('click', async () => await handleClick());
