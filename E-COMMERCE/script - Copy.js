let cart = [];
let totalPrice = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    alert(`${item} added to your cart!`);
}

function viewCart() {
    let cartSection = document.getElementById("cart-section");
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((cartItem, index) => {
            cartItems.innerHTML += `<p>${cartItem.item} - $${cartItem.price}</p>`;
        });
        document.getElementById("total-price").innerText = `Total: $${totalPrice}`;
    }

    cartSection.style.display = "block";
}

function proceedToCheckout() {
    let checkoutSection = document.getElementById("checkout-section");
    checkoutSection.style.display = "block";
}
