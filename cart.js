let modal = document.getElementById("modal");
let items = "";
// let inputt = "";
const productNames = [
  "iphon 13 pro max",
  "Samsung S22 Ultra",
  "Xiaomi 11 ultra",
  "Samsung Z Fold 4",
];
const images = [
  "./assets/images/iphon13promax.jpg",
  "./assets/images/samsung-s22-ultra-rose.png",
  "./assets/images/mi-11-Ultra-xiaomi.jpg",
  "./assets/images/z fold.jpg",
];
const productPrice = ['70,600,000', '38,900,000', '60,000,000', '38,900,000'];

localStorage.setItem('storage' ,  JSON.stringify(productPrice) );
localStorage.setItem('name' , JSON.stringify(productNames));
localStorage.setItem('image' , JSON.stringify(images));

getAllTask();
emptyModal();


productNames.splice(productNames.length - 4);
images.splice(images.length - 4);
productPrice.splice(productPrice.length - 4);

function emptyModal() {
  if (productNames.length == 0) {
    modal.innerHTML =
      ' <p class="modaltext mt-5">سبد خرید شما خالی است!</p><p class="modaltext2">می‌توانید برای مشاهده محصولات بیشتر به صفحه <a href="/cards-with-sass">محصولات</a> بروید.</p>';
  }
}
creatItems();

function onClickAddBtn(name, image, price ,buttonId ) {
  emptyModal();
  productNames.push(name);
  images.push(image);
  productPrice.push(price);
  creatItems();
  input(buttonId);

}

function creatItems() {
  items = "";

  for (let index = 0; index < productNames.length; index++) {
    items += `
        <div class="shopping_cart_item">
        <div class="d-flex flex-row align-items-center justify-content-between pt-2">
            <div
                class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
                <img src="${images[index]}" alt="mobile"
                    class="logo pl-2">
                <p class="shopping_cart_text">${productNames[index]}</p>
            </div>
            <p class="shopping_cart_text">${productPrice[index]}</p>
            <div
                class="shopping_cart_button d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-outline-info ml-2"  onclick="incrementCart(+1)">+</button>
                <input type="text" class="input_number" id="parCart" value="0">
                <button type="button" class="btn btn-outline-info mr-2" onclick="incrementCart(-1)">-</button>
            </div>
            <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="onClickDeleteBtn('${productNames[index]}')">X</button>
        </div>
        </div>
        `;
//         let tasks = getAllTask();
// localStorage.setItem('tasks' ,  JSON.stringify(tasks) );

  }

  modal.innerHTML = items;
  getAllTask(items);
}
function input(buttonId){
    let inputt = `<div class="shopping_cart_button d-flex justify-content-center align-items-center"> <button type="button" class="btn btn-outline-info ml-2"   onclick="increment(+1)">+</button><input type="text" class="input_number" id="par" value="0" ><button type="button" class="btn btn-outline-info mr-2" onclick="increment(-1)">-</button></div>`;
    let button = document.getElementById(buttonId);
    let div=document.createElement('div');
    div.innerHTML=inputt;
    button.before(div);
    button.remove();
    // console.log(buttonId);
    // button.innerHTML=inputt;
}
function increment(value) {
    let input = document.getElementById("par");
    let currentValue = input.value.split("")[0];
    input.value = +currentValue + value + "";
}


function incrementCart(value) {
  let input = document.getElementById("parCart");
  let currentValue = input.value.split("")[0];
  input.value = +currentValue + value + "";
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
 function getAllTask(task){
  let tasks;

  if(localStorage.getItem('tasks') == null )
  {
    tasks = [];
  }
  else{
    tasks = localStorage.getItem('tasks').split(',');
  }
  tasks.push(task);
  localStorage.setItem('tasks' , task );
 }
