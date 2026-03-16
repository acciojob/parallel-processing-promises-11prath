const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const imageUrls = [
"https://picsum.photos/200/300",
"https://picsum.photos/250/300",
"https://picsum.photos/200/250"
];

// show loading spinner first
loading.textContent = "Loading...";

// function to download image
function downloadImage(url){
return new Promise((resolve,reject)=>{

const img = new Image();
img.src = url;

img.onload = ()=> resolve(img);
img.onerror = ()=> reject("Failed to load image");

});
}

// start downloads
Promise.all(imageUrls.map(downloadImage))
.then(images=>{

loading.textContent = "";

images.forEach(img=>{
output.appendChild(img);
});

})
.catch(err=>{

loading.textContent = "";
errorDiv.textContent = err;

});

