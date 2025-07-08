  // ✅ Clear cart
  localStorage.removeItem("cart");

  // ✅ Reset cart count when page loads
  window.addEventListener("load", function () {
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
      cartCountEl.textContent = "0";
      console.log("🛒 Cart cleared and count set to 0");
    }
  });