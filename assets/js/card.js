// import {initCart} from './cart.js';
// import {onAddBasketItem} from './cart.js';

let products;
let cardItem = document.getElementById("cardItems");
let dollarUS = Intl.NumberFormat("en-US");
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
let items = "";
  products.forEach((product) => {
    let price = product.price;
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let priceCards =  dollarUSLocale.format(price);
   items += `
          <div class="col-sm-12 col-lg-4  col-md-4 pt-5">
                <div class="card " id="${product.id}">
                    <a href="#">
                        <img class="card-img-top " src="${product.image}" alt="Card image" style="width:100%">
                    </a>
                    <div class="card-body">
                        <div class="description">
                            <h4 class="card-title my-3">${product.name}</h4>
                            <p class="card-text"> ${priceCards}  تومان</p>
                            <a   class="btn btn-primary"   onclick="onAddBasketItem('${product.name}','${product.image}',${product.price},1, '${product.id}')" >افزودن به سبد </a>
                        </div>
                    </div>
                </div>
            </div>
      `;
      cardItem.innerHTML = items;
    });
    // initCart();

    
  }

