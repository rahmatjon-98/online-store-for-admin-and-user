let apiProduct = "http://localhost:3000/product";

let product = JSON.parse(localStorage.getItem("data")) || [];

let box = document.querySelector(".box");
let scrollRight = document.querySelector(".scrollRight");
let scrollLeft = document.querySelector(".scrollLeft");
let cntcart = document.querySelector(".cntcart");

scrollRight.onclick = () => {
  box.scrollBy({ left: 283, behavior: "smooth" });
};

scrollLeft.onclick = () => {
  box.scrollBy({ left: -283, behavior: "smooth" });
};

async function get() {
  try {
    let { data } = await axios.get(apiProduct);
    getData(data);
  } catch (error) {
    console.error(error);
  }
}
get();

let totalCnt = product.reduce((sum, el) => sum + el.cnt, 0);
cntcart.innerHTML = totalCnt;

let body = document.querySelector(".body");
let colorA = document.querySelectorAll(".colorA");

let darkLight = document.querySelector(".darkLight");

let darkMode = localStorage.getItem("theme") || "white";
localStorage.setItem("theme", darkMode);
body.style.backgroundColor = darkMode;
let textColor = localStorage.getItem("textColor") || "black";
body.style.color = textColor;
if (darkMode == "white") {
  colorA.forEach((el) => (el.style.color = "black"));
} else {
  colorA.forEach((el) => (el.style.color = "white"));
}

darkLight.onclick = () => {
  if (localStorage.getItem("theme") === "white") {
    localStorage.setItem("theme", "#222222");
    let darkMode = localStorage.getItem("theme");
    body.style.backgroundColor = darkMode;
    console.log("455445");

    localStorage.setItem("textColor", "white");
    let textColor = localStorage.getItem("textColor");
    body.style.color = textColor;
    colorA.forEach((el) => (el.style.color = textColor));
  } else if (localStorage.getItem("theme") === "#222222") {
    localStorage.setItem("theme", "white");
    let darkMode = localStorage.getItem("theme");
    body.style.backgroundColor = darkMode;

    localStorage.setItem("textColor", "black");
    let textColor = localStorage.getItem("textColor");
    body.style.color = textColor;
    colorA.forEach((el) => (el.style.color = textColor));
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

function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
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
