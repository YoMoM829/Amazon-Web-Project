export const cart = [];

export function addToCart(productId, productQuantity) {
    let done = false;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].productId === productId) {
                    cart[i].quantity += productQuantity
                    done = true
                }
            }

            if (done === false) {
                cart.push({
                    productId: productId,
                    quantity: productQuantity
                })
            }
}