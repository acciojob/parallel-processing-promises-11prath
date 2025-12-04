const output = document.getElementById("output");

// Image URLs array
const imageUrls = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/250/300",
  "https://picsum.photos/200/250"
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages() {
  // Clear output
  output.innerHTML = "";

  // Create loading spinner inside output
  const loading = document.createElement("div");
  loading.textContent = "Loading images...";
  loading.style.fontSize = "20px";
  loading.style.fontWeight = "bold";
  output.appendChild(loading);

  // Start downloading images
  Promise.all(imageUrls.map(downloadImage))
    .then((images) => {
      output.innerHTML = ""; // remove loading

      images.forEach((img) => {
        img.style.margin = "10px";
        img.style.border = "2px solid #444";
        output.appendChild(img);
      });
    })
    .catch((error) => {
      output.innerHTML = ""; // remove loading
      const err = document.createElement("div");
      err.style.color = "red";
      err.style.fontSize = "18px";
      err.textContent = error;
      output.appendChild(err);
    });
}

// Automatically run on page load
downloadImages();
