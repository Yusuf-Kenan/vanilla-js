const catList = document.querySelector(".cat-list");
const prodList=document.querySelector(".prod-list")
document.addEventListener("DOMContentLoaded", ()=>{
    fetchCats()
    fetchProduct()
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
        data.forEach((prod)=>{
           
            const prodDiv=document.createElement("div")
            prodDiv.classList.add("prod")
            prodDiv.innerHTML=`
            <img src="${prod.images[0]}" alt="">
                <p>${prod.title}</p>
                <p>${prod.category.name}</p>
                <div class="prod-info">
                    <span>€${prod.price}</span>
                    <button>Add</button>
                </div>
            `;
            prodList.appendChild(prodDiv)

        })
    })
    .catch((err) => console.log(err));
}
