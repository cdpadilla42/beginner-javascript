const baseEndpoint = 'http://www.recipepuppy.com/api/';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');
async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
  const data = await res.json();
  return data;
}

async function handleSubmit(e) {
  e.preventDefault();
  const el = e.currentTarget;
  const value = e.currentTarget.query.value;
  fetchAndDisplay(value);
}

async function fetchAndDisplay(query) {
  // turn form off
  form.firstElementChild.disabled = 'true';
  // submit search
  const recipes = await fetchRecipes(query);
  // turn on form
  form.firstElementChild.disabled = false;
  displayRecipes(recipes.results);
}

function displayRecipes(recipes) {
  console.log('creating html');
  console.log(recipes);
  const html = recipes.map((recipe) => {
    return `<div class="recipe">
      <h2>${recipe.title}</h2>
      <p>${recipe.ingredients}</p>
      ${recipe.thumbnail &&
        `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
        <a href="${recipe.href}">View Recipe</a>
    </div>`;
  });
  // html.forEach((thisHTML) => form.insertAdjacentHTML('afterend', thisHTML));
  recipesGrid.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);

// on page load, run it with pizza
fetchAndDisplay('pizza');
