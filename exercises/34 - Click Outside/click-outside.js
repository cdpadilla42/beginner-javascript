const cardButtons = Array.from(document.querySelectorAll('.card button'));
const modal = document.querySelector('.modal-outer');

function fillModal(button) {
  const innerModal = modal.querySelector('.modal-inner');
  const card = button.closest('.card');
  const imgSrc = card.querySelector('img').src;
  const title = card.querySelector('h2').textContent;
  const desc = card.dataset.description;
  const headingElm = document.createElement('h2');
  const imgElm = document.createElement('img');
  innerModal.innerHTML = `
    <img src="${imgSrc.replace('200', '600')}" alt="${title}"
    <p>${desc}</p>
  `;
}

function openModal(e) {
  fillModal(e.target);
  modal.classList.add('open');
}

function closeModal(e) {
  if (e.currentTarget == e.target) {
    modal.classList.remove('open');
  }
}

// Event Listeners

modal.addEventListener('click', closeModal);

cardButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});
