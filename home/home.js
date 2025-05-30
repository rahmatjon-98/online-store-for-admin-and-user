let apiProduct = "http://localhost:3000/product";

let product = JSON.parse(localStorage.getItem("data")) || [];

let box = document.querySelector(".box");
let scrollRight = document.querySelector(".scrollRight");
let scrollLeft = document.querySelector(".scrollLeft");
let cntcart = document.querySelector(".cntcart");

scrollRight.onclick = () => {
  box.scrollBy({ left: 280, behavior: "smooth" });
};

scrollLeft.onclick = () => {
  box.scrollBy({ left: -280, behavior: "smooth" });
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

    let pPrice = document.createElement("p");
    pPrice.classList.add("pPrice");
    pPrice.innerHTML = `$${e.productPrice}`;

    let btnInfo = document.createElement("button");
    btnInfo.classList.add("btnInfo");
    btnInfo.innerHTML = "Info of product";
    
    btnInfo.onclick=()=>{
      localStorage.setItem("productId",JSON.stringify(e))
      window.location = "../info/info.html"
    }

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
