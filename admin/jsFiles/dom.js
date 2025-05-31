import {
  addProduct,
  editProduct,
  deleteProduct,
  infoProduct,
  sortProduct,
  search,
  searchStatus,
  changeStatus,
  searchCot,
} from "./api.js";

let box = document.querySelector(".box");
let body = document.querySelector(".body ");
let header = document.querySelector(".header ");
let cntProd = document.querySelector(".cntProd ");

let idx = null;

let btnSort = document.querySelector(".btnSort");
let statusStatus = document.querySelector(".statusStatus");
let searchCotegory = document.querySelector(".searchCotegory");
let inpSearch = document.querySelector(".inpSearch");
let btnNewProduct = document.querySelector(".btnNewProduct");

let dialog = document.querySelectorAll(".dialog");
let info = document.querySelectorAll(".info");


let addDialog = document.querySelector(".addDialog");
let addForm = document.querySelector(".addForm");
let editDialog = document.querySelector(".editDialog");
let editForm = document.querySelector(".editForm");

let infoDialog = document.querySelector(".infoDialog");
let infoImage = document.querySelector(".infoImage");
let infoName = document.querySelector(".infoName");
let infoDescription = document.querySelector(".infoDescription");
let infoColor = document.querySelector(".infoColor");
let infoCotegory = document.querySelector(".infoCotegory");
let infoPrice = document.querySelector(".infoPrice");
let infoStatus = document.querySelector(".infoStatus");
let infoId = document.querySelector(".infoId");

searchCotegory.oninput = () => {
  searchCot(searchCotegory.value);
};

inpSearch.oninput = () => {
  search(inpSearch.value);
};

statusStatus.onchange = () => {
  searchStatus(statusStatus.value);
};

let btnaddClose = document.querySelector(".btnaddClose");
btnaddClose.onclick = () => {
  addDialog.close();
};
let btneditClose = document.querySelector(".btneditClose");
btneditClose.onclick = () => {
  editDialog.close();
};
let btninfoClose = document.querySelector(".btninfoClose");
btninfoClose.onclick = () => {
  infoDialog.close();
};

let darkLight = document.querySelector(".darkLight");

let darkMode = localStorage.getItem("theme") || "white";
localStorage.setItem("theme", darkMode);
body.style.backgroundColor = darkMode;
let textColor = localStorage.getItem("textColor") || "black";
body.style.color = textColor;
if (darkMode == "white") {
  darkLight.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>`;
  header.style.backgroundColor = darkMode;
  dialog.forEach((e) => (e.style.backgroundColor = darkMode));
  info.forEach((e) => (e.style.color = "black"));
} else {
  darkLight.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`;
  header.style.backgroundColor = darkMode;
  dialog.forEach((e) => (e.style.backgroundColor = darkMode));
  info.forEach((e) => (e.style.color = "white"));
}

darkLight.onclick = () => {
  if (localStorage.getItem("theme") === "white") {
    darkLight.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`;
    localStorage.setItem("theme", "#222222");
    let darkMode = localStorage.getItem("theme");
    body.style.backgroundColor = darkMode;
    header.style.backgroundColor = darkMode;
    dialog.forEach((e) => (e.style.backgroundColor = darkMode));
    info.forEach((e) => (e.style.color = "white"));
    
    localStorage.setItem("textColor", "white");
    let textColor = localStorage.getItem("textColor");
    body.style.color = textColor;
  } else if (localStorage.getItem("theme") === "#222222") {
    darkLight.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>`;
    localStorage.setItem("theme", "white");
    let darkMode = localStorage.getItem("theme");
    body.style.backgroundColor = darkMode;
    header.style.backgroundColor = darkMode;
    dialog.forEach((e) => (e.style.backgroundColor = darkMode));
    info.forEach((e) => (e.style.color = "black"));

    localStorage.setItem("textColor", "black");
    let textColor = localStorage.getItem("textColor");
    body.style.color = textColor;
  }
};

btnSort.onclick = () => {
  sortProduct();
};

btnNewProduct.onclick = () => {
  addDialog.showModal();
};

addForm.onsubmit = (ev) => {
  ev.preventDefault();
  let newProduct = {
    productName: ev.target["addName"].value,
    productImage: ev.target["addImage"].value,
    productDescription: ev.target["addDescription"].value,
    productPrice: ev.target["addPrice"].value,
    productColor: ev.target["addColor"].value,
    productCotegory: ev.target["addCotegory"].value,
    id: Date.now().toString(),
    productStatus: ev.target["addStatus"].value,
  };
  addProduct(newProduct);
  addDialog.close();
};

editDialog.onsubmit = (ev) => {
  ev.preventDefault();
  let newProduct = {
    productName: ev.target["editName"].value,
    productImage: ev.target["editImage"].value,
    productDescription: ev.target["editDescription"].value,
    productPrice: ev.target["editPrice"].value,
    productColor: ev.target["editColor"].value,
    productCotegory: ev.target["editCotegory"].value,
    productStatus: ev.target["editStatus"].value == "active",
  };
  editProduct(newProduct, idx);
  editDialog.close();
};

export default function getData(data) {
  box.innerHTML = "";
  let lng = 0;
  data.forEach((e) => {
    lng = lng + 1;
    cntProd.innerHTML = lng;
    let card = document.createElement("div");

    let imgCard = document.createElement("img");
    imgCard.src = e.productImage;

    let h2Name = document.createElement("h2");
    h2Name.innerHTML = e.productName;

    let pDescription = document.createElement("p");
    pDescription.innerHTML = e.productDescription;

    let pPrice = document.createElement("p");
    pPrice.innerHTML = `$${e.productPrice}`;

    let pColor = document.createElement("p");
    pColor.innerHTML = e.productColor;

    let pCotegory = document.createElement("p");
    pCotegory.innerHTML = e.productCotegory;

    let pStatus = document.createElement("p");
    pStatus.innerHTML = e.productStatus ? "On sale" : "Not for sale";
    pStatus.style.color = e.productStatus ? "green" : "red";

    let pId = document.createElement("p");
    pId.innerHTML = `id: ${e.id}`;

    let btndele = document.createElement("button");
    btndele.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`;
    btndele.onclick = () => {
      deleteProduct(e.id);
    };

    let btnedit = document.createElement("button");
    btnedit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>`;
    btnedit.onclick = () => {
      editDialog.showModal();
      editForm["editName"].value = e.productName;
      editForm["editImage"].value = e.productImage;
      editForm["editDescription"].value = e.productDescription;
      editForm["editPrice"].value = e.productPrice;
      editForm["editColor"].value = e.productColor;
      editForm["editCotegory"].value = e.productCotegory;
      editForm["editStatus"].value = e.productStatus ? "active" : "inactive";
      idx = e.id;
    };
    let btninfo = document.createElement("button");
    btninfo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`;
    btninfo.onclick = () => {
      infoProduct(e.id);
    };

    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = !e.productStatus;
    check.onclick = () => {
      changeStatus(e);
    };

    card.classList.add("card");
    imgCard.classList.add("imgCard");
    h2Name.classList.add("h2Name");
    pDescription.classList.add("pDescription");
    pPrice.classList.add("pPrice");
    pColor.classList.add("pColor");
    pCotegory.classList.add("pCotegory");
    pId.classList.add("pId");
    pStatus.classList.add("pStatus");
    btndele.classList.add("btndele");
    btnedit.classList.add("btnedit");
    btninfo.classList.add("btninfo");
    check.classList.add("check");

    card.append(
      imgCard,
      h2Name,
      pPrice,
      pId,
      pStatus,
      btndele,
      btnedit,
      btninfo,
      check
    );
    box.append(card);
  });
}

export function getInfo(e) {
  infoName.innerHTML = `<b>name:</b> ${e.productName}`;
  infoImage.src = e.productImage;
  infoDescription.innerHTML = `<b>description:</b> ${e.productDescription}`;
  infoColor.innerHTML = `<b>color:</b> ${e.productColor}`;
  infoCotegory.innerHTML = `<b>cotegory:</b> ${e.productCotegory}`;
  infoPrice.innerHTML = `<b>price:</b> $${e.productPrice}`;
  infoStatus.innerHTML = `status: ${
    e.productStatus ? "On sale" : "Not for sale"
  }`;
  infoStatus.style.color = e.productStatus ? "green" : "red";
  infoId.innerHTML = `id: ${e.id}`;

  infoDialog.showModal();
}
