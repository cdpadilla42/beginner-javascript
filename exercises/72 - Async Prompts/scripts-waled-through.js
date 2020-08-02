function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  console.log(popup);
  popup = null;
  console.log(popup);
}

function ask(options) {
  // options - text of prompt, should they be able to cancel?
  return new Promise(async function(resolve) {
    // create a pop up with all the fields in it
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `
      <fieldset>
        <label>${options.title}</label>
        <input type="text" name="input"/>
        <button type="submit">Submit</button>
      </fieldset>
    `
    );

    console.log(popup);
    // check if they want a cancel button
    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      console.log(popup.firstElementChild);
      popup.firstElementChild.appendChild(skipButton);
      skipButton.addEventListener(
        'click',
        () => {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    // listen for the submit event on the inputs
    popup.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        resolve(e.target.input.value);
        // remove from dom
        destroyPopup(popup);
      },
      { once: true }
    );
    // when someone does submit it, we want to resolve the data in the input box

    // Insert popup to DOM
    document.body.appendChild(popup);
    // set timeout
    await wait(50);
    popup.classList.add('open');
  });
}

async function askQuestion(e) {
  const button = e.currentTarget;
  const shouldCancel = button.hasAttribute('data-cancel');
  const answer = await ask({
    cancel: 'cancel' in button.dataset,
    title: button.dataset.question,
  });
}

// select all buttons with a question
const buttons = document.querySelectorAll('[data-question]');
buttons.forEach((button) => {
  button.addEventListener('click', askQuestion);
});

const questions = [
  { title: 'What is your name?' },
  { title: 'What is your age?', cancel: true },
  { title: 'What is your dogs name?' },
];

// const answers = Promise.all([
//   ask(questions[0]),
//   ask(questions[1]),
//   ask(questions[2]),
// ]).then(console.log(answers));

// Promise.all(questions.map(ask)).then((data) => {
//   console.log(data);
// });

// questions.forEach(async (question) => {
//   console.log('Asking question');
//   console.log(question);
//   const answer = await ask(question);
//   console.log(answer);
// });

async function asyncMap(array, callback) {
  // make array to store results
  const results = [];
  // loop over array;
  for (const item of array) {
    const result = await callback(item);
    results.push(result);
  }

  return results;
}

// async function askMany() {
//   for (const question of questions) {
//     const answer = await ask(question);
//     console.log(answer);
//   }
// }

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
