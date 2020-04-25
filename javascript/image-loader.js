let slider = document.getElementById("speedRange");
let output = document.getElementById("demo");
let image = document.getElementById("image");
output.innerHTML = slider.value; // Display the default slider value
let imagePath = "assets\\pictures\\laptop";
let sufix='.jpg';
let interval=1;
let timeouts = [];
  image.style.visibility='hidden';
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  interval=this.value;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 

async function iterate(){
image.style.visibility='visible';
let timeout=1000;
timeouts.forEach((item, i) => {
   clearTimeout(item);
});

  for(let i=1; i <= 60; i++){
    image.src = imagePath+i+sufix;
    await sleep(1000/interval);
  }
}
