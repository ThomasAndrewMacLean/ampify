const input = document.getElementById("bg");
const text = document.getElementById("text");
const button = document.getElementById("button");
const ctx = document.getElementById("canvas").getContext("2d");

button.addEventListener("click", async () => {
  clear();
  drawBackground();
  await drawEls();
  drawText();
});

const drawBackground = async () => {
  if (!input.files[0]) return;
  const backgroundImage = await loadImage(URL.createObjectURL(input.files[0]));
  ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
};

const drawEls = async () => {
  const elsImage = await loadImage("./els.png");

  ctx.drawImage(
    elsImage,
    ctx.canvas.width / 2,
    ctx.canvas.height * 0.2,
    ctx.canvas.width / 2,
    ctx.canvas.height * 0.8
  );
};

function drawText() {
  ctx.font = "12px serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#90909069";
  ctx.fillRect(20, ctx.canvas.height - 20, ctx.canvas.width * 0.8, 12);

  ctx.fillStyle = "black";

  ctx.fillText(
    text.value || "Maar wat is dat toch ...",
    ctx.canvas.width / 2,
    ctx.canvas.height - 10
  );
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
