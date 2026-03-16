const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const imageUrls = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/250/300",
  "https://picsum.photos/200/250"
];

// function to download single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject("Error loading images");

    img.src = url;
  });
}

function downloadImages() {

  // keep output empty initially
  output.innerHTML = "";
  errorDiv.textContent = "";

  // show loading text
  loading.textContent = "Loading...";

  Promise.all(imageUrls.map(downloadImage))
    .then((images) => {

      loading.textContent = "";

      images.forEach((img) => {
        output.appendChild(img);
      });

    })
    .catch((err) => {

      loading.textContent = "";
      errorDiv.textContent = err;

    });
}

// start download
downloadImages();