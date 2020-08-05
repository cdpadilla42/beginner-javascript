import wait from 'waait';
import { name } from 'faker';
import { formatDistance, format } from 'date-fns';
import axios from 'axios';

import { intersection } from 'lodash';

const fakeNames = Array.from({ length: 10 }, () => name.firstName());

async function go() {
  console.log('going');
  await wait(2000);
  console.log('ending');
}

const distance = formatDistance(
  new Date(1986, 3, 4, 10, 32, 0),
  new Date(1986, 3, 4, 11, 32, 0),
  { addSuffix: true }
);
console.log(distance);

const formatted = format(new Date(), `LLLL 'the' do',' y`);
console.log(formatted);

async function getJoke() {
  const response = await axios.get('https://icanhazdadjoke.com/', {
    headers: {
      accept: 'application/json',
    },
  });
  console.log(response);
}

getJoke();

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = [5, 3, 8, 3, 7, 452, 34];

const sameVals = intersection(a, b);
console.log(sameVals);
