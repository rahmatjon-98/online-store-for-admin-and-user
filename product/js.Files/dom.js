let product = JSON.parse(localStorage.getItem("data")) || [];

import { cotegorySearch, rangeChange, Search } from "./api.js";

let box = document.querySelector(".box");
let cntcart = document.querySelector(".cntcart");

let inpSearch = document.querySelector(".inpSearch");
let selectSearch = document.querySelector(".selectSearch");
let inpRange = document.querySelector(".inpRange");
let parseValue = document.querySelector(".parseValue");

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
  let index = product.findIndex((item) => item.productId === e.productId);
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

    let pPrice = document.createElement("p");
    pPrice.classList.add("pPrice");
    pPrice.innerHTML = `$${e.productPrice}`;

    let btnInfo = document.createElement("button");
    btnInfo.classList.add("btnInfo");
    btnInfo.innerHTML = "Info of product";

    btnInfo.onclick = () => {
      localStorage.setItem("productId", JSON.stringify(e));
      window.location = "../info/info.html";
    };

    let btnShop = document.createElement("button");
    btnShop.classList.add("btnShop");
    btnShop.innerHTML = "Add to card";
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
