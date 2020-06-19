function Gallery(gallery) {
  if (!gallery) throw new Error('No Gallery Found!');

  // select elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevBttn = modal.querySelector('.prev');
  const nextBttn = modal.querySelector('.next');
  let currentImg;

  function handleClickOutside(e) {
    console.log(e);
    if (e.target == e.currentTarget) {
      closeModal();
    }
  }

  function showImage(el) {
    if (!el) {
      console.log('no image passed!');
      return;
    }
    currentImg = el;
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').innerText = el.title;
    modal.querySelector('p').innerText = el.dataset.description;
    openModal();
  }

  function openModal() {
    // check if it is already open
    if (modal.matches('.open')) {
      console.info('modal already open');
      return;
    }
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO add event listeners for clicks and keyboards...
  }

  // Event Listeners
  modal.addEventListener('click', handleClickOutside);

  images.forEach((img) => {
    img.addEventListener('click', (e) => {
      showImage(e.currentTarget);
    });
  });
}

// Use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
