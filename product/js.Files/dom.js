let product = JSON.parse(localStorage.getItem("data")) || [];

import { cotegorySearch, rangeChange, Search } from "./api.js";

let box = document.querySelector(".box");
let cntcart = document.querySelector(".cntcart");

let inpSearch = document.querySelector(".inpSearch");
let selectSearch = document.querySelector(".selectSearch");
let inpRange = document.querySelector(".inpRange");
let parseValue = document.querySelector(".parseValue");

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

inpRange.onchange = () => {
  let maxNum = Number(inpRange.value);
  inpRange.innerHTML = maxNum;
  rangeChange(maxNum);
  parseValue.innerHTML = `$${maxNum}`;
};

selectSearch.onchange = () => {
  cotegorySearch(selectSearch.value);
};

inpSearch.oninput = () => {
  Search(inpSearch.value);
};

let totalCnt = product.reduce((sum, el) => sum + el.cnt, 0);
cntcart.innerHTML = totalCnt;

function addToCard(e) {
  let index = product.findIndex((item) => item.id === e.id);
  if (index !== -1) {
    product[index].cnt = product[index].cnt + 1;
  } else {
    let newItem = { ...e, cnt: 1 };
    product.push(newItem);
  }
  let totalCnt = product.reduce((sum, el) => sum + el.cnt, 0);
  cntcart.innerHTML = totalCnt;
  localStorage.setItem("data", JSON.stringify(product));
}

export default function getData(product) {
  box.innerHTML = "";
  product.forEach((e) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let imgCard = document.createElement("img");
    imgCard.classList.add("imgCard");
    imgCard.src = e.productImage;

    let pName = document.createElement("p");
    pName.classList.add("pName");
    pName.innerHTML = e.productName;

    pName.style.color = "#a7a7a7";

    let pPrice = document.createElement("p");
    pPrice.classList.add("pPrice");
    pPrice.innerHTML = `$${e.productPrice}`;

    let btnInfo = document.createElement("button");
    btnInfo.classList.add("btnInfo");
    btnInfo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`;

    btnInfo.onclick = () => {
      localStorage.setItem("id", JSON.stringify(e));
      window.location = "../info/info.html";
    };

    let btnShop = document.createElement("button");
    btnShop.classList.add("btnShop");
    btnShop.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>`;
    btnShop.onclick = () => {
      addToCard(e);
    };

    let textBottom = document.createElement("div");
    textBottom.classList.add("textBottom");

    textBottom.append(pName, pPrice);

    card.append(imgCard, textBottom, btnInfo, btnShop);
    box.append(card);
  });
}
