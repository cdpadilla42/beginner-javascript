const link = document.querySelector('.test_link');
link.addEventListener('click', (e) => {
  const contine = confirm('Want to head on?');
  if (!contine) {
    e.preventDefault();
  }
});

const signupForm = document.querySelector('[name="signup"]');

signupForm.addEventListener('submit', (e) => {
  const name = e.currentTarget.name.value;
  if (name.toLowerCase().includes('chad')) {
    e.preventDefault();
    alert('Sorry Bro');
  }
});

function logEvent(event) {
  console.log(event.type);
  console.log(event.currentTarget.value);
}

console.log(signupForm.name.addEventListener('keyup', logEvent));
console.log(signupForm.name.addEventListener('keydown', logEvent));
console.log(signupForm.name.addEventListener('focus', logEvent));
console.log(signupForm.name.addEventListener('blur', logEvent));
