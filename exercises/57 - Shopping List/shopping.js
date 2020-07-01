const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
const myStorage = localStorage;
// Array to hold our state

let items = [];

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

function displayItems() {
  const html = items
    .map((item) => {
      return `<li class="shopping-item">
      <input 
        type="checkbox" 
        value="${item.id}" 
        ${item.complete ? 'checked' : ''}
      />
      <span className="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}" value="${
        item.id
      }">&times;</button>
      </li>`;
    })
    .join('');
  list.innerHTML = html;
}

function mirrorDataToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const lstItems = JSON.parse(myStorage.getItem('items'));
  if (lstItems.length) {
    items.push(...lstItems);
  }
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function deleteItem(id) {
  console.log('deleting', id);
  const newItems = items.filter((item) => item.id !== id);
  items = newItems;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  console.log('marking', id);
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorDataToLocalStorage);
// Event delegation - We listen on the click on the list but then delegate the click over to the button that is what was clicked
list.addEventListener('click', (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) deleteItem(id);
  if (e.target.matches('input[type="checkbox"]')) markAsComplete(id);
});

restoreFromLocalStorage();
