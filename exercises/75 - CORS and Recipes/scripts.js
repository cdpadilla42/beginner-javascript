const corsEndpoint = 'https://cors-anywhere.herokuapp.com/';
// const baseEndpoint = 'http://www.recipepuppy.com/api';
const baseEndpoint = 'http://www.recipepuppy.com/api';
// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
const form = document.querySelector('form.search');

function handleSubmit(e) {
  e.preventDefault();
  console.log('submitting');
  const query = e.currentTarget.query.value;
  fetchRecipe(query);
}

async function fetchRecipe(query) {
  console.log('fetching data');
  form.firstElementChild.disabled = true;
  form.submit.textContent = 'Loading...';
  const queryEndpoint = `${corsEndpoint}${baseEndpoint}/?q=${query}`;
  const results = await (await fetch(queryEndpoint)).json();
  form.firstElementChild.disabled = false;
  form.submit.textContent = 'Submit';
  renderRecipes(results.results);
}

function renderRecipes(recipes) {
  const recipesGrid = document.querySelector('.recipes');
  const recipeHTML = recipes.map((recipe) => {
    console.log(recipe);
    return `<div>
      <h2>${recipe.title}</h2>
      <p>${recipe.ingredients}</p>
      <a href="${recipe.href}">Go to recipe</a>
      ${recipe.thumbnail &&
        `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
    </div>`;
  });
  recipesGrid.innerHTML = recipeHTML.join('');
}

form.addEventListener('submit', handleSubmit);

fetchRecipe('ham');
