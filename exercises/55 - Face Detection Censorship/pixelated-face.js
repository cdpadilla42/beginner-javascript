const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const faceDetector = new window.FaceDetector();
const options = {
  SIZE: 10,
  SCALE: 1.35,
};

// let SIZE = 10;
// let SCALE = 1.35;

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280 / 2, height: 720 / 2 },
  });
  video.srcObject = stream;
  await video.play();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  // console.log(faces);
  // ask browser when next animation frame is and tell it to run detect for us
  requestAnimationFrame(detect);
  faces.forEach(drawFace);
  faces.forEach(censor);
}

function drawFace(face) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { width, height, top, left } = face.boundingBox;
  ctx.strokeStyle = '#ffc600';
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // draw the small face
  faceCtx.drawImage(
    // 5 src args
    video, // where it comes from
    face.x, // where do we pull from
    face.y,
    face.width,
    face.height,
    // 4 draw args
    face.x,
    face.y,
    options.SIZE,
    options.SIZE
  );
  // take that face back out and draw it back at normal size
  const width = face.width * options.SCALE;
  const height = face.height * options.SCALE;

  faceCtx.drawImage(
    faceCanvas,
    face.x, // where do we pull from
    face.y,
    options.SIZE,
    options.SIZE,
    // draw args
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

populateVideo().then(detect);

// Scales

function handleOptions(e) {
  const { name, value } = e.currentTarget;
  options[name] = value;
}

const controls = document.querySelectorAll('[type="range"]');
controls.forEach((input) => input.addEventListener('input', handleOptions));
