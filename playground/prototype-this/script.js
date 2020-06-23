const button1 = document.querySelector('.one');
const button2 = document.querySelector('.two');

// function tellMeAboutThis() {
//   setTimeout(() => (this.innerText = 'You clicked me'), 1000);
// }

// button1.addEventListener('click', tellMeAboutThis);
// button2.addEventListener('click', tellMeAboutThis);

String.prototype.sarcastic = function() {
  const sarcastic = this.split('').map((char, i) => {
    if (i % 2) {
      return char.toUpperCase();
    } else {
      return char.toLocaleLowerCase();
    }
  });
  return sarcastic.join('');
};

function Pizza(toppings = [], customer) {
  this.toppings = toppings;
  this.customer = customer;
  this.id = Math.floor(Math.random() * 16777215).toString(16);
  this.slice = 10;
}

Pizza.prototype.eat = function() {
  if (this.slice > 0) {
    console.log('CHOMP');
    this.slice--;
  } else {
    console.log('NO MO!');
  }
  return this.slice;
};

Pizza.prototype.describe = function() {
  // for __ with toppings ___ with ____slices

  let toppingsString = this.toppings.map((topping) => `${topping}, `);

  return `This pizza with ${this.toppings.join(',')} is for ${
    this.customer
  } and has ${this.slice} slices left`;
};

let peperoni = new Pizza(['peperoni'], 'chris');
let canadianPizza = new Pizza(['peperoni', 'mushroom', 'onion'], 'Miranda');
console.log(peperoni);
console.log(canadianPizza);

function Dog(name, breed = 'Poodle', age) {
  this.name = name;
  this.breed = breed;
  this.age = age;
}

Dog.prototype.bark = function() {
  console.log('WOOF!');
};

Dog.prototype.growUp = function() {
  this.age = this.age + 1;
  console.log('A year passes....');
  return this.age;
};

Dog.prototype.describe = function() {
  console.log(
    `${this.name} is a ${this.breed} and they are ${this.age} years old`
  );
};

const lucy = new Dog('Lucy', 'Golden Doodle', 1);

function Gallery(gallery) {
  this.images;

  // needs an initialize function that runs on... initialization! Should add event listeners from prototypes
}
