import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js'; 

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        &#8377; ${(product.priceCents / 100).toFixed(2)}
      </div>
      
      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});




function updateCartQuantity() {
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerText = cartQuantity;
    }

document.querySelector('.products-grid')
  .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();

    });
  });

const productContainers = document.querySelectorAll('.product-container');

productContainers.forEach(container => {
  const button = container.querySelector('.add-to-cart-button'); // the button
  const message = container.querySelector('.added-to-cart');     // the message

  button.addEventListener('click', () => {
    // Show the "Added to cart" message
    message.style.opacity = '1';

    // Optional: hide it again after 2 seconds
    setTimeout(() => {
      message.style.opacity = '0';
    }, 500);
  });
});


updateCartQuantity();  