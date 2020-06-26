function Slider(slider) {
  let slides = Array.from(slider.querySelectorAll('.slide'));
  let current = slider.querySelector('.current') || slides[0];
  let nextBttn = slider.querySelector('.goToNext');
  let prevBttn = slider.querySelector('.goToPrev');

  function showCurrentSlide() {
    current.classList.add('current');
  }

  function setPrevAndNextSlides() {
    console.log(current.nextElementSibling);
    // add class to next slide
    if (current.nextElementSibling) {
      current.nextElementSibling.classList.add('next');
    } else {
      // if at the end, add to the first slide in list
      slides[0].classList.add('next');
    }
    // add class to prev slide
    if (current.previousElementSibling) {
      current.previousElementSibling.classList.add('prev');
    } else {
      // if at the end, add to the last slide in list
      slides[slides.length - 1].classList.add('prev');
    }
  }

  function removePrevAndNextClasses() {
    slider.querySelector('.next').classList.remove('next');
    slider.querySelector('.prev').classList.remove('prev');
  }

  function initializeSlider() {
    showCurrentSlide();
    setPrevAndNextSlides();
  }

  function shiftCurrentSlide() {
    slider.querySelector('.current').classList.remove('current');
    current.classList.add('current');
  }

  function nextSlideGo() {
    removePrevAndNextClasses();
    // move current over one
    current = current.nextElementSibling || slides[0];
    shiftCurrentSlide();
    setPrevAndNextSlides();
  }

  function prevSlideGo() {
    removePrevAndNextClasses();
    // move current over one
    current = current.previousElementSibling || slides[slides.length - 1];
    shiftCurrentSlide();
    setPrevAndNextSlides();
  }

  // Event listeners
  window.addEventListener('load', initializeSlider);
  nextBttn.addEventListener('click', nextSlideGo);
  prevBttn.addEventListener('click', prevSlideGo);
}

Slider(document.querySelector('.slider'));
Slider(document.querySelector('.dog-slider'));
