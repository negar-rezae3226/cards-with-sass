let modal = document.getElementById("modal");
const cartCount = document.querySelector(".cart_count");
let addToCartButton = "";
let items = "";
const shoppingBaskeItems = [];
// localStorage.setItem('storage' ,  JSON.stringify(productPrice) );
// localStorage.setItem('name' , JSON.stringify(productNames));
// localStorage.setItem('image' , JSON.stringify(images));


emptyModal();

function emptyModal() {
  if (shoppingBaskeItems.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="/cards-with-sass">محصولات</a> بروید.</p>';
  }
}

function onClickAddBtn(name, image, price, value, productId) {
  const obj = {
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
  input(productId);

}

function createItems() {
  items = "";

  for (let product of shoppingBaskeItems) {
    let productId = product.id;
    let image = product.images;
    let productName = product.productNames;
    let productPrice = product.productPrice;
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
                <input type="text" class="input_number"  value="1">
                <button type="button" class="btn btn-outline-info mr-2" onclick="decrement('${productId}')">-</button>
            </div>
            <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="onClickDeleteBtn('${productId}')">X</button>
        </div>
        </div>
        `;
  }
  modal.innerHTML = items;

  // getAllTask(items);
}
function input(productId) {
  let inputt = `
  <div class="shopping_cart_button d-flex justify-content-center align-items-center onclick="cartCountNumber()" >

   <button type="button" class="btn btn-outline-info ml-2"   onclick="increment('${productId}')">
   +
   </button>

   <input type="text" class="input_number"  value="1" >

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
  let button = card.querySelector(".shopping_cart_button");
  let div = document.createElement("div");
  div.innerHTML = addToCartButton;
  button.before(div);
  button.remove();
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
  cartCount.innerText++;
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
  }
}
function onClickDeleteBtn(productId) {
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟")) {
    let cart = document.getElementById("shopping_" + productId);
    let inputCart = cart.querySelector(".input_number");
    const cartItem = document.getElementById("shopping_" + productId);
    cartItem.remove();
    buttonCard(productId);
    cartCountNumberr();

  }

}
// function incrementCart(productId) {
//   let card = document.getElementById("shopping_"+ productId);
//   let input = card.querySelector(".input_number");
//   let currentValue = input.value.split("")[0];
//   const product = shoppingBaskeItems.find((p) => {
//     return p.id === productId;
//   });
//   product.count = +currentValue + 1;
//   input.value = product.count;
//   cartCount.innerText = product.count;
// }

// function decrementCart(productId) {
//   let inputCart = cart.querySelector(".input_number");
//   let currentValue = inputCart.value.split("")[0];
//   if (inputCart.value >= 1) {
//     const product = shoppingBaskeItems.find((p) => {
//       return p.id === productId;
//     });
//     product.count = +currentValue - 1;
//     inputCart.value = product.count;
//   }
// }

// function incrementCart(value) {
//   let input = document.getElementById("parCart");
//   let currentValue = input.value.split("")[0];
//   input.value = +currentValue + value + "";
// }

// function decrementCart(value) {
//   let input = document.getElementById("parCart");
//   if (input.value >= 1) {
//     let currentValue = input.value.split("")[0];
//     input.value = +currentValue + value;
//   }
// }

// document.addEventListener('DOMContentLoaded' , function (e)  {
//     let tasks;

//     if (localStorage.getItem('tasks') === null) {
//       tasks = [];
//     } else {
//       tasks = localStorage.getItem('tasks').split(',');
//     }
//     for(let item of tasks)
//       item = "";
//       for (let index = 0; index < productNames.length; index++) {
//         item += `
//         <div class="shopping_cart_item">
//         <div class="d-flex flex-row align-items-center justify-content-between pt-2">
//             <div
//                 class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
//                 <img src="${images[index]}" alt="mobile"
//                     class="logo pl-2">
//                 <p class="shopping_cart_text">${productNames[index]}</p>
//             </div>
//             <p class="shopping_cart_text">${productPrice[index]}</p>
//             <div
//                 class="shopping_cart_button d-flex justify-content-center align-items-center">
//                 <button type="button" class="btn btn-outline-info ml-2"  onclick="incrementCart(+1)">+</button>
//                 <input type = "text" class = "input_number" id = "parCart" value = "0" onchange = "myFunction()">
//                 <button type ="button" class ="btn btn-outline-info mr-2" onclick ="decrementCart(-1)">-</button>
//             </div>
//             <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="onClickDeleteBtn('${productNames[index]}')">X</button>
//         </div>
//         </div>
//         `;}
//          modal.innerHTML = items;
// })
// function getAllTask(name , image , price) {
//   let tasks;

//   if (localStorage.getItem('tasks') === null) {
//     tasks = [];
//   } else {
//     tasks = localStorage.getItem('tasks').split(',');
//   }
//   tasks.push(name, image, price);
//   localStorage.setItem('tasks', name,image,price);
// }

// function myFunction() {
//   var mylist = document.getElementById("parCart");
//   document.getElementById("par").value = mylist[mylist.selectedIndex].text;
// }
