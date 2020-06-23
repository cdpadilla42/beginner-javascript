function Gallery(gallery) {
  if (!gallery) throw new Error('No Gallery Found!');

  this.gallery = gallery;
  // select elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevBttn = this.modal.querySelector('.prev');
  this.nextBttn = this.modal.querySelector('.next');

  // bind methods to the instance when we need them
  this.showNextImg = this.showNextImg.bind(this);
  this.showPrevImg = this.showPrevImg.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // Event Listeners

  this.images.forEach((img) => {
    img.addEventListener('click', (e) => {
      this.showImage(e.currentTarget);
    });
  });

  this.images.forEach((img) => {
    img.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') this.showImage(e.currentTarget);
    });
  });
}

Gallery.prototype.handleClickOutside = function(e) {
  if (e.target == e.currentTarget) {
    this.closeModal();
  }
  e.target;
};

Gallery.prototype.handleKeyUp = function(e) {
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowLeft') return this.showPrevImg();
  if (e.key === 'ArrowRight') return this.showNextImg();
};

Gallery.prototype.showImage = function(el) {
  if (!el) {
    console.log('no image passed!');
    return;
  }
  this.currentImg = el;
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').innerText = el.title;
  this.modal.querySelector('p').innerText = el.dataset.description;
  this.openModal();
};

Gallery.prototype.openModal = function() {
  // check if it is already open
  if (this.modal.matches('.open')) {
    console.info('modal already open');
    return;
  }
  this.modal.classList.add('open');

  // Event listener binding
  this.nextBttn.addEventListener('click', this.showNextImg);
  this.prevBttn.addEventListener('click', this.showPrevImg);
  window.addEventListener('keyup', this.handleKeyUp);
  this.modal.addEventListener('click', this.handleClickOutside);
};

Gallery.prototype.closeModal = function() {
  console.log('closing....');
  this.modal.classList.remove('open');

  // Event Listener removal
  this.nextBttn.removeEventListener('click', this.showNextImg);
  this.prevBttn.removeEventListener('click', this.showPrevImg);
  window.removeEventListener('keyup', this.handleKeyUp);
  this.modal.removeEventListener('click', this.handleClickOutside);
};

Gallery.prototype.showPrevImg = function() {
  this.showImage(
    this.currentImg.previousElementSibling ||
      this.images[this.images.length - 1]
  );
};

Gallery.prototype.showNextImg = function() {
  this.showImage(this.currentImg.nextElementSibling || this.images[0]);
};

// Use it on the page

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
