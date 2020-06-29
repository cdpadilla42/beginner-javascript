const person = {
  name: 'Chris',
  sayHi() {
    return `hey ${this.name}`;
  },
};

const jenna = { name: 'jenna' };

const sayHi = person.sayHi.bind(jenna);

// Query selector example

const $ = document.querySelector.bind(document);

const bill = {
  total: 1000,
  calculate(taxRate) {
    return this.total + this.total * taxRate;
  },
  describe(meal, drink, taxrate) {
    return `Your meal of ${meal} and a ${drink} is ${this.calculate(taxrate)}`;
  },
};

const total = bill.calculate(0.13);
console.log(total);

const calc = bill.calculate.bind(bill, 0.06);
console.log(calc());

const total2 = bill.calculate.call(bill, 0.06);
console.log(total2);

const total3 = bill.calculate.apply([bill, 0.06]);
console.log(total2);

const myMeal = bill.describe.call(bill, 'pizza', 'soda', 0.13);
console.log(myMeal);
