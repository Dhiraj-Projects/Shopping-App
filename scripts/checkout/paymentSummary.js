import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { deliveryOptions, getdeliveryOption } from '../../data/deliveryOptions.js';

export function renderpaymentSummary() {

    let productPriceCents = 0;
    let shippingpriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getdeliveryOption(cartItem.deliveryOptionsId);
        shippingpriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPriceCents + shippingpriceCents;
    const taxCents = totalBeforeTax * 0.10;
    const totalCents = totalBeforeTax + taxCents;

    const paymentSummaryHTML = `
    <div class="payment-summary">
          <div class="payment-summary-title">
            Payment Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money"> &#8377; ${Math.round(productPriceCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money"> &#8377; ${Math.round(shippingpriceCents /100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money"> &#8377; ${Math.round(totalBeforeTax /100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money"> &#8377; ${Math.round(taxCents /100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money"> &#8377; ${Math.round(totalCents /100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>`;

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;
    
  
    document.querySelector('.js-place-order-button')
        .addEventListener('click', () => {
            window.location.href = 'orders.html';
        });        
}

renderpaymentSummary();