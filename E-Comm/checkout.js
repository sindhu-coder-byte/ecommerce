function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCheckout() {
  const cart = getCart();
  const container = document.getElementById("checkout-items");
  const totalBox = document.getElementById("total-checkout");

  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.textContent = "Total: ₹0.00";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="product-card-details">
        <h4>${item.name}</h4>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ₹${item.price}</p>
      </div>
    `;
    container.appendChild(card);
  });

  const handlingFee = 20; // Fixed optional fee
  const grandTotal = total + handlingFee;

  totalBox.textContent = `Total: ₹${grandTotal.toFixed(2)} (incl. ₹${handlingFee} handling)`;
}

function confirmOrder() {
  alert("✅ Your order has been placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "order-success.html";
}

window.onload = renderCheckout;