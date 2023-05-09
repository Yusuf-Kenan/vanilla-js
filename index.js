const catList = document.querySelector(".cat-list");
const prodList = document.querySelector(".prod-list");
const cartButton = document.querySelector("#cart");
const closeImg = document.querySelector("#close");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalList = document.querySelector(".modal-list");
const totalPrice = document.querySelector(".price-total");

document.addEventListener("DOMContentLoaded", () => {
  fetchCats();
  fetchProduct();
});

function fetchCats() {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 4).forEach((cat) => {
        const catDiv = document.createElement("div");
        catDiv.classList.add("cat");
        catDiv.innerHTML = `
        <img src="${cat.image}" alt="">
        <p>${cat.name}</p>
        `;
        catList.appendChild(catDiv);
      })
    )
    .catch((err) => console.log(err));
}

function fetchProduct() {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((data) => {
      //proje bitiminde slice silinecek.....
      data.slice(0, 20).forEach((prod) => {
        const prodDiv = document.createElement("div");
        prodDiv.classList.add("prod");
        prodDiv.innerHTML = `
            <img src="${prod.images[1]}" alt="">
                <p>${prod.title}</p>
                <p>${prod.category.name}</p>
                <div class="prod-info">
                    <span>€${prod.price}</span>
                    <button onclick='addCart({name: "${prod.title}", id: ${prod.id}, price: ${prod.price}, amount:1})'>Add</button>
                </div>
            `;
        prodList.appendChild(prodDiv);
      });
    })
    .catch((err) => console.log(err));
}
var cart = [];
var totalCoast=0;

function addToCart() {
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <h3>${item.name}</h3>
        <h3>${item.amount}</h3>
        <h3>€${item.price}</h3>
        `;
    modalList.appendChild(cartItem);

    totalCoast +=item.price*item.amount
  });
  totalPrice.innerText=totalCoast
}

cartButton.addEventListener("click", () => {
  toggleCart();
  addToCart();
});
closeImg.addEventListener("click", ()=>{
    toggleCart();
    modalList.innerHTML=""
});

function toggleCart() {
  modalWrapper.classList.toggle("active");
}

//Add To Cart

function addCart(param) {
  const addedItem = cart.find((item) => item.id == param.id);
  if (addedItem) {
    addedItem.amount += 1;
  } else {
    cart.push(param);
  }
}
