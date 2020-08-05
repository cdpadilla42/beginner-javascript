const jokeButton = document.querySelector('.getJoke');
const jokeHolder = document.querySelector('.joke p');
const loader = document.querySelector('.loader');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke() {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function handleClick() {
  showLoader();
  const { joke } = await fetchJoke();
  const sarcasm = randomItemFromArray(buttonText, jokeButton.textContent);
  jokeHolder.textContent = joke;
  jokeButton.firstElementChild.textContent = sarcasm;
  hideLoader();
}

function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) return randomItemFromArray(arr, not);
  return item;
}

function showLoader() {
  loader.classList.remove('hide');
}

function hideLoader() {
  loader.classList.add('hide');
}

// async function handleClick() {
//   console.log('fetching joke');
//   const { joke } = await fetchJoke();
//   jokeHolder.textContent = joke;
//   changeButtonText();
// }

// function changeButtonText() {
//   const currentText = jokeButton.textContent;
//   // exclude current value from pool of responses
//   const filteredText = buttonText.filter((text) => text !== currentText);
//   // randomly select an index
//   const newText = filteredText[randomWithinRange()];
//   // swap out button text
//   jokeButton.textContent = newText;
// }

// function randomWithinRange(min = 1, max = 7, random = Math.random()) {
//   return Math.floor(random * (max - min) + min);
// }

jokeButton.addEventListener('click', async () => await handleClick());
