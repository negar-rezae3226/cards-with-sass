let allPosts;
let blog = document.getElementById("blog-text");
let productsCategories;

//#region products
  
  getAllPosts();
  allProductsCategories();

  function allProductsCategories() {
    fetch(`https://dummyjson.com/products/categories`)
      .then((res) => res.json())
      .then((json) => {
        productsCategories = json;
        console.log(productsCategories);
        createGroupProducts();
      });
  }

  function getAllPosts() {
    fetch('https://dummyjson.com/posts')
      .then((res) => res.json())
      .then((json) => {
        allPosts = json.posts;
        console.log(allPosts);
        createNews();
      });
  }

//#endregion

//#region create News

function createNews() {
    let news = "";
    allPosts.forEach((posts) => {

      news += `
      <tr>
      <td class="rtl p-5 border-bottom">
          <h2 class="mb-0  mb-2">
              <div class="text-news" href="">${posts.title}</div>
          </h2>
          <div class="mb-2 pt-3 pb-3 date">
              <span>03 مرداد 1400</span><br>
              ●
              <span>${posts.reactions} بازدید</span>
          </div>
          <div class="d-flex align-items-center justify-content-center justify-content-xl-start">
              <a class="mr-lg-0 news-blog-" onclick="goNewsBlog('${posts.title}')" target="_blank"> <i class="mdi mdi-chevron-double-left"></i>ادامه مطلب</a>
          </div>
      </td>
  </tr>
          `;
  
          blog.innerHTML = news;
    });
  }

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
  
  function goProductGroup(productGroupName){
    localStorage.setItem("productGroupNameSelected",productGroupName);
    window.location.replace("http://127.0.0.1:5500/productsgroup.html");

  }

    
  function goNewsBlog(postTitle){
    localStorage.setItem("blogNews",postTitle);
    window.location.replace("http://127.0.0.1:5500/blog-news.html");

  }
  
  //#endregion