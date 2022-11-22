let modal;
let ProductDetail;
let cartCount;
let addToCartButton = "";
let items = "";
let details = "";
let cardItem = document.getElementById("cardItems");
let dollarUS = Intl.NumberFormat("en-US");
var shoppingBasketItems = [];

(function () {
  // fetch('https://dummyjson.com/products/1')
  // .then((res) => res.json())
  // .then((json) => {
  //   allProducts = json;
  //   console.log(allProducts);
  //   createCard();
  // });
  fetch("https://dummyjson.com/products/1")
    .then((res) => res.json())
    .then((json) => {
      ProductDetail = json;
      console.log(ProductDetail);
      productsDetail();
      createSpecificationTable();
    });
})();

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
    <img src="${ProductDetail.images[0]}" alt="iphon13promax" class="product_img">
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
function createSpecificationTable(){
    totalValue = ProductDetail.price * (100 - ProductDetail.discountPercentage) / 100
    let SpecificationTable = document.getElementById("Specification"); 
    SpecificationItem = `
    <div class="product_features">
    <div class="Specification_item border-bottom pb-2 pt-4">
        
        <p class="product_text"> <i class="mdi pl-1 mdi-store"></i>فروشگاه دیجیتال موبایل </p>
    </div>
    <div class="Specification_item border-bottom pt-3 pb-2">
        
        <p class="product_text"> <i class="mdi pl-1 mdi-shield-check"></i>گارانتی 18 ماهه شهر دیجیتال</p>
    </div>
    <div class="Specification_item border-bottom pt-3 pb-2">
        
        <p class="product_text"><i class="mdi pl-1 mdi-check-decagram"></i>برند ${ProductDetail.brand}</p>
    </div>
    <div class="Specification_item pt-3 pb-2">

        <p class="product_text"> <i class="mdi pl-1 mdi-currency-usd"></i>قیمت فروشنده </p>
        <p class="text-del"><del> ${ProductDetail.price}</del> $</p>
        <p class="text">${totalValue} $</p>
        

    </div>

    <div class="button pb-5 pt-2">
        <button class="button_cart ">افزودن به سبد خرید</button>
    </div>

</div>`;
SpecificationTable.innerHTML= SpecificationItem;
}


//#endregion

