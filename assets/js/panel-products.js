let tableItems = document.getElementById("table-items");
let allProducts;
let newProduct;
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
    <tr id="${product.id}">
    <td>
    <img src="${product.thumbnail}" alt="logo"  class="image-panel rounded-circle">
    </td>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>$${priceCards}</td>
    <td>${product.discountPercentage}%</td>
    <td>${product.brand}</td>
    <td>${product.category}</td>
    <td>
    <div class="icone-panel">    
    <i class="mdi  pr-2 icone-panel-edite mdi-square-edit-outline" data-toggle="modal" data-target="#exampleModal" onclick="createModal()"></i>
    <i class="mdi  pr-2 icon-panel-delete mdi-delete" data-toggle="tooltip" data-placement="bottom" onclick="deleteItemsTable('${product.id}')"></i></div>
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
      if (
        confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟") == true
      ) {
        deleteItem.parentElement.removeChild(deleteItem);
      }
    });
}

//#endregion

//#region addNewProduct

function addNewProduct() {
  let titleNew = document.getElementById("name_product").value;
  let brandNew = document.getElementById("brand_product").value;
  let priceNew = document.getElementById("price_product").value;
  let saleNew = document.getElementById("sale_product").value;
  let categoryNew = document.getElementById("exampleFormControlSelect1").value;
  let picNew = document.getElementById("inputGroupFile04").value;
  let desNew = document.getElementById("floatingTextarea2").value;

  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleNew,
      brand: brandNew,
      category: categoryNew,
      price: priceNew,
      discount: saleNew,
      images: picNew,
      description: desNew,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      newProduct = json;
      console.log(newProduct);
    });

  // const node = document.createElement("tr");
  //  newProduct.forEach((product) => {
  //    newItems += `
  // <td>
  // <img src="${product.thumbnail}" alt="logo"  class="image-panel rounded-circle">
  // </td>
  // <td>${product.title}</td>
  // <td>${product.description}</td>
  // <td>$${priceCards}</td>
  // <td>${product.discountPercentage}%</td>
  // <td>${product.brand}</td>
  // <td>${product.category}</td>
  // <td>
  // <div class="icone-panel">
  // <i class="mdi  pr-2 icone-panel-edite mdi-square-edit-outline"></i>
  // <i class="mdi  pr-2 icon-panel-delete mdi-delete" data-toggle="tooltip" data-placement="bottom" onclick="deleteItemsTable('${product.id}')"></i></div>
  // </td>
  // `;
  // tableItems.appendChild(node);
  //  });
}
//#endregion

//#region CreateModal

// function createModal() {

//               let x = `
//                         <div class="modal-content">
//                             <div class="modal-header">
//                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                     <span aria-hidden="true">&times;</span>
//                                 </button>
//                                 <h5 class="modal-title container" id="exampleModalLabel"> ویرایش محصول </h5>
//                             </div>
//                             <div class="modal-body" id="modal">
//                                 <div class="form-floating mb-3 d-flex mb-4 mt-4 mr-3 ml-3">
//                                     <input type="text" class="form-control m ml-2 " id="name_product" placeholder="نام محصول">
//                                     <input type="text" class="form-control m" id="brand_product" placeholder="برند محصول">
//                                 </div>
//                                 <div class="form-floating mb-3 d-flex mb-4 mr-3 ml-3">
//                                     <input type="number" class="form-control m ml-2" id="price_product" placeholder="قیمت">
//                                     <input type="number" class="form-control m" id="sale_product" placeholder="تخفیف ">
//                                 </div>
//                                 <div class="form-group mb-4 m mr-3 ml-3">
//                                     <select class="form-control" id="exampleFormControlSelect1">

//                                         <option>دسته بندی</option>
//                                         <option>furniture</option>
//                                         <option>home-decoration</option>
//                                         <option>groceries </option>
//                                         <option>groceries</option>
//                                         <option>skincare</option>
//                                         <option>laptops</option>
//                                     </select>
//                                 </div>
//                                 <div class="input-group mb-4 mr-3 ml-3">
//                                     <input type="file" class="form-control m file-input pl-2" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
//                                     <button type="button" class="btn btn-primary  ml-4">آپلود عکس</button>
//                                 </div>
//                                 <div class="form-floating mr-3 ml-3">
//                                     <textarea class="form-control m mt-4" placeholder=" توضیحات محصول  "
//                                         id="floatingTextarea2" style="height: 100px"></textarea>
//                                 </div>
//                                 <div class="button-modal mt-4">
//                                     <button type="button" class="btn btn-success pl-4 pr-4" onclick="addNewProduct()">ثبت</button>
//                                 <button type="button" class="btn btn-danger">انصراف</button>
//                                 </div>
//                             </div>
//                         </div>
//                     `
//                     modal.innerHTML = x;

// }


//#endregion
