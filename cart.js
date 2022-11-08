// let modal = document.getElementById("modal");
// let data = document.getElementById("par").value;
// let par = document.querySelector('#par');
// const innerInput = document.getElementById("par").value;

let items = "";
// let inputt = "";
const shoppingBaskeItems = [];
// localStorage.setItem('storage' ,  JSON.stringify(productPrice) );
// localStorage.setItem('name' , JSON.stringify(productNames));
// localStorage.setItem('image' , JSON.stringify(images));

shoppingBaskeItems.splice(shoppingBaskeItems.length - 4);

emptyModal();

function emptyModal() {
  if (shoppingBaskeItems.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="/cards-with-sass">محصولات</a> بروید.</p>';
  }
}
creatItems();



function onClickAddBtn(name, image, price,value, buttonId) {
  const obj = {
    id: buttonId,
    productNames: name,
    images: image,
    productPrice: price,};
    // inputNumber : document.getElementById("par").value,
    // inputNumber: data,
    emptyModal();
    shoppingBaskeItems.push(obj);
    creatItems();
    input(buttonId);
    increment(value,buttonId);
  };

function creatItems() {
  items = "";
  for (let product of shoppingBaskeItems) {
    items += `
        <div class="shopping_cart_item">
        <div class="d-flex flex-row align-items-center justify-content-between pt-2">
            <div
                class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
                <img src="${product.images}" alt="mobile"
                    class="logo pl-2">
                <p class="shopping_cart_text">${product.productNames}</p>
            </div>
            <p class="shopping_cart_text">${product.productPrice}</p>
            <div
                class="shopping_cart_button d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-outline-info ml-2"  onclick="incrementCart(+1)">+</button>
                <input type="text" class="input_number" id="parCart" value="1">
                <button type="button" class="btn btn-outline-info mr-2" onclick="incrementCart(-1)">-</button>
            </div>
            <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="onClickDeleteBtn('${product.productNames}')">X</button>
        </div>
        </div>
        `;
    //         let tasks = getAllTask();
    // localStorage.setItem('tasks' ,  JSON.stringify(tasks) );
  }

  modal.innerHTML = items;
  // getAllTask(items);
}
function input(buttonId) {

  let inputt = `<div class="shopping_cart_button d-flex justify-content-center align-items-center"> <button type="button" class="btn btn-outline-info ml-2"   onclick="increment(+1)">+</button><input type="text" class="input_number"  value="1" ><button type="button" class="btn btn-outline-info mr-2" onclick="decrement(-1)">-</button></div>`;
  let card = document.getElementById(buttonId);
  let button = card.querySelector(".btn");
  let div = document.createElement("div");
  div.innerHTML = inputt;
  button.before(div);
  button.remove();
}

function increment(value,buttonId) {
  debugger
  let card = document.getElementById(buttonId);
  let input = card.querySelector(".input_number");
  let currentValue = input.value.split("")[0];
  input.value = +currentValue + value;
}

function decrement(value,buttonId) {
  let card = document.getElementById(buttonId);
  let input = card.querySelector(".input_number");
  if (input.value >= 1) {
    let currentValue = input.value.split("")[0];
    input.value = +currentValue + value;
  }
}
function incrementCart(value) {
  let input = document.getElementById("parCart");
  let currentValue = input.value.split("")[0];
  input.value = +currentValue + value + "";
}

function decrementCart(value) {
  let input = document.getElementById("parCart");
  if (input.value >= 1) {
    let currentValue = input.value.split("")[0];
    input.value = +currentValue + value;
  }
}

function onClickDeleteBtn(name) {
  const index = productNames.indexOf(name);
  if (
    index > -1 &&
    confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟")
  ) {
    // only splice array when item is found
    productNames.splice(index, 1); // 2nd parameter means remove one item only
    images.splice(index, 1);
    productPrice.splice(index, 1);

    creatItems();
    emptyModal();
  }
}
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

