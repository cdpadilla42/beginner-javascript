function scrollToWatch() {
  const terms = document.querySelector('.terms');
  if (!terms) return;
  const button = document.querySelector('button');
  console.log(button);

  function obCallBack(payload) {
    console.log(payload);
    if (payload[0].intersectionRatio > 0) {
      button.disabled = false;
      ob.unobserve(terms.lastElementChild);
    }
  }

  ob = new IntersectionObserver(obCallBack);
  ob.observe(terms.lastElementChild);
}

scrollToWatch();
