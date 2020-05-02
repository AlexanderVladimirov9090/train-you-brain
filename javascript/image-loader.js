let slider = document.getElementById("speedRange");
let output = document.getElementById("demo");
let button = document.getElementById("trainButton");
let imageHolder = document.getElementById("imageHolder");
output.innerHTML = slider.value; // Display the default slider value
let imagePath = "assets\\pictures\\laptop";
let sufix = '.jpg';
let interval = slider.value;
let timeouts = [];
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
  for (const eachPicture of results.photos.photo) {
    let image = document.getElementById(eachPicture.id);
    image.style.display = "block";
    await sleep(1000 / interval);
    image.style.display = "none";
  }
  button.style.visibility = 'visible';

}

function preload() {
  for (const eachPicture of results.photos.photo) {
    imageHolder.appendChild(eachPicture.picSrouce)
  }
}
