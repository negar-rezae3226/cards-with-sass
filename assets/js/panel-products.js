let tableItems = document.getElementById("table-items");
let allProducts;
let newProduct;
let updateProduct;
let panelProduct;
let deleteProduct;
let myVar;
let items = "";
let newItems = "";
let dollarUS = Intl.NumberFormat("en-US");
let modal = document.getElementById("exampleModal");
let modalAlert = document.getElementById("modal-alert");
let modalAlertEdite = document.getElementById("modal-edite");
let modalEdite = document.getElementById("edite-table-items");
let editeModalInnerhtml = document.getElementById("modal-body-table");
let productsCategories;

//#region getproducts

getAllProducts();
allProductsCategories();

function getAllProducts() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((json) => {
      allProducts = json.products;
      console.log(allProducts);
      createTable();
      createNewModal();
    });
}
function allProductsCategories() {
  fetch("https://dummyjson.com/products" + `/categories`)
    .then((res) => res.json())
    .then((json) => {
      productsCategories = json;
      console.log(productsCategories);
      createGroupProducts();
      // inputProductCategory();
    });
}

// function allProductsCategories() {
//     fetch("https://dummyjson.com/products" + `/categories`)
//       .then((res) => res.json())
//       .then((json) => {
//         productsCategories = json;
//         console.log(productsCategories);
//         createGroupProducts();
//       });
//   }

//#endregion

//#region Create Table

function createTable() {
  allProducts.forEach((product) => {
    let price = product.price;
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let priceCards = dollarUSLocale.format(price);
    items += `              
    <tr id="${product.id}"  onmouseover="ChangeBackgroundColor(this)" onmouseout="RestoreBackgroundColor(this)">
    <td>
    <img src="${product.thumbnail}" alt="logo"  class="image-panel rounded-circle">
    </td>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>$${priceCards}</td>
    <td class="sale-color">${product.rating}%</td>
    <td>${product.brand}</td>
    <td>${product.category}</td>
    <td>
    <div class="icone-panel">    
    <i class="mdi tooltip1  pr-2 icone-panel-edite mdi-square-edit-outline"  data-toggle="modal"   data-target="#edite-table-items" onclick="createModal('${product.id}')"> <span class="tooltiptext"> ویرایش محصول</span></i>
    <i class="mdi mdi-delete icon-panel-delete" data-toggle="modal" data-target="#myModal" onclick="modalAlertButton('${product.id}')"></i>
    </div>
    </td>
  </tr>`;
    tableItems.innerHTML = items;
  });
}

//#endregion

//#region deleteItems

function deleteItemsTable(productId) {
  fetch("https://dummyjson.com/products/" + `${productId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => {
      deleteProduct = json.id;
      let deleteItem = document.getElementById(deleteProduct);

      deleteItem.parentElement.removeChild(deleteItem);
    });
}

function deleteNewItemsTable(productId) {
  let deleteItem = document.getElementById(productId);
  deleteItem.parentElement.removeChild(deleteItem);
}
//#endregion

//#region addNewProduct

function addNewProduct() {
  let titleNew = document.getElementById("name_product").value;
  let brandNew = document.getElementById("brand_product").value;
  let priceNew = document.getElementById("price_product").value;
  let saleNew = document.getElementById("sale_product").value;
  let categoryNew = document.getElementById("exampleFormControlSelect1").value;
  let desNew = document.getElementById("floatingTextarea2").value;

  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleNew,
      brand: brandNew,
      category: categoryNew,
      price: priceNew,
      rating: saleNew,
      description: desNew,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      newProduct = json;
      console.log(newProduct);

      const node = document.createElement("tr");
      node.id = newProduct.id;

      newItems += `
     <td>
     <img src="./assets/images/default-image.jpg" alt="logo"  class="image-panel rounded-circle">
     </td>
     <td>${newProduct.title}</td>
     <td>${newProduct.description}</td>
     <td>$${newProduct.price}</td>
     <td class="sale-color">${newProduct.rating}%</td>
     <td>${newProduct.brand}</td>
     <td>${newProduct.category}</td>
     <td>
        <div class="icone-panel">
          <i class="mdi tooltip1  pr-2 icone-panel-edite mdi-square-edit-outline"  data-toggle="modal"   data-target="#edite-table-items"  onclick="createNewModal('${newProduct.id}')"> <span class="tooltiptext"> ویرایش محصول</span></i>
          <i class="mdi mdi-delete icon-panel-delete" data-toggle="modal" data-target="#myModal" onclick="modalAlertButton('${newProduct.id}')"></i>
        </div>
     </td>
     `;
      node.innerHTML = newItems;
      allProducts.push(newProduct);
      tableItems.appendChild(node);
      return;
    });
}

//#endregion

//#region CreateModal

function createModal(productId) {
  fetch("https://dummyjson.com/products/" + `${productId}`)
    .then((res) => res.json())
    .then((json) => {
      panelProduct = json;
      console.log(panelProduct);

      let item = `
                                <div class="form-floating  d-flex mb-2  mr-3 ml-3">
                                  <div>
                                    <label for="title">نام محصول:</label>
                                    <input type="text" class="form-control  m ml-2 " id="name_product_1"  placeholder="نام محصول">
                                  </div>
                                  <div  class="mr-2">
                                    <label for="brand">برند:</label>
                                    <input type="text" class="form-control  m" id="brand_product_1" placeholder="برند محصول" ">
                                  </div>
                                </div>
                                
                                <div class="form-floating mb-2 d-flex  mr-3 ml-3">
                                  <div>
                                    <label for="price">قیمت:</label>
                                    <input type="number" class="form-control  m ml-2" id="price_product_1" placeholder="قیمت">
                                  </div>
                                  <div  class="mr-2">
                                    <label for="sale">تخفیف:</label>
                                    <input type="number" class="form-control  m" id="sale_product_1" placeholder="تخفیف">
                                  </div>
                                </div>

                                <div class="form-group mb-2 m mr-3 ml-3">
                                <label for="category">دسته بندی:</label>
                                    <select class="form-control" id="exampleFormControlSelect2">
                                        <option>${panelProduct.category}</option>
                                        <option>furniture</option>
                                        <option>home-decoration</option>
                                        <option>groceries </option>
                                        <option>groceries</option>
                                        <option>skincare</option>
                                        <option>laptops</option>
                                    </select>
                                </div>
                                <div class="form-floating mr-3 ml-3">
                                    <label for="description">توضیحات:</label>
                                    <textarea class="form-control m " id="textArea_1" placeholder=" توضیحات محصول "  style="height: 150px"></textarea>
                                </div>
                                <div class="button-modal mt-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="updateProductTable('${panelProduct.id}') ; snackbarFunction();">
                                    <span aria-hidden="true">
                                        <div class="button-save">ویرایش</div> 
                                    </span>
                                </button>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                        <div class="button-end">انصراف</div>
                                    </span>
                                </button>
                                </div>
                    `;
      editeModalInnerhtml.innerHTML = item;
      inputValueEdite();
      updateProductTable(productId);
    });
}

// function inputProductCategory() {
//   const nodes = document.createElement("option");
//   let categoryId = document.getElementById("exampleFormControlSelect2");
//   productsCategories.forEach((product) => {  
//       nodes.innerHTML = product;
//       categoryId.appendChild(nodes);
//   });

  // categoryId.appendChild(nodeOption);
  
// }

function inputValueEdite() {

  let editeTitle = document.getElementById("name_product_1");
  let editeTextarea = document.getElementById("textArea_1");
  let editeSale = document.getElementById("sale_product_1");
  let editePrice = document.getElementById("price_product_1");
  let editeBrand = document.getElementById("brand_product_1");

  editeTitle.value = panelProduct.title;
  editeTextarea.value = panelProduct.description;
  editeSale.value = panelProduct.rating;
  editePrice.value = panelProduct.price;
  editeBrand.value = panelProduct.brand;

}

function emptyInputs() {

  let elements = document.getElementsByClassName('empty-input');
  for (var ii=0; ii < elements.length; ii++) {
      elements[ii].value = "";
  }
  let selected = document.getElementById("exampleFormControlSelect1");
  let selectInnerHtml = "";
   selectInnerHtml = `
   <option>دسته بندی</option>
   <option>furniture</option>
   <option>home-decoration</option>
   <option>groceries </option>
   <option>groceries</option>
   <option>skincare</option>
   <option>laptops</option>
   `;
   selected.innerHTML = selectInnerHtml;
}
function createNewModal(productId) {
  // let newProductItem = document.getElementById(productId)
  let item = `
                            <div class="modal-body" id="modal">
                                <div class="form-floating mb-3 d-flex mb-4 mt-4 mr-3 ml-3">
                                    <input type="text" class="form-control m ml-2 " id="name_product" placeholder=" ${allProducts[30].title} ">
                                    <input type="text" class="form-control m" id="brand_product" placeholder="${allProducts[30].brand}  ">
                                </div>
                                <div class="form-floating mb-3 d-flex mb-4 mr-3 ml-3">
                                    <input type="number" class="form-control m ml-2" id="price_product" placeholder="${allProducts[30].price} $ ">
                                    <input type="number" class="form-control m" id="sale_product" placeholder="% ${allProducts[30].rating}">
                                </div>
                                <div class="form-group mb-4 m mr-3 ml-3">
                                    <select class="form-control" id="exampleFormControlSelect1">

                                        <option>${allProducts[30].category}  </option>
                                        <option>furniture</option>
                                        <option>home-decoration</option>
                                        <option>groceries </option>
                                        <option>groceries</option>
                                        <option>skincare</option>
                                        <option>laptops</option>
                                    </select>
                                </div>
                                <div class="form-floating mr-3 ml-3">
                                    <textarea class="form-control m mt-4" placeholder="${allProducts[30].description}" id="floatingTextarea2" style="height: 150px"></textarea>
                                </div>
                                <div class="button-modal mt-4">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="updateProductTable('${allProducts[30].id}') ; snackbarFunction();">
                                    <span aria-hidden="true">
                                        <div class="button-save">ویرایش</div> 
                                    </span>
                                </button>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                        <div class="button-end">انصراف</div>
                                    </span>
                                </button>
                                </div>
                            </div>
                    `;
  editeModalInnerhtml.innerHTML = item;
  updateProductTable(productId);
}

function updateProductTable(productId) {
  let titleNew = document.getElementById("name_product_1").value;
  let brandNew = document.getElementById("brand_product_1").value;
  let priceNew = document.getElementById("price_product_1").value;
  let saleNew = document.getElementById("sale_product_1").value;
  let categoryNew = document.getElementById("exampleFormControlSelect2").value;
  let desNew = document.getElementById("textArea_1").value;

  fetch("https://dummyjson.com/products/" + `${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({
      title: titleNew,
      brand: brandNew,
      category: categoryNew,
      price: priceNew,
      rating: saleNew,
      description: desNew,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      updateProduct = json;
      console.log(updateProduct);
      let itemId = panelProduct.id;
      let itemTable = document.getElementById(itemId);

      let itemChange = `
  <td>
  <img src="${panelProduct.thumbnail}" alt="logo"  class="image-panel rounded-circle">
  </td>
  <td>${updateProduct.title}</td>
  <td>${updateProduct.description}</td>
  <td>$ ${updateProduct.price}</td>
  <td class="sale-color">${updateProduct.rating}%</td>
  <td>${updateProduct.brand}</td>
  <td>${updateProduct.category}</td>
  <td>
  <div class="icone-panel">    
  <i class="mdi  pr-2 icone-panel-edite mdi-square-edit-outline" data-toggle="modal" data-target="#edite-table-items" onclick="updateProductTable('${updateProduct.id}')"></i>
  <i class="mdi mdi-delete icon-panel-delete" data-toggle="modal" data-target="#myModal" onclick="modalAlertButton('${updateProduct.id}')"></i>  </td>
  `;
      itemTable.innerHTML = itemChange;
    });
}

//#endregion

//#region closeModal
function closeModal() {
  document.getElementById("exampleModal").style.display = "none";
  
}
var modal1 = document.getElementById("exampleModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};
//#endregion

//#region loader

function myFunction() {
  myVar = setTimeout(showPage, 1500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

//#endregion

//#region itemsBackground
var TableBackgroundNormalColor = "#ffffff";
var TableBackgroundMouseoverColor = "#e9ecef";
function ChangeBackgroundColor(row) {
  row.style.backgroundColor = TableBackgroundMouseoverColor;
}
function RestoreBackgroundColor(row) {
  row.style.backgroundColor = TableBackgroundNormalColor;
}
//#endregion

//#region onclickFunctions

function onclickFunctions() {
  addNewProduct();
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
<input class="form-control mr-sm-2 mt-3"  type="search" placeholder="جست و جو" id="search-input" aria-label="Search">
 <i class="mdi mdi-magnify search-buttton" id="button-search" onclick="searchProducts()"></i> 

 
`;
allSearchProducts.innerHTML = search;

//#endregion

//#region alert

function modalAlertButton(productId) {
  let buttunModal = `
        <button type="button" class="btn btn-success" class="close" data-dismiss="modal" aria-label="Close" onclick="yesButton(${productId})">بله</button>
<button type="button" class="btn btn-danger" class="close" data-dismiss="modal" aria-label="Close" data-bs-dismiss="modal" onclick="closeModal()">خیر</button>
  `;
  modalAlert.innerHTML = buttunModal;
}

function yesButton(productId) {
  deleteItemsTable(productId);
  deleteNewItemsTable(productId);
  closeModal();
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
let modal2 = document.getElementById("myModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

//#endregion

//#region snackbar

function snackbarFunction() {
  let snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

//#endregion
