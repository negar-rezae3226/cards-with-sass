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
let modalAlert = document.getElementById("modal-alert");

//#region cardproducts

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

//#endregion

//#region createCard

function createCard() {
  cardItem.innerHTML = "";
  items = "";
  allProducts.forEach((product) => {
    let price = product.price;
    let dollarUSLocale = Intl.NumberFormat("en-US");
    // let priceCards = dollarUSLocale.format(price);
    let totalValue = Math.floor(
      (product.price * (100 - product.discountPercentage)) / 100
    );
    // let priceSale = dollarUSLocale.format(totalValue);

    items += `
            <div class="col-sm-12 col-lg-4  col-md-4 pt-5 filterDiv  ${product.brand}">
                  <div class="card" id="${product.id}">
                      <a onclick="goProductDetails('${product.id}')" >
                          <img class="card-img-top" src="${product.images[0]}" onmouseout="this.src='${product.images[0]}'" onmouseover="this.src='${product.images[1]}'"  alt="Card image" style="width:100%" >
                      </a>
                      <div class="card-body">
                          <div class="description">
                              <h6 class="card-title my-3">${product.title}</h6>
                              <p class="text-del"><del> ${product.price}</del> $</p>
                              <p class="card-text">  ${totalValue} $</p>
                              <a  class="btn btn-primary"   onclick="onAddBasketItem('${product.title}','${product.thumbnail}',${product.price},1, '${product.id}','${product.discountPercentage}')" >افزودن به سبد </a>
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

  if (items) {
    shoppingBasketItems = items;
    createBasketItems();
    shoppingBasketItems.forEach((item) => {
      addQuantityInputToProdutsCart(item.id, item.count);
      calcBasketItems();
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
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2 mb-5">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="./product.html">محصولات</a> بروید.</p>';
  }
}
//#endregion

//#region Basket

function onAddBasketItem(
  name,
  images,
  price,
  count,
  productId,
  discountPercentage
) {
  const newBasketItem = {
    id: productId,
    title: name,
    thumbnail: images,
    count: 1,
    price: price,
    discountPercentage: discountPercentage,
  };

  shoppingBasketItems.push(newBasketItem);

  createBasketItems();
  addQuantityInputToProdutsCart(productId, count);
  setBasketItemsInLocalStorage();
  calcBasketItems();
}

function createBasketItems() {
  items = "";
  shoppingBasketItems.forEach((product) => {
    let price = product.price;
    let dollarUSLocale = Intl.NumberFormat("en-US");
    // let priceCards = dollarUSLocale.format(price);
    let totalValue = Math.floor(
      (product.price * (100 - product.discountPercentage)) / 100
    );
    let priceSale = dollarUSLocale.format(totalValue);
    items += `
      <tr id="shopping_${product.id}" class="d">
      <td>
        <img src="${product.thumbnail}"  class="logo">
      </td>
      <td>
        <p class="shopping_cart_text">${product.title}</p>
      </td>
      <td>
            <p class="card-text">${priceSale} $</p>
      </td>
      <td>
            <div class="shopping_cart_button d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-outline-info ml-2"  onclick="increment('${product.id}')">+</button>
                <input type="text" class="input_number" data-productId="${product.id}"  value="${product.count}" >
                <button type="button" class="btn btn-outline-info mr-2" id="button-${product.id}"  onclick="decrement('${product.id}')">-</button>
            </div>
      </td>
      <td>
      <i class="mdi mdi-trash-can delete-items" data-toggle="modal" data-target="#myModal" onclick="modalAlertButton('${product.id}')"></i>
      </td>

    </tr>
    `;
  });
  modal.innerHTML = items;
}

function calcBasketItems() {
  if (!shoppingBasketItems) {
    cartCount.innerText = 0;
    return;
  }
  let shoppingCartItems = shoppingBasketItems.length;
  cartCount.innerText = shoppingCartItems;
}

function getBasketItemById(productId) {
  debugger;
  const product = shoppingBasketItems.find((item) => {
    return item.id == productId;
  });

  return product;
}

function deleteButtonInBasket(productId) {
  const cartItem = document.getElementById("shopping_" + productId);
  // const cartItemDelete = document.getElementById( productId);
  // cartItemDelete.remove();
  cartItem.remove();
  changeButton(productId);
  deleteItemInArray(productId);
  emptyModal();
  deleteLocalStorage();
  calcBasketItems();
}
function deleteItemInArray(productId) {
  const index = shoppingBasketItems.findIndex((object) => {
    return object.id === productId;
  });
  shoppingBasketItems.splice(index, 1);
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

   <button type="button" class="btn btn-outline-info" id="button-${productId}-" onclick="decrement('${productId}')">
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
  let result = shoppingBasketItems.find((item) => item.id == productId);
  let addToCartButton = "";

  addToCartButton = ` <a class="btn btn-primary"  onclick="onAddBasketItem('${result.title}','${result.thumbnail}','${result.price}',1,'${result.id}','${result.discountPercentage}')" >
    افزودن به سبد 
    </a> `;
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
    addAttributeModal(productId);
    modalAlertButton(productId);
    // deleteButtonInBasket(productId);

    // calcBasketItems();
  }
}
//#endregion

//#region menu

function createGroupProducts() {
  let productsGroups = "";
  let productsGroup = document.getElementById("products-id");

  for (let i = 0; i < 20; i++) {
    productsGroups += `
     <li><a class="dropdown-item" onclick="goProductGroup('${productsCategories[i]}')" target="_blank"> ${productsCategories[i]} </a></li>
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

let allSearchProducts = document.getElementById("search-products");
let search = `
    <div class="buttonIn">
      <input class="form-control input-search mr-sm-2 mt-3"  type="text" placeholder="جست و جو" id="search-input" aria-label="Search">
      <i class="mdi mdi-close search-buttton close-search-button" id="button-search" onclick="searchClose();"></i> 
    </div>
 <i class="mdi mdi-magnify search-buttton" id="button-search" onclick="searchProducts();"></i> 
`;
allSearchProducts.innerHTML = search;

function searchClose() {
  let closeSeach = document.getElementById("search-input");
  closeSeach.value = "";
  searchProducts();
}

//#endregion

//#region productDeteils

function goProductDetails(productdetail) {
  localStorage.setItem("productDeteilSelected", productdetail);
  window.location.replace("http://127.0.0.1:5500/product_details.html");
}

//#endregion

//#region loader

function myFunction() {
  let myVar;
  myVar = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

//#endregion

//#region closeModal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
let modal1 = document.getElementById("myModal");

window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};
//#endregion

//#region alert

function modalAlertButton(productId) {
  let buttunModal = `
        <button type="button" class="btn btn-success" class="close" data-dismiss="modal" aria-label="Close" onclick="yesButton(${productId})">بله</button>
        <button type="button" class="btn btn-danger" class="close" data-dismiss="modal" aria-label="Close"  data-bs-dismiss="modal" onclick="closeModal()" >خیر</button>
  `;
  modalAlert.innerHTML = buttunModal;
}
function yesButton(productId) {
  deleteButtonInBasket(productId);
  closeModal();
}

function addAttributeModal(productId) {
  let setAttribute = document.getElementById("button-" + productId);
  let setAttributeCard = document.getElementById("button-" + productId + "-");
  setAttributeCard.setAttribute("data-target", "#myModal");
  setAttributeCard.setAttribute("data-toggle", "modal");
  setAttribute.setAttribute("data-target", "#myModal");
  setAttribute.setAttribute("data-toggle", "modal");
}

//#endregion
