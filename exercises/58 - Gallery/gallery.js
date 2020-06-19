function Gallery(gallery) {
  if (!gallery) throw new Error('No Gallery Found!');

  // select elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevBttn = modal.querySelector('.prev');
  const nextBttn = modal.querySelector('.next');

  const heading = modal.querySelector('h2');
  const desc = modal.querySelector('p');

  function showImage(el) {
    if (!el) {
      console.log('no image passed!');
      return;
    }
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').innerText = el.title;
    modal.querySelector('p').innerText = el.dataset.description;
  }

  images.forEach((img) => {
    img.addEventListener('click', (e) => {
      showImage(e.currentTarget);
    });
  });
}

// Use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
