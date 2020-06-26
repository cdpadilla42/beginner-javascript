function Slider(slider) {
  if (!slider instanceof Element) {
    throw new Error('No slider passed in');
  }
  // create some variables for working with the slider
  let prev;
  let current;
  let next;
  // select elements needed for the slider
  const slides = slider.querySelector('.slides');
  const nextBttn = slider.querySelector('.goToNext');
  const prevBttn = slider.querySelector('.goToPrev');

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    // strip all the classes off the slides
    const classesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);

    if (direction === 'back') {
      // make a new array of the new values and destructure them over and into the prev current and next variables

      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    applyClasses();
  }

  function handleKeyUp(e) {
    const isActive = document.activeElement === slides;
    if (isActive) {
      if (e.key === 'ArrowRight') move();
      if (e.key === 'ArrowLeft') move('back');
    }
  }

  // constructor
  // when slider created, runs
  startSlider();
  applyClasses();

  // Event Listeners
  prevBttn.addEventListener('click', () => move('back'));
  nextBttn.addEventListener('click', move);
  window.addEventListener('keyup', handleKeyUp);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
