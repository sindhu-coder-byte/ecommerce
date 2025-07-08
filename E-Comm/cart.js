let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-items");
  const cartHeader = document.getElementById("cart-header");
  const totalQtyEl = document.getElementById("total-qty");
  const subTotalEl = document.getElementById("sub-total");
  const grandTotalEl = document.getElementById("grand-total");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p style='text-align:center;'>🛒 Your cart is empty.</p>";
    cartHeader.textContent = "My Cart (0 Items)";
    totalQtyEl.textContent = 0;
    subTotalEl.textContent = "0.00";
    grandTotalEl.textContent = "0.00";
    updateCartCount();
    return;
  }

  let totalItems = 0;
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalItems += item.quantity;
    subtotal += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img"
        onerror="this.src='images/placeholder.jpg'" />

      <div class="item-info">
        <h4>${item.name}</h4>
        <p>Qty: 
          <button onclick="decreaseQty(${index})">➖</button> 
          ${item.quantity} 
          <button onclick="increaseQty(${index})">➕</button>
        </p>
        <p>Price: ₹${itemTotal.toFixed(2)}</p>
        <button onclick="removeItem(${index})" style="color:red;">🗑 Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  cartHeader.textContent = `My Cart (${totalItems} Item${totalItems !== 1 ? 's' : ''})`;
  totalQtyEl.textContent = totalItems;
  subTotalEl.textContent = subtotal.toFixed(2);
  grandTotalEl.textContent = (subtotal + 10).toFixed(2); // ₹10 handling fee

  updateCartCount();
}

function increaseQty(index) {
  cart[index].quantity++;
  saveCart();
  updateCartDisplay();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartDisplay();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

// Run on page load
updateCartDisplay();
