function Gallery(gallery) {
  const modal = document.querySelector('.modal');
  const nextBttn = modal.querySelector('.next');
  const prevBttn = modal.querySelector('.prev');

  const images = Array.from(gallery.querySelectorAll('img'));
  let currentImage;

  function showImage(el) {
    if (!el) {
      console.info('No image passed');
      return;
    }
    currentImage = el;
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('p').textContent = el.dataset.description;
    openModal();
  }

  function showNextImg() {
    showImage(currentImage.nextElementSibling || images[0]);
  }

  function showPrevImg() {
    showImage(currentImage.previousElementSibling || images[images.length - 1]);
  }

  function handleClickOutside(e) {
    if (e.target == e.currentTarget) closeModal();
  }

  function openModal() {
    if (modal.matches('.open')) {
      console.info('Modal already open');
      return;
    }
    modal.classList.add('open');

    // Event Binding
    modal.addEventListener('click', handleClickOutside);
    nextBttn.addEventListener('click', showNextImg);
    prevBttn.addEventListener('click', showPrevImg);
    window.addEventListener('keyup', handleKeyUp);
  }

  function handleKeyUp(e) {
    if (e.key === 'ArrowLeft') return showPrevImg();
    if (e.key === 'ArrowRight') return showNextImg();
    if (e.key === 'Escape') return closeModal();
  }

  function closeModal() {
    modal.classList.remove('open');

    // Remove Event Bindings
    modal.removeEventListener('click', handleClickOutside);
    nextBttn.removeEventListener('click', showNextImg);
    prevBttn.removeEventListener('click', showPrevImg);
    window.removeEventListener('keyup', handleKeyUp);
  }

  // Event Listeners
  images.forEach((img) => {
    img.addEventListener('click', (e) => showImage(img));
  });

  images.forEach((img) => {
    img.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') showImage(img);
    });
  });
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
