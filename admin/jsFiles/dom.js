let box = document.querySelector(".box");

export default function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let card = document.createElement("div");

    let imgCard = document.createElement("img");
    imgCard.src = e.productImage;

    let h2Name = document.createElement("h2");
    h2Name.innerHTML = e.productName;

    let pDescription = document.createElement("p");
    pDescription.innerHTML = e.productDescription;

    let pPrice = document.createElement("p");
    pPrice.innerHTML = e.productPrice;

    let pColor = document.createElement("p");
    pColor.innerHTML = e.productColor;

    let pCotegory = document.createElement("p");
    pCotegory.innerHTML = e.productCotegory;

    let pStatus = document.createElement("p");
    pStatus.innerHTML = e.productStatus;

    let pId = document.createElement("p");
    pId.innerHTML = e.productId;

    card.classList.add("card");
    imgCard.classList.add("imgCard");
    h2Name.classList.add("h2Name");
    pDescription.classList.add("pDescription");
    pPrice.classList.add("pPrice");
    pColor.classList.add("pColor");
    pCotegory.classList.add("pCotegory");
    pId.classList.add("pId");
    pStatus.classList.add("pStatus");

    card.append(
      imgCard,
      h2Name,
      pColor,
      pCotegory,
      pPrice,
      pId,
      pStatus
    );
    box.append(card);
  });
}
