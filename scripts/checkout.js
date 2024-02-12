import { cart, removeFromCart, calculateCartQuantity , updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })


    cartSummaryHTML += 
    `
    <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label js-quantity-label-${productId}"
                >${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"
                data-product-id=${matchingProduct.id}>
            Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link"
                data-product-id=${matchingProduct.id}>Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id=${matchingProduct.id}>
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    `
});

document.querySelector('.js-order-summary').innerHTML =
    cartSummaryHTML;

document.querySelectorAll('.js-update-quantity-link')
    .forEach((update) => {
        update.addEventListener('click', () => {
            const productId = update.dataset.productId;

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );

            container.classList.add('is-editing-quantity');
        })
    } 
);

document.querySelectorAll('.js-save-quantity-link')
    .forEach((update) => {
        update.addEventListener('click', () => {
            const productId = update.dataset.productId;

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`);

            const inputElement = document.querySelector(
                `.js-quantity-input-${productId}`);

            const newCartQuantity = Number(inputElement.value);

            if (!isNaN(newCartQuantity)) {
                if (newCartQuantity > 0 && newCartQuantity < 1000) {
                    updateQuantity(productId, newCartQuantity);
                    updateCartQuantity();
                    container.classList.remove('is-editing-quantity');

                    document.querySelector(
                        `.js-quantity-label-${productId}`
                    ).innerHTML = newCartQuantity;
                }
            }
        })
    } 
);

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.querySelectorAll('.js-save-quantity-link')
            .forEach((update) => {
                const productId = update.dataset.productId;

                const container = document.querySelector(
                    `.js-cart-item-container-${productId}`);

                const inputElement = document.querySelector(
                    `.js-quantity-input-${productId}`);

                const newCartQuantity = Number(inputElement.value);

                if (!isNaN(newCartQuantity)) {
                    if (newCartQuantity > 0 && newCartQuantity < 1000) {
                        updateQuantity(productId, newCartQuantity);
                        updateCartQuantity();
                        container.classList.remove('is-editing-quantity');

                        document.querySelector(
                            `.js-quantity-label-${productId}`
                        ).innerHTML = newCartQuantity;
                    }
                }
            }
            )   
        } 
    }
)

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.remove();
            updateCartQuantity();
        })
    }
);

updateCartQuantity();

function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    document.querySelector('.js-return-to-home-link').innerHTML =
        `${cartQuantity} items`; 
}