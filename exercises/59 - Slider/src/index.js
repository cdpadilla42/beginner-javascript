function Slider(slider) {
  this.slider = slider;

  if (!this.slider instanceof Element) {
    throw new Error('No slider passed in');
  }
  // create some variables for working with the slider
  this.prev;
  this.current;
  this.next;
  // select elements needed for the slider
  this.slides = this.slider.querySelector('.slides');
  this.nextBttn = this.slider.querySelector('.goToNext');
  this.prevBttn = this.slider.querySelector('.goToPrev');

  // constructor
  // when slider created, runs

  // Event Listeners
  this.prevBttn.addEventListener('click', () => this.move('back'));
  this.nextBttn.addEventListener('click', () => this.move());
  window.addEventListener('keyup', (e) => this.handleKeyUp(e));

  this.startSlider();
  this.applyClasses();
}

Slider.prototype.startSlider = function() {
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
};

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

Slider.prototype.handleKeyUp = function(e) {
  // debugger;
  const isActive = document.activeElement === this.slides;
  if (isActive) {
    if (e.key === 'ArrowRight') this.move();
    if (e.key === 'ArrowLeft') this.move('back');
  }
};

Slider.prototype.constructor = function() {
  // blank
};

Slider.prototype.move = function(direction) {
  // strip all the classes off the slides
  this.classesToRemove = ['prev', 'current', 'next'];
  this.prev.classList.remove(...this.classesToRemove);
  this.next.classList.remove(...this.classesToRemove);
  this.current.classList.remove(...this.classesToRemove);

  if (direction === 'back') {
    // make a new array of the new values and destructure them over and into the prev current and next variables

    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));
