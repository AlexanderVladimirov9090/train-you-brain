let slider = document.getElementById("speedRange");
let output = document.getElementById("demo");
let image = document.getElementById("image");
let button = document.getElementById("trainButton");
output.innerHTML = slider.value; // Display the default slider value
let imagePath = "assets\\pictures\\laptop";
let sufix = '.jpg';
let interval = 1;
let timeouts = [];
image.style.visibility = 'hidden';
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
  interval = this.value;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function iterate() {
  if (!results) {
    return;
  }
  button.style.visibility = 'hidden';
  preload();

  image.style.visibility = 'visible';
  for (const eachPicture of results.photos.photo) {
    image.src = eachPicture.picSrouce;
    await sleep(1000 / interval);
  }
  image.style.visibility = 'hidden';
  button.style.visibility = 'visible';

}

function preload() {
  for (const eachPicture of results.photos.photo) {
    image.src = eachPicture.picSrouce;
  }
}
