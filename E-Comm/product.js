document.addEventListener('DOMContentLoaded', function () {
  const addToCartBtn = document.querySelector('.add-btn');

  addToCartBtn.addEventListener('click', function () {
    const quantityInput = document.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }

    const product = {
      id: 'goat-currycut',
      name: 'Goat Currycut',
      price: 212.25,
      image: 'Goat Currycut.png',
      quantity: quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
  });
});