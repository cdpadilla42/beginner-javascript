function Slider(slider) {
  let slides = Array.from(slider.querySelectorAll('.slide'));
  // console.log(slides);
  let current = slider.querySelector('.current') || slides[0];
  // console.log(current);

  function showCurrentSlide() {
    current.classList.add('current');
  }

  function setPrevAndNextSlides() {
    console.log(current.nextElementSibling);
    current.nextElementSibling.classList.add('next');
    current.previousElementSibling
      ? current.previousElementSibling.classList.add('prev')
      : slides[slides.length - 1].classList.add('prev');
  }

  function initializeSlider() {
    showCurrentSlide();
    setPrevAndNextSlides();
  }

  // Event listeners
  window.addEventListener('load', initializeSlider);
}

Slider(document.querySelector('.slider'));
Slider(document.querySelector('.dog-slider'));
