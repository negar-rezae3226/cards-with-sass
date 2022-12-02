let blogNews = document.getElementById("news-blog");
let allPosts;

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
  fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((json) => {
      allPosts = json.posts;
      console.log(allPosts);
      createNews();
    });
}

function createNews() {
  let news = "";
  let getNewsTitle = window.localStorage.getItem('blogNews');
  allPosts.forEach((posts) => {
    if (posts.title == getNewsTitle) {
    let tags = posts.tags;
    news += `
      <div class="border p-5 m-5" >

        <h2 class="mb-0  mb-2">
         <div class="text-news- pb-5" >${posts.title}</div>
        </h2>

        <div class="mb-2 pt-3 pb-3 pr-2">
          <span>03 مرداد 1400</span><br>
            ●
          <span>${posts.reactions} بازدید</span>
        </div>

        <div align="justify" class="pt-4 text-body" >${posts.body}</div>
        <div class="pt-5 d-flex">
        <div class = "post-tags">${posts.tags[0]}</div>
        <div class = "post-tags">${posts.tags[1]}</div>
        <div class = "post-tags">${posts.tags[2]}</div>
        </div>

      </div>  
          `;

          blogNews.innerHTML = news;
    }
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
