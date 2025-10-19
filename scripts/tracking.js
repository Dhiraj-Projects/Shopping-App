import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { deliveryOptions, getdeliveryOption } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();

// get productId from URL
const productId = new URLSearchParams(window.location.search).get('productId');

// find that specific cart item
const cartItem = cart.find(item => item.productId === productId);

// define variables outside the loop
let product;
let dateString;

// calculate delivery date and get product info
if (cartItem) {
  product = getProduct(cartItem.productId);
  const deliveryOption = getdeliveryOption(cartItem.deliveryOptionsId);
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  dateString = deliveryDate.format('dddd, MMMM D');
} else {
  // fallback if product not found
  document.querySelector('.main').innerHTML = `
    <p>Order not found.</p>
    <a href="orders.html" class="link-primary">Go back to orders</a>
  `;
}

// render tracking info
function renderTrackingInfo() {
  if (!cartItem || !product) return;

  const html = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${dateString}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${cartItem.quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;

  document.querySelector('.main').innerHTML = html;
}

renderTrackingInfo();
