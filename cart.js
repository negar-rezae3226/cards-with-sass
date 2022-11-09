let modal = document.getElementById("modal");
// let data = document.getElementById("par").value;
// let par = document.querySelector('#par');
// const innerInput = document.getElementById("par").value;
let addToCartButton  = "";
let items = "";
// let inputt = "";
const shoppingBaskeItems = [];
// localStorage.setItem('storage' ,  JSON.stringify(productPrice) );
// localStorage.setItem('name' , JSON.stringify(productNames));
// localStorage.setItem('image' , JSON.stringify(images));

// shoppingBaskeItems.splice(shoppingBaskeItems.length - 4);

emptyModal();

function emptyModal() {
  if (shoppingBaskeItems.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="/cards-with-sass">محصولات</a> بروید.</p>';
  }
}
createItems();

function onClickAddBtn(name, image, price, value, productId) {
  const obj = {
    id: productId,
    productNames: name,
    images: image,
    count: 1,
    productPrice: price,
  };
  // inputNumber : document.getElementById("par").value,
  // inputNumber: data,
  emptyModal();
  shoppingBaskeItems.push(obj);
  createItems();
  input(productId);
  
  // increment(value,productId);
}

function createItems() {
  items = "";

  for (let product of shoppingBaskeItems) {
    let productId = product.id;
    let image = product.images;
    let productName = product.productNames;
    let productPrice = product.productPrice;
    items += `
        <div class="shopping_cart_item" id="shopping_cart">
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
                <button type="button" class="btn btn-outline-info ml-2"  onclick="incrementCart('${productId}')">+</button>
                <input type="text" class="input_number"  value="1">
                <button type="button" class="btn btn-outline-info mr-2" onclick="decrementCart('${productId}')">-</button>
            </div>
            <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="onClickDeleteBtn('${productId}')">X</button>
        </div>
        </div>
        `;
    //         let tasks = getAllTask();
    // localStorage.setItem('tasks' ,  JSON.stringify(tasks) );
  }

  // let div = document.getElementById('item_443');

  // var div = document.createElement('div');
  modal.innerHTML = items;

  // getAllTask(items);
}
function input(productId) {
  let inputt = `
  <div class="shopping_cart_button d-flex justify-content-center align-items-center">

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

  addToCartButton = "";
  addToCartButton = `<a href="#" class="btn btn-primary"  onclick="onClickAddBtn()" >
  افزودن به سبد خرید
  </a>`;
  let card = document.getElementById(productId);
  let button = card.querySelector(".shopping_cart_button");
  let div = document.createElement("div");
  div.innerHTML = addToCartButton;
  button.before(div);
  button.remove();
}

function increment(productId) {
  let card = document.getElementById(productId);
  let input = card.querySelector(".input_number");
  let currentValue = input.value.split("")[0];
  const product = shoppingBaskeItems.find((p) => {
    return p.id === productId;
  });
  product.count = +currentValue + 1;
  input.value = product.count;
}

function decrement(productId) {
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
    removeObjectWithId(shoppingBaskeItems, productId);
    buttonCard(productId) ;
  }
}
function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((p) => p.id === id);
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟")) {
    arr.splice(objWithIdIndex, 1);
    const cartItem = document.getElementById("shopping_cart");
    cartItem.remove();
  }
  emptyModal();
}
function onClickDeleteBtn() {
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟")) {
    const cartItem = document.getElementById("shopping_cart");
    cartItem.remove();
  }
}
// function incrementCart(productId) {
//   debugger
//   let cart = document.getElementsByClassName("shopping-cart");
//   let inputCart = cart.querySelector(".input_number");
//   let currentValue = inputCart.value.split("")[0];
//   const product = shoppingBaskeItems.find((p) => {
//     return p.id === productId;
//   });
//   product.count = +currentValue + 1;
//   inputCart.value = product.count;
// }

// function decrementCart(productId) {
//   let cart = document.getElementById("shopping-cart");
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
