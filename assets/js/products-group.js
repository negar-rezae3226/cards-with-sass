let modal;
let products;
let cartCount;
let addToCartButton = "";
let items = "";
let cardItem = document.getElementById("cardItems");
// let phoneId = document.querySelectorAll("products-name");

let dollarUS = Intl.NumberFormat("en-US");
var shoppingBasketItems = [];

//#region card
(function () {
  fetch("./assets/json/products.json")
    .then((x) => x.json())
    .then((json) => {
      products = json;
      console.log(products);
      createGroupProducts();
    });

  const timeOut = setTimeout(() => {
    createCard();
    clearTimeout(timeOut);
  }, 100);
})();

function createCard() {
  products.forEach((product) => {
    let price = product.price;
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let urlPage = document.URL;
    const url = new URL(urlPage);
    let pathNamePage = url.pathname;
    let priceCards = dollarUSLocale.format(price);
    if (product.webName === pathNamePage) {
      items += `
        <div class="col-sm-12 col-lg-3  col-md-3 pt-5 filterDiv  ${product.productGroup}">
              <div class="card " id="${product.id}">
                  <a href="./product_details.html/${product.name}">
                      <img class="card-img-top " id="22" src="${product.image[0]}" onmouseout="this.src='${product.image[0]}'" onmouseover="this.src='${product.image[1]}'"  alt="Card image" style="width:100%" >
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
    }
  });

  initCart();
}
//#endregion

//#region GlobalParamtres
function initCart() {
  setGlobalParamtres();
  const items = JSON.parse(localStorage.getItem("basketItems"));
  calcBasketItems();

  if (items) {
    shoppingBasketItems = items;
    createBasketItems();
    shoppingBasketItems.forEach((item) => {
      addQuantityInputToProdutsCart(item.id, item.count);
    });
  }
}

function setGlobalParamtres() {
  modal = document.getElementById("modal");
  cartCount = document.querySelector(".cart_count");
}
//#endregion

//#region eptyModal
function emptyModal() {
  if (shoppingBasketItems.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="/cards-with-sass">محصولات</a> بروید.</p>';
  }
}
//#endregion

//#region Basket

function onAddBasketItem(name, image, price, count, productId) {
  const newBasketItem = {
    id: productId,
    productName: name,
    image: image,
    count: 1,
    productPrice: price,
  };

  shoppingBasketItems.push(newBasketItem);

  createBasketItems();
  calcBasketItems();
  addQuantityInputToProdutsCart(productId, count);
  setBasketItemsInLocalStorage();
}

function createBasketItems() {
  items = "";

  for (let product of shoppingBasketItems) {
    items += `
        <div class="shopping_cart_item" id="shopping_${product.id}">
        <div class="d-flex flex-row align-items-center justify-content-between pt-2">
            <div 
                class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
                <img src="${product.image}" alt="mobile"
                    class="logo pl-2">
                <p class="shopping_cart_text">${product.productName}</p>
            </div>
            <p class="shopping_cart_text">${product.productPrice}</p>
            <div
                class="shopping_cart_button d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-outline-info ml-2"  onclick="increment('${product.id}')">+</button>
                <input type="text" class="input_number" data-productId="${product.id}"  value="${product.count}" >
                <button type="button" class="btn btn-outline-info mr-2" onclick="decrement('${product.id}')">-</button>
            </div>
            <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="deleteButtonInBasket('${product.id}')">X</button>
        </div>
        </div>
        `;
  }
  emptyModal();
  modal.innerHTML = items;
}

function calcBasketItems() {
  if (!shoppingBasketItems) {
    cartCount.innerText = 0;
    return;
  }
  cartCount.innerText = shoppingBasketItems.length;
}

function getBasketItemById(productId) {
  const product = shoppingBasketItems.find((item) => {
    return item.id === productId;
  });

  return product;
}

function removeBasketItem(productId) {
  const basketItem = getBasketItemById(productId);
  shoppingBasketItems.splice(basketItem, 1);
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟")) {
    const cartItem = document.getElementById("shopping_" + productId);
    cartItem.remove();
    emptyModal();
    deleteLocalStorage();
  }
}

function deleteButtonInBasket(productId) {
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟") == true) {
    const cartItem = document.getElementById("shopping_" + productId);
    cartItem.remove();
    changeButton(productId);
    calcBasketItems();
    emptyModal();
    deleteLocalStorage();
  }
}
//#endregion

//#region localStorage

function setBasketItemsInLocalStorage(productId) {
  localStorage.setItem("basketItems", JSON.stringify(shoppingBasketItems));
}
function deleteLocalStorage() {
  localStorage.removeItem("basketItems");
}

//#endregion

//#region quantityInput

function addQuantityInputToProdutsCart(productId, count) {
  let quantityInput = `
  <div class="shopping_cart_button d-flex justify-content-center align-items-center" >



   <button type="button" class="btn btn-outline-info " onclick="increment('${productId}')">
   +
   </button>

   <input type="text" class="input_number mr-2 ml-2" data-productId="${productId}"  value="${count} " >

   <button type="button" class="btn btn-outline-info " onclick="decrement('${productId}')">
   -
   </button>

   </div>
   `;
  let card = document.getElementById(productId);
  let button = card.querySelector(".btn");
  let div = document.createElement("div");
  div.innerHTML = quantityInput;
  button.before(div);
  button.remove();
}

function updateQuantityInputValue(productId, value) {
  const productInputs = document.querySelectorAll(`[data-productId]`);
  let basketItemInputs = [];
  productInputs.forEach((item) => {
    const attr = item.getAttribute("data-productId");
    if (+attr == productId) basketItemInputs.push(item);
  });
  basketItemInputs.forEach((input) => {
    input.value = value;
  });
}

//#endregion

//#region change
function changeButton(productId) {
  let addToCartButton = "";

  for (let product of shoppingBasketItems) {
    addToCartButton = ` <a class="btn btn-primary"  onclick="onAddBasketItem('${product.productName}','${product.image}','${product.productPrice}',1,'${product.id}')" >
    افزودن به سبد 
    </a> `;
  }
  addQuantityInputToProdutsCart(productId);
  let card = document.getElementById(productId);
  let buttonCard = card.querySelector(".shopping_cart_button");
  let div = document.createElement("div");
  div.innerHTML = addToCartButton;
  buttonCard.before(div);
  buttonCard.remove();
}
//#endregion

//#region incer-decr
function increment(productId) {
  const product = getBasketItemById(productId);
  product.count += 1;
  updateQuantityInputValue(productId, product.count);
  setBasketItemsInLocalStorage();
}

function decrement(productId) {
  const product = getBasketItemById(productId);
  if (product.count > 1) {
    product.count -= 1;
    updateQuantityInputValue(productId, product.count);
    setBasketItemsInLocalStorage();
  } else if (product.count <= 1) {
    changeButton(productId);
    removeBasketItem(productId);
    calcBasketItems();
  }
}
//#endregion

//#region menu

function createGroupProducts() {
  let productsGroups = "";
  let productsGroup = document.getElementById("products-id");

  for (let i = 0; i < 5; i++) {
    productsGroups += `
      <div class="dropup">
      <button class="dropbtn"> <a href="./productsgroup.html/?productGroup=${products[i].productGroup}"> ${products[i].productGroup} </a></button>
      <div class="dropup-content" >
      </div>
      </div>
          `;

    productsGroup.innerHTML = productsGroups;
  }
}
