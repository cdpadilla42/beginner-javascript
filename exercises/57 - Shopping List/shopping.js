const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
const myStorage = localStorage;
// Array to hold our state

const items = JSON.parse(myStorage.getItem('items')) || [];

// listen for submit event on form

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value.trim();
  if (!name) return;

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  items.push(item);
  console.log(`There are now ${items.length} items in your state`);
  e.currentTarget.reset();
  // fire off a custom event that will tell anyone else who cares that the items have been updated
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function handleDeleteItem(e) {
  console.log('deleting');
}

function displayItems() {
  const html = items
    .map((item) => {
      return `<li class="shopping-item"data-id="${item.id}">
      <input type="checkbox" />
      <span className="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}">&times;</button>
      </li>`;
    })
    .join('');
  list.innerHTML = html;
}

function mirrorDataToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

shoppingForm.addEventListener('submit', handleSubmit);
window.addEventListener('load', displayItems);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorDataToLocalStorage);
