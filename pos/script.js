// 장바구니에 상품 추가하는 함수
function addToCart(productName, productPrice) {
  const cartItems = document.querySelector('.cart-items');

  // 이미 장바구니에 있는 상품인지 체크
  const existingItem = Array.from(cartItems.children).find(item => {
    const itemName = item.querySelector('.item-name').textContent;
    return itemName === productName;
  });

  if (existingItem) {
    // 이미 있는 상품인 경우 수량을 증가시킴
    const quantityElement = existingItem.querySelector('.item-quantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
  } else {
    // 새로운 상품인 경우 아이템 추가
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="item-name">${productName}</span>
      <span class="item-price">${productPrice}</span>
      <span class="item-quantity">1</span>
      <button class="remove-button">Remove</button>
    `;
    cartItems.appendChild(listItem);
  }

  updateTotalPrice(); // 상품 추가 시 총 금액 업데이트
}

// 장바구니의 총 금액 업데이트 함수
function updateTotalPrice() {
  const cartItems = document.querySelectorAll('.cart-items li');
  let total = 0;
  cartItems.forEach(item => {
    const priceText = item.querySelector('.item-price').textContent;
    const price = parseFloat(priceText.replace(/,/g, '').replace('원', ''));
    const quantity = parseInt(item.querySelector('.item-quantity').textContent);
    total += price * quantity;
  });

  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.textContent = `총 금액: ${total.toLocaleString()}원`;

  checkPaymentLimit(total); // 결제 제한 금액 체크
}

// 결제 제한 금액 체크 함수
function checkPaymentLimit(total) {
  const paymentLimit = 50000; // 결제 제한 금액 설정 (예: 50,000원)
  const checkoutButton = document.querySelector('.checkout-button');

  if (total > paymentLimit) {
    checkoutButton.disabled = true;
    checkoutButton.textContent = '결제 불가 (제한 초과)';
    checkoutButton.classList.add('disabled');
  } else {
    checkoutButton.disabled = false;
    checkoutButton.textContent = '결제하기';
    checkoutButton.classList.remove('disabled');
  }
}

// 상품 클릭 시 장바구니에 추가
const products = document.querySelectorAll('.product');
products.forEach(product => {
  product.addEventListener('click', () => {
    const productName = product.querySelector('.product-name').textContent;
    const productPrice = product.querySelector('.product-price').textContent;
    addToCart(productName, productPrice);
  });
});

// 결제 버튼 클릭 시 알림 메시지
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.addEventListener('click', () => {
  const totalPriceElement = document.querySelector('.total-price');
  const totalPrice = totalPriceElement.textContent.split(' ')[2].replace(/,/g, '').replace('원', '');

  if (parseInt(totalPrice) > 50000) {
    alert('결제 불가: 결제 금액이 제한을 초과합니다.');
  } else {
    alert(`결제가 완료되었습니다. 총 결제 금액은 ${totalPrice}원 입니다.`);
  }
});

// 상품 삭제 버튼 클릭 시 해당 상품 삭제
const cartItems = document.querySelector('.cart-items');
cartItems.addEventListener('click', event => {
  if (event.target.classList.contains('remove-button')) {
    event.target.parentElement.remove();
    updateTotalPrice(); // 상품 삭제 시 총 금액 업데이트
  }
});
