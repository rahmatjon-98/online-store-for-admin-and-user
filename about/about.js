let product = JSON.parse(localStorage.getItem("data")) || [];

let cntcart = document.querySelector(".cntcart")

let totalCnt = product.reduce((sum, el) => sum + el.cnt, 0);
cntcart.innerHTML = totalCnt;

