<script setup>
import { useStore } from '../composables/useStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { cart, removeFromCart, updateQuantity, getCartTotal, currentUser, clearCart } = useStore()
const router = useRouter()

const showModal = ref(false)
const modalText = ref('')
const showLimitModal = ref(false)
const limitModalText = ref('')

// Поле для ввода логина
const gameLogin = ref('')

function updateQty(item, newQty) {
  const result = updateQuantity(item.id, newQty)
  if (result && result.success === false) {
    limitModalText.value = result.message
    showLimitModal.value = true
    setTimeout(() => {
      showLimitModal.value = false
    }, 2000)
  }
}

function checkout() {
  if (!currentUser.value) {
    modalText.value = 'Для оформления заказа необходимо войти в аккаунт'
    showModal.value = true
    setTimeout(() => {
      showModal.value = false
    }, 2000)
    return
  }
  
  // Проверка заполнения логина
  if (!gameLogin.value.trim()) {
    modalText.value = 'Введите логин игрового аккаунта'
    showModal.value = true
    setTimeout(() => {
      showModal.value = false
    }, 2000)
    return
  }
  
  modalText.value = `Заказ оформлен! Валюта отправлена на ${gameLogin.value}`
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
    clearCart()
    gameLogin.value = ''
    router.push('/')
  }, 2500)
}
</script>

<template>
  <div class="cart-page">
    <div class="cart-container">
      <div class="cart-header">
        <h1>Корзина</h1>
        <p v-if="cart.length > 0">{{ cart.length }} товара(ов)</p>
      </div>
      
      <div v-if="cart.length === 0" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Корзина пуста</h3>
        <p>Добавьте товары в корзину, чтобы продолжить покупки</p>
        <RouterLink :to="{ name: 'Catalog' }" class="continue-btn">Перейти в каталог</RouterLink>
      </div>
      
      <div v-else>
        <div class="cart-items">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.img" :alt="item.name" />
            </div>
            
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <div class="item-price">{{ item.price }} ₽</div>
            </div>
            
            <div class="item-quantity">
              <button @click="updateQty(item, (item.quantity || 1) - 1)" class="qty-btn">-</button>
              <span class="qty-value">{{ item.quantity || 1 }}</span>
              <button @click="updateQty(item, (item.quantity || 1) + 1)" class="qty-btn">+</button>
            </div>
            
            <div class="item-total">
              {{ (item.price * (item.quantity || 1)) }} ₽
            </div>
            
            <button @click="removeFromCart(item.id)" class="remove-btn">🗑️</button>
          </div>
        </div>
        
        <!-- Компактное поле для ввода логина -->
        <div class="delivery-row">
          <div class="delivery-label">Логин аккаунта:</div>
          <input 
            v-model="gameLogin" 
            type="text" 
            placeholder="Введите логин игрового аккаунта"
            class="delivery-input"
          />
        </div>
        
        <div class="cart-summary">
          <div class="summary-card">
            <div class="summary-row">
              <span>Товары ({{ cart.length }})</span>
              <span>{{ getCartTotal() }} ₽</span>
            </div>
            <div class="summary-row total">
              <span>К оплате</span>
              <span>{{ getCartTotal() }} ₽</span>
            </div>
            <button @click="checkout" class="checkout-btn">Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showModal" class="toast">
      <div class="toast-content">
        <span>{{ modalText }}</span>
      </div>
    </div>
    
    <div v-if="showLimitModal" class="toast error">
      <div class="toast-content">
        <span>{{ limitModalText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 80vh;
  padding: 40px 0;
  background: #0a0a0a;
  width: 100%;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 70px;
}

@media (max-width: 768px) {
  .cart-container {
    padding: 0 30px;
  }
}

@media (max-width: 480px) {
  .cart-container {
    padding: 0 20px;
  }
}

.cart-header h1 {
  font-size: 56px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
  line-height: 1.2;
  padding: 0 10px;
  overflow: visible;
}

@media (max-width: 768px) {
  .cart-header h1 {
    font-size: 42px;
    line-height: 1.3;
  }
}

@media (max-width: 480px) {
  .cart-header h1 {
    font-size: 32px;
    line-height: 1.4;
  }
}
.cart-header p {
  color: #888;
  font-size: 16px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  background: #1a1a1a;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-cart h3 {
  font-size: 28px;
  color: white;
  margin-bottom: 12px;
}

.empty-cart p {
  color: #888;
  margin-bottom: 30px;
}

.continue-btn {
  display: inline-block;
  padding: 12px 28px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border-radius: 40px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex-wrap: wrap;
}

.cart-item:hover {
  border-color: rgba(168, 85, 247, 0.3);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 2;
  min-width: 120px;
}

.item-info h3 {
  font-size: 18px;
  color: white;
  margin-bottom: 6px;
}

.item-price {
  color: #a855f7;
  font-weight: 600;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.qty-btn:hover {
  border-color: #a855f7;
  color: #a855f7;
}

.qty-value {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  color: white;
}

.item-total {
  min-width: 80px;
  font-weight: 700;
  color: #a855f7;
  font-size: 18px;
}

.remove-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  border-radius: 10px;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: #ff6b6b;
  color: white;
}

/* Компактный блок с логином */
.delivery-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  margin: 20px 0;
  padding: 12px 20px;
  background: #1a1a1a;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.delivery-label {
  color: #a855f7;
  font-weight: 500;
  font-size: 14px;
}

.delivery-input {
  padding: 8px 16px;
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  width: 280px;
}

.delivery-input:focus {
  outline: none;
  border-color: #a855f7;
}

.delivery-input::placeholder {
  color: #666;
  font-size: 12px;
}

@media (max-width: 768px) {
  .delivery-row {
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 16px;
  }
  
  .delivery-input {
    width: 100%;
  }
}

.cart-summary {
  margin-top: 20px;
}

.summary-card {
  background: #1a1a1a;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  color: #ccc;
  font-size: 16px;
}

.summary-row.total {
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.summary-row.total span:last-child {
  color: #a855f7;
}

.checkout-btn {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border: none;
  border-radius: 40px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.toast.error .toast-content {
  background: #ff6b6b;
}

.toast-content {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  padding: 12px 24px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
  }
  
  .item-info {
    text-align: center;
  }
  
  .cart-summary {
    text-align: center;
  }
}
</style>