const buttons = document.querySelectorAll('[data-question]');

async function wait(ms = 50) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ask(e) {
  createPopup(e.currentTarget.dataset);
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
}

async function createPopup(button) {
  return new Promise((resolve) => {
    const popup = document.createElement('form');
    // popup.insertAdjacentText('afterend', question);
    popup.classList.add('popup');
    popup.innerHTML = `
    <fieldset>
    <label>${button.title}</label>
    <input type="text" name="input"/>
    <button>Submit</button>
    </fieldset>
    `;

    // Chech for cancel button
    if ('cancel' in button) {
      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.innerText = 'Cancel';
      cancelButton.addEventListener('click', () => destroyPopup(popup));
      popup.firstElementChild.appendChild(cancelButton);
    }
    popup.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        resolve(e.currentTarget.input.value);
        destroyPopup(e.currentTarget);
      },
      { once: true }
    );

    document.body.appendChild(popup);
    setTimeout(() => {
      popup.classList.add('open');
    }, 50);
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', ask);
});

const questions = [
  { title: 'What is your name?' },
  { title: 'What is your age?', cancel: true },
  { title: 'What is your dogs name?' },
];

async function asyncMap(array, callback) {
  const results = [];

  for (const item of array) {
    const result = await callback(item);
    results.push(result);
  }

  return results;
}

async function go() {
  const results = await asyncMap(questions, createPopup);
  console.log(results);
}

go();
