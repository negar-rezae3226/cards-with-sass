let modal;
let allProducts;
let productsCategories;
let cartCount;
let addToCartButton = "";
let items = "";
let cardItem = document.getElementById("cardItems");
let buttonSearch = document.getElementById("button-search");
let url = "https://dummyjson.com/products";
let dollarUS = Intl.NumberFormat("en-US");
var shoppingBasketItems = [];

//#region cardproducts

// searchInput.addEventListener("input", (event) => {
//   searchProducts(event.target.value);
// });

getAllProducts();
allProductsCategories();

function getAllProducts() {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      allProducts = json.products;
      console.log(allProducts);
      createCard();
    });
}
function allProductsCategories() {
  fetch(url + `/categories`)
    .then((res) => res.json())
    .then((json) => {
      productsCategories = json;
      console.log(productsCategories);
      createGroupProducts();
    });
}

function searchProducts() {
  let searchInput = document.getElementById("search-input").value;
  fetch(url + `/search?q=${searchInput}`)
    .then((res) => res.json())
    .then((json) => {
      allProducts = json.products;
      console.log(allProducts);
      createCard();
    });
}

//#endregion

//#region createCard

function createCard() {
  cardItem.innerHTML = "";
  items = "";
  allProducts.forEach((product) => {
    let price = product.price;
    let dollarUSLocale = Intl.NumberFormat("en-US");

    let priceCards = dollarUSLocale.format(price);

    items += `
            <div class="col-sm-12 col-lg-4  col-md-4 pt-5 filterDiv  ${product.brand}">
                  <div class="card" id="${product.id}">
                      <a href="#">
                          <img class="card-img-top" src="${product.images[0]}" onmouseout="this.src='${product.images[0]}'" onmouseover="this.src='${product.images[1]}'"  alt="Card image" style="width:100%" >
                      </a>
                      <div class="card-body">
                          <div class="description">
                              <h6 class="card-title my-3">${product.title}</h6>
                              <p class="card-text"> $ ${priceCards}</p>
                              <a  class="btn btn-primary"   onclick="onAddBasketItem('${product.title}','${product.images}',${priceCards},1, '${product.id}')" >افزودن به سبد </a>
                          </div>
                      </div>
                  </div>
              </div>
        `;

    cardItem.innerHTML = items;
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

//#region emptyModal
function emptyModal() {
  if (shoppingBasketItems.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="./product.html">محصولات</a> بروید.</p>';
  }
}
//#endregion

//#region Basket

function onAddBasketItem(name, images, price, count, productId) {
  const newBasketItem = {
    id: productId,
    productName: name,
    image: images,
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
  shoppingBasketItems.forEach((product) => {
    items += `
        <div class="shopping_cart_item" id="shopping_${product.id}">
        <div class="d-flex flex-row align-items-center justify-content-between pt-2">
            <div 
                class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
                <img src="${product.image}" alt="" class="logo pl-2">
                <p class="shopping_cart_text">${product.productName}</p>
            </div>
            <p class="shopping_cart_text">${product.productPrice} $</p>
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
  });
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
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟") == true) {
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
    addToCartButton = ` <a class="btn btn-primary"  onclick="onAddBasketItem('${product.productName}','${product.images}','${product.productPrice}',1,'${product.id}')" >
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

  for (let i = 0; i < 10; i++) {
    productsGroups += `
    <div class="dropup">
    <button class="dropbtn"> <a onclick="goProductGroup('${productsCategories[i]}')" target="_blank"> ${productsCategories[i]} </a></button>
    <div class="dropup-content" >
    </div>
    </div>
    `;

    productsGroup.innerHTML = productsGroups;
  }
}

function goProductGroup(productGroupName) {
  localStorage.setItem("productGroupNameSelected", productGroupName);
  window.location.replace("http://127.0.0.1:5500/productsgroup.html");
}

//#endregion

//#region create search

let allSearchProducts = document.getElementById("search-products");
// let searchInput = document.getElementById("search-input").value;

let search = `
<input class="form-control mr-sm-2"  type="search" placeholder="جست و جو" id="search-input" aria-label="Search">
<a class="btn btn-outline-primary my-2 my-sm-0 mr-3"   id="button-search" onclick="searchProducts()"> <i class="mdi mdi-magnify"></i>
`;
allSearchProducts.innerHTML = search;

//#endregion
