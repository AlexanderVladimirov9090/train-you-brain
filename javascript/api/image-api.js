const apiKey = '162f8c531c9a63e66d92cc5cb713c709'; // Flickr Api Key.
let results; // Results from the query.
// let button = document.getElementById('trainButton'); // Button for training
let searchBar = document.getElementById('searchBar');
/**
 * Searches for images by keywords.
 */
function search() {
   
    if (!searchBar.value) {
        return;
    }
    let keyword = searchBar.value;
    var imageSearchRequest = new XMLHttpRequest();
    imageSearchRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            results = JSON.parse(this.response);
            for (const eachResult of results.photos.photo) {
                let image = new Image();
                image.id = eachResult.id;
                image.style.display = 'none';
                image.className = 'image';
                image.src = `https://farm${eachResult.farm}.staticflickr.com/${eachResult.server}/${eachResult.id}_${eachResult.secret}.jpg`;
                eachResult.picSrouce = image;
            }
            imagesLoaded();
            button.style.visibility = 'visible';
        }
        if (this.stat === 'fail') {
            imagesError();
        }
   
    };
    imageSearchRequest.open('GET', `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${keyword}&per_page=2000&page=1&format=json&nojsoncallback=1`);
    imageSearchRequest.send();
}

/**
 * Shows snackbar when query has return successfuly.
 */
function imagesLoaded() {
    var snackBarSuccess = document.getElementById('snackbarSuccess');
    snackBarSuccess.className = 'show';
    setTimeout(function () {
        snackBarSuccess.className = snackBarSuccess.className.replace('show', '');
    }, 3000);
}

/**
 * Shows snackbar when query fails.
 */
function imagesError() {
    var snackbarError = document.getElementById('snackbarError');
    snackbarError.className = 'show';
    setTimeout(function () { snackbarError.className = snackbarError.className.replace('show', ''); }, 3000);
} 

searchBar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("searchButton").click();
    }
  }); 