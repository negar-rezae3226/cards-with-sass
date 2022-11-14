let products;
 fetch('./assets/json/products.json') .then(x => x.json()) .then((json)=>{
  products=json;
  console.log(products);
 })

 
 products.forEach((product) => {

    items += `
      <div class="shopping_cart_item" id="shopping_${product.id}">
      <div class="d-flex flex-row align-items-center justify-content-between pt-2">
          <div 
              class="cart_text_item d-flex flex-nowrap justify-content-center align-items-center">
              <img src="${product.image}" alt="mobile"
                  class="logo pl-2">
              <p class="shopping_cart_text">${product.name}</p>
          </div>
          <p class="shopping_cart_text">${product.price}</p>
          <div
              class="shopping_cart_button d-flex justify-content-center align-items-center">
              <button type="button" class="btn btn-outline-info ml-2"  onclick="increment('${product[key]}')">+</button>
              <input type="text" class="input_number" data-productId="${product[key]}"  value="${product.count}" >
              <button type="button" class="btn btn-outline-info mr-2" onclick="decrement('${product[key]}')">-</button>
          </div>
          <button class=" btn-danger btn-sm float-right mr-3 delete"   onclick="deleteButtonInBasket('${product[key]}')">X</button>
      </div>
      </div>
      `;
  });
