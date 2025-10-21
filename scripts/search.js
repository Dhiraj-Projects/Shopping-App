import { getProduct, products } from "../data/products.js";

export function getquery() {
    let text = document.querySelector(".search-bar").value.trim().toLowerCase();
    if (!text) return;

    let searchedProductIds = [];
    products.forEach((item) => {
        (item.keywords).forEach(keyword => {
            if (keyword.toLowerCase().includes(text))
                if (!searchedProductIds.includes(item.id)) {
                    searchedProductIds.push(item.id);
                }
        });
    });

    let searchedProducts = searchedProductIds.map(id => getProduct(id));

    let productsHTML = '';

searchedProducts.forEach((product) => {
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
  document.querySelector('.products-grid')
  .innerHTML = productsHTML;
});
}