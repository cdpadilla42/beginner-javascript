const wes = document.querySelector('.wes');

wes.addEventListener('click', function(event) {
  const shouldChangePage = confirm(
    'This website might be malicious!, do you wish to proceed?'
  );
  if (!shouldChangePage) {
    event.preventDefault();
  }
});

const signupForm = document.querySelector('[name="signup"]');

signupForm.addEventListener('submit', function(event) {
  const name = event.currentTarget.name.value;
  if (name.includes('chad')) {
    alert('Sorry bro');
    event.preventDefault();
  }
});

function logEvent(event) {
  console.log(event.type);
  console.log(event.currentTarget.value);
}
signupForm.name.addEventListener('keyup', logEvent);
signupForm.name.addEventListener('keydown', logEvent);
signupForm.name.addEventListener('focus', logEvent);
signupForm.name.addEventListener('blur', logEvent);
// 'keyup'
// 'keydown'
// 'focus'
// 'blur'

function handlePhotoClick(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    console.log(e);
  }
}

let photo = document.querySelector('.photo');
photo.addEventListener('keyup', handlePhotoClick);
photo.addEventListener('click', handlePhotoClick);
