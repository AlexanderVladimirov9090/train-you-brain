const apiKey = '162f8c531c9a63e66d92cc5cb713c709';
let results;
function loadDoc() {
    searchBar = document.getElementById('searchBar');
    if (!searchBar.value) {
        return;
    }
    let keyword = searchBar.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            results = JSON.parse(this.response);
            for (const eachResult of results.photos.photo) {
                let image = new Image();
                image.id = eachResult.id;
                image.style.display = "none";
                image.className = "image";
                image.src = `https://farm${eachResult.farm}.staticflickr.com/${eachResult.server}/${eachResult.id}_${eachResult.secret}.jpg`;
                eachResult.picSrouce = image;
            }
            imagesLoaded();
        }
        if (this.stat === "fail") {
            imagesError();
        }

    };
    xhttp.open("GET", `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${keyword}&per_page=2000&page=1&format=json&nojsoncallback=1`);
    xhttp.send();
}

function imagesLoaded() {
    var x = document.getElementById("snackbarSuccess");
    x.className = "show";
    x.value = 'Images Loaded! Now you can train.';
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

function imagesError() {
    var x = document.getElementById("snackbarError");
    x.className = "show";
    x.value = 'No images are found.';
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
} 