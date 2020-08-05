import { colors } from './colors';

function logWords(results) {
  return results[results.length - 1][0].transcript;
}

export function handleResult({ results }) {
  const wordEls = Array.from(document.querySelectorAll('span'));
  const words = logWords(results);
  const colorsEl = document.querySelector('.colors');
  // console.log(wordEls);
  // lowercase everything
  // Eliminate spaces inbetween
  const filteredResult = words
    .toLowerCase()
    .trim()
    .split(' ')
    .join('');
  console.log(filteredResult);
  // strip any spaces out
  // check if it is a valid color
  // if it is, show the ui for that.
  if (colors[filteredResult]) {
    console.log(`Yes, we have ${filteredResult}`);
    const wordEl = wordEls.find(
      (element) => element.textContent === filteredResult
    );
    wordEl.classList.add('got');
    // add colored border to colors display
    colorsEl.style = `border: 3rem solid ${filteredResult}`;
  } else {
    console.log('nope, the color is not here');
  }
}
