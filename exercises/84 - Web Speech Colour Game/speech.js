import { handleResult } from './handlers';
import { colorsByLength, colors, isDark } from './colors';

const colorsContainer = document.querySelector('.colors');

function displayColors(colorsArr) {
  const colorDisplays = colorsArr.map(
    (color) => `
    <span style="background-color: ${colors[color]}" class="${
      isDark(color) ? 'dark' : ''
    }">${color}</span>
  `
  );
  console.log(colorsByLength);
  colorsContainer.innerHTML = colorDisplays.join('');
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function start() {
  // see if their browser supports this
  if (!window.SpeechRecognition) {
    console.log('sorry, browser does not support speech');
    return;
  }
  // Works!
  console.log('starting');

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

start();
displayColors(colorsByLength);
window.isDark = isDark;
