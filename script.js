const input = document.getElementById("bg");
const text = document.getElementById("text");
const button = document.getElementById("button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const form = document.getElementById("form");
const downloadButton = document.getElementById("downloadButton");

// Set display size (css pixels).
var sizeW = 600;
var sizeH = 335;
canvas.style.width = sizeW + "px";
canvas.style.height = sizeH + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = sizeW * scale;
canvas.height = sizeH * scale;
ctx.scale(scale, scale);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clear();
  await drawBackground();
  await drawEls();
  drawText();
  downloadButton.classList.remove("hidden");
  form.classList.add("hidden");
});

downloadButton.addEventListener("click", () => {
  var link = document.createElement("a");
  link.download = "els.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
});

const drawBackground = async () => {
  if (!input.files[0]) return;
  const backgroundImage = await loadImage(URL.createObjectURL(input.files[0]));
  ctx.drawImage(backgroundImage, 0, 0, sizeW, sizeH);
};

const drawEls = async () => {
  const elsImage = await loadImage("./els.png");

  ctx.drawImage(elsImage, sizeW / 2, sizeH * 0.2, sizeW / 2, sizeH * 0.8);
};

function drawText() {
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#909090CC";
  ctx.fillRect(20, sizeH - 22, sizeW - 40, 16);

  ctx.fillStyle = "white";

  ctx.fillText(text.value || "Maar wat is dat toch ...", sizeW / 2, sizeH - 10);
}

function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();

    image.addEventListener("load", () => {
      resolve(image);
    });

    image.src = url;
  });
}

const clear = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
