// ✅ Get Cart from LocalStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ✅ Save Cart to LocalStorage
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Add to Cart function
function addToCart(name, price, image, quantity = 1) { // 🔄 use "image" not "img"
  const cart = getCart();
  const index = cart.findIndex(item => item.name === name);

  if (index >= 0) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ name, price, image, quantity }); // ✅ image key consistent
  }

  setCart(cart);
  updateCartCount();
  alert(`${name} added to cart`);
}

// ✅ Update Cart Count in Navbar
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

// ✅ Run on Page Load
document.addEventListener("DOMContentLoaded", updateCartCount);
