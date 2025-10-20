import { cart, deleteFromCart, updatedeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getdeliveryOption } from '../../data/deliveryOptions.js';
import { renderpaymentSummary, } from './paymentSummary.js';

export function renderCartSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    let selecteddeliveryOptions = getdeliveryOption(cartItem.deliveryOptionsId);

    cartItem.deliveryOptionsId = selecteddeliveryOptions.id;

    const today = dayjs();
    const deliveryDate = today.add(selecteddeliveryOptions.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}  
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
                  &#8377; ${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

      const dateString = deliveryDate.format('dddd, MMMM D');

      let priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : String((deliveryOption.priceCents / 100).toFixed(2));

      const ischecked = deliveryOption.id === cartItem.deliveryOptionsId;

      deliveryHTML += `
          <div class="delivery-option js-delivery-option" 
          data-product-id="${matchingProduct.id}"data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${ischecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                 &#8377; ${priceString}  Shipping
              </div>
            </div>
          </div>
        `
    });
    return deliveryHTML;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        deleteFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        renderpaymentSummary();
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const productId = option.dataset.productId;
        const deliveryOptionId = option.dataset.deliveryOptionId;
        updatedeliveryOption(productId, deliveryOptionId)
        renderCartSummary();
        renderpaymentSummary();
      });
    });

}
renderCartSummary();