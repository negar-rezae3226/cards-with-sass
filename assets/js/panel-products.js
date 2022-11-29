let tableItems = document.getElementById("table-items");
let allProducts;
let newProduct;
let updateProduct;
let panelProduct;
let deleteProduct;
let items = "";
let newItems = "";
let dollarUS = Intl.NumberFormat("en-US");
let modal = document.getElementById("exampleModal");
//#region getproducts

getAllProducts();

function getAllProducts() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((json) => {
      allProducts = json.products;
      console.log(allProducts);
      createTable();
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
    <td class="sale-color">${product.discountPercentage}%</td>
    <td>${product.brand}</td>
    <td>${product.category}</td>
    <td>
    <div class="icone-panel">    
    <i class="mdi tooltip1  pr-2 icone-panel-edite mdi-square-edit-outline"  data-toggle="modal"   data-target="#exampleModal" onclick="createModal('${product.id}')"> <span class="tooltiptext"> ویرایش محصول</span></i>
    <i class="mdi  pr-2 icon-panel-delete mdi-delete" data-toggle="tooltip" data-placement="bottom" onclick="deleteItemsTable('${product.id}')"></i></div>
    </td>
  </tr>`;

    tableItems.innerHTML = items;
  });
}

//#endregion

//#region deleteItems

function deleteItemsTable(productId) {
  if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟") == true) {
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
  
       newItems += `
     <td>
     <img src="./assets/images/default-image.jpg" alt="logo"  class="image-panel rounded-circle">
     </td>
     <td>${newProduct.title}</td>
     <td>${newProduct.description}</td>
     <td>$${newProduct.price}</td>
     <td>${newProduct.rating}%</td>
     <td>${newProduct.brand}</td>
     <td>${newProduct.category}</td>
     <td>
     <div class="icone-panel">
     <i class="mdi  pr-2 icone-panel-edite mdi-square-edit-outline" data-toggle="modal" data-target="#exampleModal" onclick="createModal('${newProduct.id}')"></i>
     <i class="mdi  pr-2 icon-panel-delete mdi-delete" data-toggle="tooltip" data-placement="bottom" onclick="deleteItemsTable('${newProduct.id}')"></i></div>
     </td>
     `;
     node.innerHTML =  newItems;

     tableItems.appendChild(node);
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
                        <div class="modal-content modal-style">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="modal-title container" id="exampleModalLabel"> ویرایش محصول </h5>
                            </div>
                            <div class="modal-body" id="modal">
                                <div class="form-floating mb-3 d-flex mb-4 mt-4 mr-3 ml-3">
                                    <input type="text" class="form-control m ml-2 " id="name_product" placeholder=" ${panelProduct.title} ">
                                    <input type="text" class="form-control m" id="brand_product" placeholder="${panelProduct.brand}  ">
                                </div>
                                <div class="form-floating mb-3 d-flex mb-4 mr-3 ml-3">
                                    <input type="number" class="form-control m ml-2" id="price_product" placeholder="${panelProduct.price} $ ">
                                    <input type="number" class="form-control m" id="sale_product" placeholder="% ${panelProduct.discountPercentage}">
                                </div>
                                <div class="form-group mb-4 m mr-3 ml-3">
                                    <select class="form-control" id="exampleFormControlSelect1">

                                        <option>${panelProduct.category}  </option>
                                        <option>furniture</option>
                                        <option>home-decoration</option>
                                        <option>groceries </option>
                                        <option>groceries</option>
                                        <option>skincare</option>
                                        <option>laptops</option>
                                    </select>
                                </div>
                                <div class="form-floating mr-3 ml-3">
                                    <textarea class="form-control m mt-4" placeholder="${panelProduct.description}" id="floatingTextarea2" style="height: 150px"></textarea>
                                </div>
                                <div class="button-modal mt-4">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="updateProductTable('${panelProduct.id}')">
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
                        </div>
                    `;
      modal.innerHTML = item;
      updateProductTable(productId);
    });
}

function updateProductTable(productId) {
  let titleNew = document.getElementById("name_product").value;
  let brandNew = document.getElementById("brand_product").value;
  let priceNew = document.getElementById("price_product").value;
  let saleNew = document.getElementById("sale_product").value;
  let categoryNew = document.getElementById("exampleFormControlSelect1").value;
  // let picNew = document.getElementById("inputGroupFile04").value;
  let desNew = document.getElementById("floatingTextarea2").value;

  fetch("https://dummyjson.com/products/" + `${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({
      title: titleNew,
      brand: brandNew,
      category: categoryNew,
      price: priceNew,
      rating: saleNew,
      // images: picNew,
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
  <td>${updateProduct.rating}%</td>
  <td>${updateProduct.brand}</td>
  <td>${updateProduct.category}</td>
  <td>
  <div class="icone-panel">    
  <i class="mdi  pr-2 icone-panel-edite mdi-square-edit-outline" data-toggle="modal" data-target="#exampleModal" onclick="createModal('${updateProduct.id}')"></i>
  <i class="mdi  pr-2 icon-panel-delete mdi-delete" data-toggle="tooltip" data-placement="bottom" onclick="deleteItemsTable('${updateProduct.id}')"></i></div>
  </td>
  `;
      itemTable.innerHTML = itemChange;
    });
}

//#endregion

//#region loader
let myVar;

function myFunction() {
  myVar = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

//#region end



var TableBackgroundNormalColor = "#ffffff";
var TableBackgroundMouseoverColor = "#e9ecef";

// These two functions need no customization.
function ChangeBackgroundColor(row) { row.style.backgroundColor = TableBackgroundMouseoverColor; }
function RestoreBackgroundColor(row) { row.style.backgroundColor = TableBackgroundNormalColor; }



function closeModal(){
  document.getElementById('exampleModal').style.display='none'
}
var modal1 = document.getElementById('exampleModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
}
