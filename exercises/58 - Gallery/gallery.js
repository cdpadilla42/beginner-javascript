function Gallery(gallery) {
  if (!gallery) throw new Error('No Gallery Found!');

  // select elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevBttn = modal.querySelector('.prev');
  const nextBttn = modal.querySelector('.next');
  let currentImg;

  function handleClickOutside(e) {
    if (e.target == e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowLeft') return showPrevImg();
    if (e.key === 'ArrowRight') return showNextImg();
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

    // Event listener binding
    nextBttn.addEventListener('click', showNextImg);
    prevBttn.addEventListener('click', showPrevImg);
    window.addEventListener('keyup', handleKeyUp);
    modal.addEventListener('click', handleClickOutside);
  }

  function closeModal() {
    console.log('clossing....');
    modal.classList.remove('open');

    // Event Listener removal
    nextBttn.removeEventListener('click', showNextImg);
    prevBttn.removeEventListener('click', showPrevImg);
    window.removeEventListener('keyup', handleKeyUp);
    modal.removeEventListener('click', handleClickOutside);
  }

  function showPrevImg() {
    showImage(currentImg.previousElementSibling || images[images.length - 1]);
  }

  function showNextImg() {
    showImage(currentImg.nextElementSibling || images[0]);
  }

  // Event Listeners

  images.forEach((img) => {
    img.addEventListener('click', (e) => {
      showImage(e.currentTarget);
    });
  });

  images.forEach((img) => {
    img.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') showImage(e.currentTarget);
    });
  });
}

// Use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
