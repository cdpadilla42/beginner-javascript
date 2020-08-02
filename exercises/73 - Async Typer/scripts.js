const messages = document.querySelectorAll('[data-type]');

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomFromRange(min, max, randomNumber = Math.random()) {
  return randomNumber * (max - min) + min;
}

function typer() {
  messages.forEach(async (message) => {
    const { typeMin, typeMax } = message.dataset;
    let displayedMessage = '';
    // iterate over the string
    for (const letter of message.textContent) {
      displayedMessage += letter;
      message.textContent = displayedMessage;
      await wait(getRandomFromRange(typeMin, typeMax));
    }
  });
}

typer();
