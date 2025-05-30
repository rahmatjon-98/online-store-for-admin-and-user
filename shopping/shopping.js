let product = JSON.parse(localStorage.getItem("data")) || [];

let cntcart = document.querySelector(".cntcart");

let totalCnt = product.reduce((sum, el) => sum + el.cnt, 0);
cntcart.innerHTML = totalCnt;

let table = document.querySelector(".table");
let tbody = document.querySelector(".tbody");
let thead = document.querySelector(".thead");

let CardTotal = document.querySelector(".CardTotal");
let divCardTotal = document.querySelector(".divCardTotal");

let pParseTotal = document.querySelector(".pParseTotal");
let pFree = document.querySelector(".pFree");

let DialogBuy = document.querySelector(".DialogBuy");
let btnBuy = document.querySelector(".btnBuy");

let btnRemoveCard = document.querySelector(".btnRemoveCard");
let btnUpdateCard = document.querySelector(".btnUpdateCard");

btnBuy.onclick = () => {
  DialogBuy.showModal();
  setTimeout(() => {
    DialogBuy.close();
    localStorage.removeItem("data");
    product = [];
    pParseTotal.innerHTML = "$0";
    cntcart.innerHTML = 0;
    getData(product);
  }, 3000);
};

btnRemoveCard.onclick = () => {
  localStorage.removeItem("data");
  product = [];
  pParseTotal.innerHTML = "$0";
  getData(product);
  cntcart.innerHTML = 0;
};

btnUpdateCard.onclick = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  pParseTotal.innerHTML = "$0";
  getData(data);
};

function deleteUser(id) {
  product = product.filter((e) => e.productId !== id);
  localStorage.setItem("data", JSON.stringify(product));
  pParseTotal.innerHTML = "$0";
  getData(product);
}

function cntPlus(e) {
  let index = product.findIndex((item) => item.productId === e.productId);

  if (index !== -1) {
    product[index].cnt = product[index].cnt + 1;
  }
  localStorage.setItem("data", JSON.stringify(product));
  getData(product);
}

function cntMinus(e) {
  let index = product.findIndex((item) => item.productId === e.productId);

  if (index !== -1) {
    product[index].cnt = product[index].cnt - 1;
    if (product[index].cnt <= 0) {
      pParseTotal.innerHTML = "$0";
      product = product.filter((e) => e.productId !== product[index].productId);
    }
  }

  localStorage.setItem("data", JSON.stringify(product));
  getData(product);
}

function getData(data) {
  tbody.innerHTML = "";
  let numParseTotal = 0;
  console.log(numParseTotal);
  data.forEach((e) => {
    let trtbody = document.createElement("tr");
    trtbody.classList.add("trtbody");

    let imgCard = document.createElement("img");
    imgCard.classList.add("imgCard");
    imgCard.src = e.productImage;

    let pName = document.createElement("p");
    pName.classList.add("pName");
    pName.innerHTML = e.productName;

    let cnt = document.createElement("p");
    cnt.classList.add("cnt");
    cnt.innerHTML = e.cnt;

    let btnPlus = document.createElement("button");
    btnPlus.classList.add("btnPlus");
    btnPlus.innerHTML = "+";
    btnPlus.onclick = () => {
      cntPlus(e);
    };

    let btnMinus = document.createElement("button");
    btnMinus.classList.add("btnMinus");
    btnMinus.innerHTML = "-";
    btnMinus.onclick = () => {
      cntMinus(e);
    };

    let pPrice = document.createElement("p");
    pPrice.classList.add("pPrice");
    pPrice.innerHTML = `$${e.productPrice}`;

    let narx = Number(e.productPrice) * e.cnt;
    numParseTotal += narx;
    pParseTotal.innerHTML = `$${numParseTotal}`;

    let btndele = document.createElement("button");
    btndele.classList.add("btndele");
    btndele.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`;
    btndele.onclick = () => {
      deleteUser(e.productId);
    };

    let divKOL = document.createElement("div");
    divKOL.classList.add("divKOL");
    divKOL.append(btnPlus, cnt, btnMinus);

    let tdProduct = document.createElement("td");
    tdProduct.classList.add("tdProduct");
    tdProduct.append(imgCard, pName);

    let tdPrice = document.createElement("td");
    tdPrice.append(pPrice);
    let tdQuantity = document.createElement("td");
    tdQuantity.append(divKOL);
    let tdSubtotal = document.createElement("td");
    tdSubtotal.classList.add("tdSubtotal");

    let divSubtotal = document.createElement("divSubtotal");
    divSubtotal.classList.add("divSubtotal");
    divSubtotal.append(`$${narx}`, btndele);
    tdSubtotal.append(divSubtotal);

    trtbody.append(tdProduct, tdPrice, tdQuantity, tdSubtotal);
    tbody.append(trtbody);
  });
}
getData(product);
