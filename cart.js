let modal = document.getElementById("modal");
let cartCount = document.querySelector(".cart_count");
let addToCartButton = "";
let items = "";
var shoppingBasketItems = [];

(function () {

  const items = JSON.parse(localStorage.getItem("basketItems"));
  calcBasketItems();

  if (items) {
    shoppingBasketItems = items;
    createBasketItems();
    shoppingBasketItems.forEach((item)=>{
      addQuantityInputToProdutsCart(item.id,item.count);
    })
  }
})();

function emptyModal() {

  if (shoppingBasketItems.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="/cards-with-sass">محصولات</a> بروید.</p>';
  }
}

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

//#region localStorage

function setBasketItemsInLocalStorage(productId) {
  localStorage.setItem("basketItems", JSON.stringify(shoppingBasketItems));

}
function deleteLocalStorage() {

  // const items = JSON.parse(localStorage.getItem("basketItems"));
  // const filtered = items.filter(item => item.id !== productId);
  // localStorage.setItem('items', JSON.stringify(filtered));

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
  const basketItemInputs = document.querySelectorAll(
    `[data-productId=${productId}]`
  );

  basketItemInputs.forEach((input) => {
    input.value = value;
  });
}

//#endregion


function changeButton(productId) {
  let addToCartButton = "";

  for (let product of shoppingBasketItems) {
    
    addToCartButton = ` <a class="btn btn-primary"  onclick="onAddBasketItem('${product.productName}','${product.image}','${product.productPrice}',1,'${product.id}')" >
    افزودن به سبد خرید
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
  }
  else if (product.count <= 1) {
    changeButton(productId);
    removeBasketItem(productId);
    calcBasketItems();
  }

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


