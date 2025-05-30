let box = document.querySelector(".box");
let cntcart = document.querySelector(".cntcart");

let info = JSON.parse(localStorage.getItem("productId")) || [];

let product = JSON.parse(localStorage.getItem("data")) || [];

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

  let pDescription = document.createElement("p");
  pDescription.classList.add("pDescription");
  pDescription.innerHTML = e.productDescription;

  let pPrice = document.createElement("p");
  pPrice.classList.add("pPrice");
  pPrice.innerHTML = `$${e.productPrice}`;

  let pColor = document.createElement("p");
  pColor.classList.add("pColor");

  let pColor1 = document.createElement("div");
  pColor1.classList.add("pColor1");
  pColor1.innerHTML = "";
  pColor1.style.color = e.productColor[0];
  pColor1.style.backgroundColor = e.productColor[0];

  let pColor2 = document.createElement("div");
  pColor2.classList.add("pColor2");
  pColor2.innerHTML = "";
  pColor2.style.color = e.productColor[1];
  pColor2.style.backgroundColor = e.productColor[1];

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

  pColor.append(pColor1, pColor2);

  divPriceColor.append(pPrice, pColor);

  div.append(pName, pCotegory, divPriceColor, pDescription, pStatus, btnShop);

  card.append(imgCard, div);
  box.append(card);
}
getData(info);
