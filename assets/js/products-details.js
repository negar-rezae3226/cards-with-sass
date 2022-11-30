let modal;
let ProductDetail;
let cartCount;
let addToCartButton = "";
let items = "";
let details = "";
let cardItem = document.getElementById("cardItems");
let getProduct = window.localStorage.getItem("productDeteilSelected");
let dollarUS = Intl.NumberFormat("en-US");
var shoppingBasketItems = [];
let modalImage = document.getElementById("myModal");

selectItem();

function allProductsCategories() {
  fetch(url + `/categories`)
    .then((res) => res.json())
    .then((json) => {
      productsCategories = json;
      console.log(productsCategories);
      createGroupProducts();
    });
}

function selectItem() {
  fetch("https://dummyjson.com/products/" + `${getProduct} `)
    .then((res) => res.json())
    .then((json) => {
      ProductDetail = json;
      console.log(ProductDetail);
      productsDetail();
      createSpecificationTable();
    });
}

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

//#region producstdetail
function productsDetail() {
  let productDetails = document.getElementById("details");
  // ProductDetail.forEach((product) => {
  details = `
<div class="product_summary row">
<div class="md-6">
    <img src="${ProductDetail.images[0]}" alt="" class="product_img" id="myImg">
    <div id="myModal" class="modal">
       <span class="close">&times;</span>
       <img class="modal-content" id="img01">
    </div>
</div>
<div class="md-6">
    <div class="description_product pt-3 pr-1">
        <p class="title_product">${ProductDetail.title}</p>
        <p class="text_eng">${ProductDetail.description}</p>
        <div class="product_feature">
            <ul>
                <li>
                    <div class="feature_list">
                        <p class="text_eng">فناوری صفحه‌ نمایش :</p>
                        <p class="text">Super Retina XDR OLED</p>
                    </div>
                </li>
                <li>
                    <div class="feature_list">
                        <p>اندازه:</p>
                        <p class="text">6.7</p>
                    </div>
                </li>
                <li>
                    <div class="feature_list">
                        <p>نسخه سیستم عامل :</p>
                        <p class="text">iOS 15</p>
                    </div>
                </li>

                <li>
                    <div class="feature_list">
                        <p>رزولوشن عکس :</p>
                        <p class="text">12 مگاپیکسل</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</div>
`;
  productDetails.innerHTML = details;
}
function createSpecificationTable() {
  let specificationItem;
  totalValue = Math.floor(
    (ProductDetail.price * (100 - ProductDetail.discountPercentage)) / 100
  );
  let specificationTable = document.getElementById("Specification");
  specificationItem = `
    <div class="product_features">
    <div class="Specification_item border-bottom pb-2 pt-4">
        
        <p class="product_text"> <i class="mdi pl-1 mdi-store"></i>فروشگاه وین </p>
    </div>
    <div class="Specification_item border-bottom pt-3 pb-2">
        
        <p class="product_text"> <i class="mdi pl-1 mdi-shield-check"></i>گارانتی 18 ماهه فروشگاه </p>
    </div>
    <div class="Specification_item border-bottom pt-3 pb-2">
        
        <p class="product_text"><i class="mdi pl-1 mdi-check-decagram"></i>برند ${ProductDetail.brand}</p>
    </div>
    <div class="Specification_item pt-3 pb-2">

        <p class="product_text"> <i class="mdi pl-1 mdi-currency-usd"></i>قیمت فروشنده </p>
        <p class="text-del"><del> ${ProductDetail.price}</del> $</p>
        <p class="text">${totalValue} $</p>
        

    </div>
    <a  class="btn btn-primary button-product"   onclick="onAddBasketItem('${ProductDetail.title}','${ProductDetail.images}',${ProductDetail.price},1, '${ProductDetail.id}')" >افزودن به سبد </a>


</div>`;
  specificationTable.innerHTML = specificationItem;

  initCart();
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
  shoppingBasketItems.forEach((product) => {
    items += `
        <div class="shopping_cart_item" id="shopping_${product.id}">
        <div class="d-flex flex-row align-items-center justify-content-between pt-2">
            <div 
                class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
                <img src="${product.images}" alt="mobile" class="logo pl-2">
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

//#region modal Image

// let img = document.getElementById("myImg");
// let modalImg = document.getElementById("img01");
// function imagemodal(){
//   modal.style.display = "block";
//   modalImg.src = this.src;
// }

// let span = document.getElementsByClassName("close")[0];


// span.onclick = function() { 
//   modal.style.display = "none";
// }

//#endregion

