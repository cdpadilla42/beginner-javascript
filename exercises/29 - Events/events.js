const butts = document.querySelectorAll('button');

// butts.forEach((butt) =>
//   butt.addEventListener('click', () => console.log('Ya got me'))
// );

const buyButtons = document.querySelectorAll('button.buy');

function handleBuyButtonClick(e) {
  // console.log(`You are paying ${e.target.dataset.price}`);
  // console.log(e.target);
  // console.log(e.currentTarget);
  console.log('you clicked a button');
}

buyButtons.forEach((buyButton) => {
  buyButton.addEventListener('click', handleBuyButtonClick);
});

window.addEventListener(
  'click',
  (e) => {
    console.log('You clicked the window! 🎉');
    // e.stopPropagation();
  },
  { capture: true }
);

const photoEl = document.querySelector('.photo');

photoEl.addEventListener('mousemove', function(e) {
  console.count(e.currentTarget);
  console.log(this);
});
