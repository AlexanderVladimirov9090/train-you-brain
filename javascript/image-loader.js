let slider = document.getElementById('speedRange'); // Slider
let output = document.getElementById('demo'); // Visual representation of slider value. 
let button = document.getElementById('trainButton'); // Button for training
let imageHolder = document.getElementById('imageHolder'); // Container that hold the images.
output.innerHTML = slider.value; // Display the default slider value
let sufix = '.jpg'; // image sufix.
let interval = slider.value; // current interval.

/**
 * Sets interval from the slider.
 *
 */
slider.oninput = function () {
  output.innerHTML = this.value;
  interval = this.value;
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
  preload();
  imageHolder.className= 'showHolder';
  for (const eachPicture of results.photos.photo) {
    let image = document.getElementById(eachPicture.id);
    image.style.display = 'block';
    await sleep(1000 / interval);
    image.style.display = 'none';
  }
  button.style.visibility = 'visible';
  imageHolder.className = imageHolder.className.replace('showHolder', '');
}

/**
 * Preloads images to have consistant speed over displaying images afterward.
 */
function preload() {
  for (const eachPicture of results.photos.photo) {
    imageHolder.appendChild(eachPicture.picSrouce)
  }
}
