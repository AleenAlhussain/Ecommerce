let ProductsInCart = localStorage.getItem("ProductsInCart");
let allProducts = document.querySelector(".products");

if (ProductsInCart) {
  let items = JSON.parse(ProductsInCart);
  drawCartProducts(items);
}

// Function to handle removing a product from the cart
function removeFromCart(id) {
  let products = JSON.parse(localStorage.getItem("ProductsInCart"));
  const updatedProducts = products.filter((item) => item.id !== id);
  localStorage.setItem("ProductsInCart", JSON.stringify(updatedProducts));
  drawCartProducts(updatedProducts);
}

// Function to handle updating the quantity
function updateQuantity(id, change) {
  let products = JSON.parse(localStorage.getItem("ProductsInCart"));
  const updatedProducts = products.map((item) => {
    if (item.id === id) {
      item.quantity = (item.quantity || 1) + change; // Increment or decrement the quantity
      if (item.quantity < 1) item.quantity = 1; // Ensure quantity does not go below 1
    }
    return item;
  });
  localStorage.setItem("ProductsInCart", JSON.stringify(updatedProducts));
  drawCartProducts(updatedProducts);
}

// Function to render products in the cart
function drawCartProducts(products) {
  // Calculate total price
  const totalPrice = products.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  let cartHTML = products.map((item) => {
    return `
<div class="row">
  <div class="row main align-items-center">
    <div class="col-2">
      <img class="img-fluid" src="${item.imageUrl}" />
    </div>
    <div class="col">
      <div class="row text-muted">${item.title}</div>
      <div class="row">${item.desc}</div>
    </div>
    <div class="col">
      <a href="#" onClick="updateQuantity(${item.id}, -1)">-</a>
      <a href="#" class="border">${item.quantity || 1}</a>
      <a href="#" onClick="updateQuantity(${item.id}, 1)">+</a>
    </div>
    <div class="col align-end">
      <span>&euro; ${(item.price * (item.quantity || 1)).toFixed(2)}</span>
      <span class="close" onClick="removeFromCart(${item.id})">
        <i class="bi bi-trash-fill"></i>
      </span>
    </div>
  </div>
</div>`;
  }).join("");

  // Add total price section
  const totalHTML = `
  <hr style="border-top: 1px solid #ccc; margin: 20px 0;" />

<div class="row">
  <div class="col text-end">
    <h6>Total Price:${totalPrice.toFixed(2)} &euro; </h6>
  </div>
</div>`;

  // Render products and total price
  allProducts.innerHTML = cartHTML + totalHTML;
}
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
function drawFavoriteItems() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  const favoriteProducts = products.filter(item => favorites.includes(item.id.toString()));

  if (favoriteProducts.length === 0) {
    document.getElementById('favorite-slider').innerHTML = '<p>No favorite items found.</p>';
    return;
  }

  // Build the HTML for the Slick slider
  const sliderItems = favoriteProducts.map(item => `
      <div class="slide">
        <div class="card" style="width: 18rem;">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.desc || 'No description available'}</p>
            <a href="#" class="btn btn-primary">${item.price}$</a>
          </div>
        </div>
      </div>
    `).join('');
    

  // Add the slider to the HTML
  document.getElementById('favorite-slider').innerHTML = `
    <section class="customer-logos slider">
      ${sliderItems}
    </section>
  `;

  // Initialize Slick slider
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