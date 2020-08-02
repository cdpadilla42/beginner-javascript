const wait = (ms = 50) => new Promise((res) => setTimeout(res, ms));

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// async for of loop
// async function draw(el) {
//   const text = el.textContent;
//   let soFar = '';
//   for (const letter of text) {
//     // console.log(letter);
//     soFar += letter;
//     el.textContent = soFar;
//     // wait for some time
//     console.log(el.dataset);
//     const { typeMin, typeMax } = el.dataset;
//     const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
//     await wait(amountOfTimeToWait);
//   }
// }

// recursion
function draw(el) {
  let index = 1;
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;
  async function drawLetter() {
    if (index === text.length) return;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    el.textContent = text.slice(0, index);
    index++;
    await wait(amountOfTimeToWait);
    drawLetter(el);
  }

  drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);
