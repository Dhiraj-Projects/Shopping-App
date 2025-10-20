import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { deliveryOptions , getdeliveryOption } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderOrdersHtml() {
    let OrderHTML = ``;

    // 1️⃣ Calculate totals
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getdeliveryOption(cartItem.deliveryOptionsId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.10;
    const totalCents = totalBeforeTax + taxCents;

    // 2️⃣ Create the order header once
    const today = dayjs();
    const firstItemDeliveryOption = getdeliveryOption(cart[0].deliveryOptionsId);
    const deliveryDate = today.add(firstItemDeliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const todaydateString = today.format('MMMM D, YYYY');

    OrderHTML += `
    <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${todaydateString}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div> &#8377; ${(totalCents / 100).toFixed(2)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
        </div>
    </div>`;

    // 3️⃣ Loop through products for the order
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        const deliveryOption = getdeliveryOption(cartItem.deliveryOptionsId);
        const productDeliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const productDateString = productDeliveryDate.format('dddd, MMMM D');

        OrderHTML += `
        <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">${product.name}</div>
              <div class="product-delivery-date">Arriving on: ${productDateString}</div>
              <div class="product-quantity">Quantity: ${cartItem.quantity}
              </div>
              
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${product.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        </div>`;
    });

    document.querySelector('.orders-grid').innerHTML = OrderHTML;
}

function updateCartQuantity() {
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerText = cartQuantity;
    }

updateCartQuantity();
renderOrdersHtml();

