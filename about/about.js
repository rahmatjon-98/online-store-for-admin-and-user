let product = JSON.parse(localStorage.getItem("data")) || [];

let cntcart = document.querySelector(".cntcart");
let totalCnt = product.reduce((sum, el) => sum + el.cnt, 0);
cntcart.innerHTML = totalCnt;

let body = document.querySelector(".body");
let header = document.querySelector(".header");
let colorA = document.querySelectorAll(".colorA");
let size6 = document.querySelector(".size-6");

let darkLight = document.querySelector(".darkLight");

let darkMode = localStorage.getItem("theme") || "white";
localStorage.setItem("theme", darkMode);
body.style.backgroundColor = darkMode;
let textColor = localStorage.getItem("textColor") || "black";
body.style.color = textColor;
if (darkMode == "white") {
  header.style.backgroundColor = darkMode;
  size6.style.color = "black";
  colorA.forEach((el) => (el.style.color = "black"));
} else {
  header.style.backgroundColor = darkMode;
  size6.style.color = "white";
  colorA.forEach((el) => (el.style.color = "white"));
}

darkLight.onclick = () => {
  if (localStorage.getItem("theme") === "white") {
    localStorage.setItem("theme", "#222222");
    let darkMode = localStorage.getItem("theme");
    body.style.backgroundColor = darkMode;
    header.style.backgroundColor = darkMode;

    localStorage.setItem("textColor", "white");
    let textColor = localStorage.getItem("textColor");
    body.style.color = textColor;
    colorA.forEach((el) => (el.style.color = textColor));
    size6.style.color = "white";
  } else if (localStorage.getItem("theme") === "#222222") {
    localStorage.setItem("theme", "white");
    let darkMode = localStorage.getItem("theme");
    body.style.backgroundColor = darkMode;
    header.style.backgroundColor = darkMode;

    localStorage.setItem("textColor", "black");
    let textColor = localStorage.getItem("textColor");
    body.style.color = textColor;
    colorA.forEach((el) => (el.style.color = textColor));
    size6.style.color = "black";
  }
};
