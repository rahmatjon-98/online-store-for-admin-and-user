let box = document.querySelector(".box");
let cntcart = document.querySelector(".cntcart");

let info = JSON.parse(localStorage.getItem("id")) || [];

let product = JSON.parse(localStorage.getItem("data")) || [];

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

function getData(e) {
  box.innerHTML = "";

  let card = document.createElement("div");
  card.classList.add("card");

  let imgCard = document.createElement("img");
  imgCard.classList.add("imgCard");
  imgCard.src = e.productImage;

  let div = document.createElement("div");
  div.classList.add("div");

  let pName = document.createElement("p");
  pName.classList.add("pName");
  pName.innerHTML = e.productName;

  pName.style.color = "#a7a7a7"

  let pDescription = document.createElement("p");
  pDescription.classList.add("pDescription");
  pDescription.innerHTML = e.productDescription;

  let pPrice = document.createElement("p");
  pPrice.classList.add("pPrice");
  pPrice.innerHTML = `$${e.productPrice}`;

  let pColors = document.createElement("div");
  pColors.classList.add("pColors");

  e.productColor.forEach((e) => {
    let pColor = document.createElement("div");
    pColor.classList.add("pColor");
    pColor.style.backgroundColor = e;
    pColors.append(pColor);
  });

  let pCotegory = document.createElement("p");
  pCotegory.classList.add("pCotegory");
  pCotegory.innerHTML = `By ${e.productCotegory}`;

  let pStatus = document.createElement("p");
  pStatus.classList.add("pStatus");
  pStatus.innerHTML = e.productStatus ? "On sale" : "Not for sale";
  pStatus.style.color = e.productStatus ? "green" : "red";

  let btnShop = document.createElement("button");
  btnShop.classList.add("btnShop");
  btnShop.innerHTML = "ADD TO CART";
  btnShop.onclick = () => {
    addToCard(e);
  };

  let divPriceColor = document.createElement("div");
  divPriceColor.classList.add("divPriceColor");

  divPriceColor.append(pPrice, pColors);

  div.append(pName, pCotegory, divPriceColor, pDescription, pStatus, btnShop);

  card.append(imgCard, div);
  box.append(card);
}
getData(info);
