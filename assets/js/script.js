let allProducts = document.querySelector(".products");
let products = [
  {
    id: 1,
    title: "Book 3",
    color: "black",
    imageUrl: "assets/img/portfolio/books-3.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-books",
    price: 10,
  },
  {
    id: 2,
    title: "Book 2",
    color: "red",
    imageUrl: "assets/img/portfolio/books-2.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-books",
    price: 15,
  },
  {
    id: 3,
    title: "Product 3",
    color: "blue",
    imageUrl: "assets/img/portfolio/product-3.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-product",
    price: 25,
  },
  {
    id: 4,
    title: "Book 1",
    color: "grey",
    imageUrl: "assets/img/portfolio/books-1.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-books",
    price: 17,
  },
  {
    id: 5,
    title: "App 1",
    color: "grey",
    imageUrl: "assets/img/portfolio/app-1.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-app",
    price: 30,
  },
  {
    id: 6,
    title: "Branding 1",
    color: "grey",
    imageUrl: "assets/img/portfolio/branding-1.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-branding",
    price: 87,
  },
  {
    id: 7,
    title: "Branding 3",
    color: "grey",
    imageUrl: "assets/img/portfolio/branding-3.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-branding",
    price: 93,
  },
  {
    id: 8,
    title: "App 2",
    color: "grey",
    imageUrl: "assets/img/portfolio/app-2.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-app",
    price: 42,
  },
  {
    id: 9,
    title: "Product 2",
    color: "grey",
    imageUrl: "assets/img/portfolio/product-2.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-product",
    price: 24,
  },
  {
    id: 10,
    title: "Branding 2",
    color: "grey",
    imageUrl: "assets/img/portfolio/branding-2.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-branding",
    price: 12,
  },
  {
    id: 11,
    title: "Product 2",
    color: "grey",
    imageUrl: "assets/img/portfolio/product-1.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-product",
    price: 65,
  },
  {
    id: 12,
    title: "App 3",
    color: "grey",
    imageUrl: "assets/img/portfolio/app-3.jpg",
    desc: "Lorem ipsum, dolor sit amet consectetur",
    filter: "filter-app",
    price: 28,
  },
];
function drawItems() {
    let y = products.map((item) => {
      return `
         <div
           class="col-lg-4 col-md-6 portfolio-item isotope-item ${item.filter}" data-id="${item.id}"
         >
           <div class="portfolio-content h-100">
             <img
               src="${item.imageUrl}"
               class="img-fluid"
               alt=""
             />
             <div class="portfolio-info">
               <h4>${item.title} || ${item.price}$</h4>
               
               <button class="addToCart-link" type="button" data-id="${item.id}" onClick="addToCart(${item.id}, this)">
  <i class="bi bi-patch-plus-fill"></i>
</button>

  
               <p>Lorem ipsum, dolor sit amet consectetur</p>
               <a
                 href="${item.imageUrl}"
                 title="${item.title}"
                 data-gallery="portfolio-gallery-app"
                 class="glightbox preview-link"
               >
                 <i class="bi bi-zoom-in"></i>
               </a>
               <span
                 title="Favorite"
                 class="details-link"
                 onClick="toggleFavorite(this)"
               >
                 <i class="bi bi-suit-heart"></i>
               </span>
             </div>
           </div>
         </div>
      `;
    });
    allProducts.innerHTML = y;
  
    // ربط الأحداث لأزرار الإضافة للسلة
    document.querySelectorAll(".addToCart-link").forEach((button) => {
      button.addEventListener("click", (e) => {
        let id = parseInt(e.target.closest("button").dataset.id);
        addToCart(id, button); // نمرر الزر الحالي لتحديث الأيقونة
      });
    });
  }
  drawItems();
  
  let cartProductDiv = document.querySelector(".carts_products div");
  let badge = document.querySelector(".badge");
  
  let addedItem = localStorage.getItem("ProductsInCart")
    ? JSON.parse(localStorage.getItem("ProductsInCart"))
    : [];
  
  // تحديث شارة السلة
  function updateBadge() {
    if (addedItem.length > 0) {
      badge.style.display = "flex";
      badge.innerHTML = addedItem.length;
    } else {
      badge.style.display = "none";
    }
  }
  
  // عرض العناصر المخزنة في السلة عند التحميل
  if (addedItem) {
    addedItem.map((item) => {
      cartProductDiv.innerHTML += `<p>${item.title}</p>`;
    });
    updateBadge();
  }
  
  // وظيفة الإضافة/الإزالة للسلة (toggle)
  function addToCart(id, button) {
    if (!localStorage.getItem("username")) {
      window.location = "login.html";
      return;
    }
  
    let choosenItem = products.find((item) => item.id === id);
    let itemIndex = addedItem.findIndex((item) => item.id === id);
  
    if (itemIndex > -1) {
      addedItem.splice(itemIndex, 1);
      cartProductDiv.innerHTML = cartProductDiv.innerHTML
        .split("\n")
        .filter((line) => !line.includes(choosenItem.title))
        .join("\n");
      button.innerHTML = '<i class="bi bi-patch-plus-fill"></i>';
    } else {
      addedItem.push(choosenItem);
      cartProductDiv.innerHTML += `<p>${choosenItem.title}</p>`;
      button.innerHTML = '<i class="bi bi-patch-minus-fill"></i>'; 
    }
  
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    updateBadge();
  }
  
  let shoppingCartIcon = document.querySelector(".shopping_cart");
  let cartsProducts = document.querySelector(".carts_products");
  shoppingCartIcon.addEventListener("click", opencart);
  
  function opencart() {
    if (cartProductDiv.innerHTML != "") {
      if (cartsProducts.style.display == "block") {
        cartsProducts.style.display = "none";
      } else {
        cartsProducts.style.display = "block";
      }
    }
  }
  
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase(); // Get search query
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(searchInput)
    );
    drawItems(filteredProducts); 
  }
function toggleFavorite(element) {
    if (!localStorage.getItem("username")) {
      window.location = "login.html";
      return;
    }
  
    const heartIcon = element.querySelector(".bi-suit-heart");
    const itemId = element.closest(".portfolio-item").getAttribute("data-id");
  
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (heartIcon.classList.contains("red-heart")) {

      heartIcon.classList.remove("red-heart");
      favorites = favorites.filter(favorite => favorite !== itemId);
    } else {
 
      heartIcon.classList.add("red-heart");
      favorites.push(itemId);
    }
  
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // drawFavoriteItems();
  }
  
  function drawItems(filteredProducts = products) {
    const y = filteredProducts.map((item) => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFavorite = favorites.includes(item.id.toString());
  
      return `
        <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${item.filter}" data-id="${item.id}">
          <div class="portfolio-content h-100">
            <img src="${item.imageUrl}" class="img-fluid" alt="" />
            <div class="portfolio-info">
              <h4>${item.title} || ${item.price}$</h4>
              <button class="addToCart-link" type="button" data-id="${item.id}" onClick="addToCart(${item.id}, this)">
  <i class="bi bi-patch-plus-fill"></i>
</button>

              <p>${item.desc}</p>
              <a href="${item.imageUrl}" title="${item.title}" class="glightbox preview-link">
                <i class="bi bi-zoom-in"></i>
              </a>
              <span title="Favorite" class="details-link" onClick="toggleFavorite(this)">
                <i class="bi bi-suit-heart ${isFavorite ? 'red-heart' : ''}"></i>
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  
    allProducts.innerHTML = y;
  }
  
  drawItems();
  document.getElementById('searchInput').addEventListener('input', searchProducts);
  function drawFavoriteItems() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteProducts = products.filter(item => favorites.includes(item.id.toString()));
  
    if (favoriteProducts.length === 0) {
      document.getElementById('favorite-slider').innerHTML = '<p>No favorite items found.</p>';
      return;
    }
  
    const sliderItems = favoriteProducts.map(item => `
        <div class="slide">
          <div class="card" style="width: 18rem;">
            <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.description || 'No description available'}</p>
              <a href="#" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      `).join('');
      
  
    document.getElementById('favorite-slider').innerHTML = `
      <section class="customer-logos slider">
        ${sliderItems}
      </section>
    `;

    $(document).ready(function() {
      $('.customer-logos').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 4
          }
        }, {
          breakpoint: 520,
          settings: {
            slidesToShow: 3
          }
        }]
      });
    });
  }
  
  

  document.addEventListener('DOMContentLoaded', drawFavoriteItems);

