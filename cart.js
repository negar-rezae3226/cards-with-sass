let modal = document.getElementById("modal");
let cartCount = document.querySelector(".cart_count");
let addToCartButton = "";
let items = "";
var shoppingBaskeItems = [];




// cartCount.innerText = shoppingBaskeItems.length;

function emptyModal() {
  console.log(shoppingBaskeItems);
  if (shoppingBaskeItems.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="/cards-with-sass">محصولات</a> بروید.</p>';
  }
}

function onClickAddBtn(name, image, price, count, productId) {
let obj = {
    id: productId,
    productNames: name,
    images: image,
    count: 1,
    productPrice: price,
  };
  emptyModal();
  shoppingBaskeItems.push(obj);
  cartCountNumber();
  createItems();
  input(productId,count);
 setInLocalStorage();
  

}

function createItems() {
  items = "";

  for (let product of shoppingBaskeItems) {
    let productId = product.id;
    let image = product.images;
    let productName = product.productNames;
    let productPrice = product.productPrice;
    let count = product.count;
    items += `
        <div class="shopping_cart_item" id="shopping_${productId}">
        <div class="d-flex flex-row align-items-center justify-content-between pt-2">
            <div 
                class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
                <img src="${image}" alt="mobile"
                    class="logo pl-2">
                <p class="shopping_cart_text">${productName}</p>
            </div>
            <p class="shopping_cart_text">${productPrice}</p>
            <div
                class="shopping_cart_button d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-outline-info ml-2"  onclick="increment('${productId}')">+</button>
                <input type="text" class="input_number"  value="${count}" >
                <button type="button" class="btn btn-outline-info mr-2" onclick="decrement('${productId}')">-</button>
            </div>
            <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="onClickDeleteBtn('${productId}')">X</button>
        </div>
        </div>
        `;
  }
  modal.innerHTML = items;
// window.localStorage.setItem("myObject", JSON.stringify(shoppingBaskeItems));
// modal.innerHTML = window.localStorage.getItem("myObject");

// window.localStorage.setItem("myObject", JSON.stringify(shoppingBaskeItems));
// let newObject = window.localStorage.getItem("myObject");
// console.log(JSON.parse(newObject));
  // getAllTask(items);
}
function input(productId,count) {
  let inputt = `
  <div class="shopping_cart_button d-flex justify-content-center align-items-center onclick="cartCountNumber()" >

   <button type="button" class="btn btn-outline-info ml-2"   onclick="increment('${productId}')">
   +
   </button>

   <input type="text" class="input_number"  value="${count} " >

   <button type="button" class="btn btn-outline-info mr-2" onclick="decrement('${productId}')">
   -
   </button>

   </div>
   `;
  let card = document.getElementById(productId);
  let button = card.querySelector(".btn");
  let div = document.createElement("div");
  div.innerHTML = inputt;
  button.before(div);
  button.remove();
}
function buttonCard(productId) {
  let addToCartButton = "";

  for (let product of shoppingBaskeItems) {
    let productId = product.id;
    let image = product.images;
    let productName = product.productNames;
    let productPrice = product.productPrice;
    
    addToCartButton = ` <a class="btn btn-primary"  onclick="onClickAddBtn('${productName}','${image}','${productPrice}',1,'${productId}')" >
    افزودن به سبد خرید
    </a> `;
  }
  input(productId);
  let card = document.getElementById(productId);
  let buttonCard = card.querySelector(".shopping_cart_button");
  let div = document.createElement("div");
  div.innerHTML = addToCartButton;
  buttonCard.before(div);
  buttonCard.remove();
}

// function buttonCard(productId) {

//   let butttonCart = document.getElementById(productId);
//   let btn = butttonCart.querySelector(".btn");

//     // addToCartButton = `<a class="btn btn-primary"  onclick="onClickAddBtn()" >
//     // افزودن به سبد خرید
//     // </a>`;

//     let div = document.createElement("div");
//     let divv= div.appendChild(btn);
//     // div.innerHTML = addToCartButton;
//     divv.before(div);
//     divv.remove();
//   }

function increment(productId) {
  let card = document.getElementById(productId);
  let input = card.querySelector(".input_number");
  let currentValue = input.value.split("")[0];
  let cart = document.getElementById("shopping_" + productId);
  let inputCart = cart.querySelector(".input_number");
  let currentValueCart = inputCart.value.split("")[0];

  const product = shoppingBaskeItems.find((p) => {
    return p.id === productId;
  });
  const productCart = shoppingBaskeItems.find((p) => {
    return p.id === productId;
  });

  product.count = +currentValue + 1;
  input.value = product.count;
  productCart.count = +currentValueCart + 1;
  inputCart.value = productCart.count;
  
  // cartCount.innerText = product.count;
}
function cartCountNumber() {
  cartCount.innerText = shoppingBaskeItems.length;
}
function cartCountNumberr() {

    cartCount.innerText--;


}

function decrement(productId) {
  let cart = document.getElementById("shopping_" + productId);
  let inputCart = cart.querySelector(".input_number");
  let card = document.getElementById(productId);
  let input = card.querySelector(".input_number");

  let currentValue = input.value.split("")[0];
  if (input.value >= 2) {
    const product = shoppingBaskeItems.find((p) => {
      return p.id === productId;
    });
    product.count = +currentValue - 1;
    input.value = product.count;
  } else if (input.value < 2) {
    buttonCard(productId);
    removeObjectWithId(shoppingBaskeItems, productId, productId);
    cartCountNumberr();
  }

  let currentValueCart = inputCart.value.split("")[0];
  if (inputCart.value >= 2) {
    const product = shoppingBaskeItems.find((p) => {
      return p.id === productId;
    });
    product.count = +currentValueCart - 1;
    
    inputCart.value = product.count;
  }
}
function removeObjectWithId(arr, id, productId) {
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟")) {
  const objWithIdIndex = arr.findIndex((p) => p.id === id);
    arr.splice(objWithIdIndex, 1);
    const cartItem = document.getElementById("shopping_" + productId);
    cartItem.remove();
    emptyModal();
  }
}
function onClickDeleteBtn(productId) {
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟") == true) {
    // let cart = document.getElementById("shopping_" + productId);
    // let inputCart = cart.querySelector(".input_number");
    const cartItem = document.getElementById("shopping_" + productId);
    cartItem.remove();
    buttonCard(productId);
    cartCountNumberr();
    emptyModal();
    deleteLocalStorage();
  }

}
// (function () 
//   {
//     // let objItems = JSON.stringify(shoppingBaskeItems);
//     // window.localStorage.setItem("myObject", objItems);
//     // let x = window.localStorage.getItem("myObject");
//     // console.log(x);

//     window.localStorage.setItem("myObject", JSON.stringify(shoppingBaskeItems));
// let newObject = window.localStorage.getItem("myObject");
//   }
// )
// ();



// // function deleteLocalStorage(){
// //   localStorage.removeItem("myObject");
// // }

function  setInLocalStorage(){
  localStorage.setItem("myObject", JSON.stringify(shoppingBaskeItems));
  // let newObject = window.localStorage.getItem("myObject");
}
(function(){
  cartCountNumber();
  const items= JSON.parse( localStorage.getItem("myObject"));

  if (items) {
    shoppingBaskeItems=items;
    createItems();
  }
})();

function deleteLocalStorage(){
  
  localStorage.removeItem("myObject");
}

function cartCountNumber(){
  cartCount.innerText = shoppingBaskeItems.length;
  }
