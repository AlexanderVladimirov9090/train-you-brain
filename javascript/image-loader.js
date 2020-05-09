let slider = document.getElementById('speedRange'); // Slider
let output = document.getElementById('demo'); // Visual representation of slider value. 
let button = document.getElementById('trainButton'); // Button for training
let imageHolder = document.getElementById('imageHolder'); // Container that hold the images.
let centered = document.getElementById('centered'); // Container that hold the images.
output.innerHTML = slider.value; // Display the default slider value
let sufix = '.jpg'; // image sufix.
let interval = slider.value; // current interval.
let currentIndex = 0; // tracking current index
let pause = false; // Pause

/**
 * Sets interval from the slider.
 *
 */
slider.oninput = function () {
  output.innerHTML = this.value;
  interval = this.value;
}

document.body.onkeyup = function (e) {
  //Space
  if (e.keyCode == 32) {
    onPause();
  }

  //Escape
  if (e.keyCode == 27) {
    //your code
    stop();
  }
  
  // Left Arrow
  if (e.keyCode == 37) {
    //your code
    stepBack();
  }

  //Right Arrow
  if (e.keyCode == 39) {
    //your code
    stepForward();
  }
}

/**
 * Sleep method that uses Promise.
 * @param {milisecounds to wait} ms 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Iterates over every image and displays it for calculated time.
 */
async function iterate() {
  if (!results) {
    return;
  }
  button.style.visibility = 'hidden';
  imageHolder.className = 'showHolder';
  for (let i = currentIndex; i <= results.photos.photo.length; i++) {
    if (pause === true) {
      return;
    } else {
      currentIndex = i;
      let image = document.getElementById(results.photos.photo[i].id);
      image.style.display = 'block';
      await sleep(1000 / interval);
      if (pause === false) {
        image.style.display = 'none';
      }
    }
  }
  stop();
}

function onPause() {
  if (!results) {
    return;
  }
  let pausebtn = document.getElementById('pauseButton');
  pause = !pause;
  let image = document.getElementById(results.photos.photo[currentIndex].id);
  if (!pause) {
    image.style.display = 'none';
    iterate();
    pausebtn.value = 'Pause';
  } else {
    image.style.display = 'block';
    button.style.visibility = 'visible';
    pausebtn.value = 'Resume';
  }
}


function formStart() {
  centered.innerHTML = '';
  pause = false;
  currentIndex = 0;
  preload();
  iterate();

}

function stepBack() {
  if (currentIndex === 0) {
    return;
  }
  if (pause === false) {
    onPause();
  }
  let currentImage = document.getElementById(results.photos.photo[currentIndex].id);
  currentImage.style.display = 'none';
  currentIndex--;
  let prevImage = document.getElementById(results.photos.photo[currentIndex].id);
  prevImage.style.display = 'block';
}

function stepForward() {
  if (currentIndex === results.photos.photo.length - 1) {
    return;
  }
  if (pause === false) {
    onPause();
  }
  let currentImage = document.getElementById(results.photos.photo[currentIndex].id);
  currentImage.style.display = 'none';
  currentIndex++;
  let prevImage = document.getElementById(results.photos.photo[currentIndex].id);
  prevImage.style.display = 'block';
}

/**
 * Preloads images to have consistant speed over displaying images afterward.
 */
function preload() {
  for (const eachPicture of results.photos.photo) {
    centered.appendChild(eachPicture.picSrouce);
  }
}


function stop() {
  button.style.visibility = 'visible';
  imageHolder.className = imageHolder.className.replace('showHolder', '');
  let currentImage = document.getElementById(results.photos.photo[currentIndex].id);
  currentImage.style.display = 'none';
  pause = true;
}