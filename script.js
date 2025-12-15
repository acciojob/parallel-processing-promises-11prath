const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// Image URLs
const imageUrls = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/250/300",
  "https://picsum.photos/200/250",
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

// Main function
function downloadImages() {
  // Clear previous state
  output.innerHTML = "";
  errorDiv.innerHTML = "";

  // Show loading spinner
  loading.textContent = "Loading images...";
  loading.style.fontSize = "20px";
  loading.style.fontWeight = "bold";

  Promise.all(imageUrls.map(downloadImage))
    .then((images) => {
      loading.textContent = ""; // hide loading

      images.forEach((img) => {
        img.style.margin = "10px";
        img.style.border = "2px solid #444";
        output.appendChild(img);
      });
    })
    .catch((error) => {
      loading.textContent = ""; // hide loading
      errorDiv.textContent = error;
      errorDiv.style.color = "red";
      errorDiv.style.fontSize = "18px";
    });
}

// Run on page load
downloadImages();

