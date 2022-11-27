let tableItems = document.getElementById("table-items");
let allProducts;
let deleteProduct;
let items = "";
let dollarUS = Intl.NumberFormat("en-US");

//#region cardproducts

getAllProducts();
deleteProductAPI();

// searchInput.addEventListener("change", (event) => {
//     searchProducts(event.target.value);
//   });

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

function deleteProductAPI() {
  fetch("https://dummyjson.com/products/1", {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => {
      deleteProduct = json;
      console.log(deleteProduct);

    });
}

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
    <i class="mdi  pr-2 icone-panel-edite mdi-square-edit-outline"></i>
    <i class="mdi  pr-2 icon-panel-delete mdi-delete" data-toggle="tooltip" data-placement="bottom" onclick="deleteItemsTable('${product.id}')"></i></div>
    </td>
  </tr>`;

    tableItems.innerHTML = items;
  });
}

function deleteItemsTable(productId){
    if (confirm("کالا از سبد خرید شما حذف خواهد شد.آیا مطمئن هستید؟") == true) {
    let deleteItem = document.getElementById(productId);
    deleteItem.parentElement.removeChild(deleteItem);
    }
}

//#endregion


//#region CreateModal

// function createGroupProducts() {
//     let productsGroups = "";
//     let productsGroup = document.getElementById("products-id");
  
//     for (let i = 0; i < 10; i++) {
      
//       productsGroups += `
//       <div class="dropup">
//       <button class="dropbtn"> <a onclick="goProductGroup('${productsCategories[i]}')" target="_blank"> ${productsCategories[i]} </a></button>
//       <div class="dropup-content" >
//       </div>
//       </div>
//       `;
      
//       productsGroup.innerHTML = productsGroups;
//     }
  
//   }
  

//#endregion