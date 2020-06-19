// Make a div

let div = document.createElement('div');

// add a class of wrapper to it

div.classList.add('wrapper');

// put it into the body

document.body.appendChild(div);

// make an unordered list

let ul = document.createElement('ul');
let liOne = document.createElement('li');
let liTwo = document.createElement('li');
let liThree = document.createElement('li');

// add three list items with the words "one, two three" in them
liOne.innerText = 'one';
ul.appendChild(liOne);
liTwo.innerText = 'two';
ul.appendChild(liTwo);
liThree.innerText = 'three';
ul.appendChild(liThree);

// put that list into the above wrapper
div.appendChild(ul);

// create an image
let img = document.createElement('img');
img.src =
  'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png';

// set the source to an image
// set the width to 250
img.setAttribute('width', '250px');
// add a class of cute
img.classList.add('cute');
// add an alt of Cute Puppy
img.setAttribute('alt', 'Cute Puppy');
// Append that image to the wrapper
div.appendChild(img);

// with HTML string, make a div, with two paragraphs inside of it
let html = document.createElement('div');
html.innerHTML = '<p></p><p></p>';

// put this div before the unordered list from above
div.insertBefore(html, ul);

// add a class to the second paragraph called warning
html.lastChild.classList.add('warning');
// remove the first paragraph
html.firstChild.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height
function generatePlayerCard(name, age, height) {
  let div = document.createElement('div');
  div.innerHTML = `<h2> ${name} - ${age}</h2><p>They are ${height} and ${age} years old. In Dog years, this person would be ${age *
    7}. That would be a tall dog!</p><button>Delete</button>`;
  return div;
}
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

// make a new div with a class of cards
let cards = document.createElement('div');
// Have that function make 4 cards
let lucy = generatePlayerCard('Lucy', 1, '2 feet');
let miranda = generatePlayerCard('Miranda', 26, '6 feet');
let chris = generatePlayerCard('Chris', 28, '6 feet');
let margot = generatePlayerCard('Margot', 2, '1 feet');

// append those cards to the div
cards.appendChild(lucy);
cards.appendChild(miranda);
cards.appendChild(chris);
cards.appendChild(margot);
// put the div into the DOM just before the wrapper element
document.body.insertBefore(cards, div);
// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
let buttons = Array.from(document.querySelectorAll('button'));
// make out delete function
function deleteCard(deleteBtn) {
  deleteBtn.parentElement.remove();
}
// loop over them and attach a listener
buttons.forEach((btn) => {
  btn.addEventListener('click', () => deleteCard(btn));
});
