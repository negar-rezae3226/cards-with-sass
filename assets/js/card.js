let products;
let cardItem = document.getElementById("cardItems");

(function () {
  fetch("./assets/json/products.json")
    .then((x) => x.json())
    .then((json) => {
      products = json;
      console.log(products);
    });

  const timeOut = setTimeout(() => {
    createCard();
    clearTimeout(timeOut);
  }, 100);
})();

function createCard() {

  products.forEach((product) => {
    items += `
          <div class="col-sm-12 col-lg-4  col-md-4 pt-5">
                <div class="card " id="${product.id}">
                    <a href="http://127.0.0.1:5500/cards-with-sass/product_details.html">
                        <img class="card-img-top " src="${product.image}" alt="Card image" style="width:100%">
                    </a>
                    <div class="card-body">
                        <div class="description">
                            <h4 class="card-title my-3">${product.name}</h4>
                            <p class="card-text">${product.price}</p>
                            <a   class="btn btn-primary"   onclick="onAddBasketItem('${product.name}','${product.image}','${product.price}',1, '${product.id}')" >افزودن به سبد </a>
                        </div>
                    </div>
                </div>
            </div>
      `;
    });
    cardItem.innerHTML = items;

}
