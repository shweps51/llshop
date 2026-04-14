<script setup>
import { useStore } from '../composables/useStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { favorites, removeFromFavorites, addToCart, currentUser } = useStore()
const router = useRouter()
const showModal = ref(false)
const modalText = ref('')

function handleAddToCart(item) {
  const result = addToCart(item)
  modalText.value = result.message
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 2000)
}

function handleRemoveFromFavorites(itemId) {
  removeFromFavorites(itemId)
  modalText.value = 'Товар удалён из избранного'
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 2000)
}
</script>

<template>
  <div class="favorites-page">
    <div class="favorites-container">
      <div class="favorites-header">
        <h1>Избранное</h1>
        <p v-if="favorites.length > 0">{{ favorites.length }} товара(ов) в избранном</p>
      </div>
      
      <div v-if="!currentUser" class="empty-favorites">
        <div class="empty-icon">❤️</div>
        <h3>Войдите в аккаунт</h3>
        <p>Чтобы добавлять товары в избранное, войдите в свой аккаунт</p>
        <RouterLink :to="{ name: 'Login' }" class="login-btn">Войти</RouterLink>
      </div>
      
      <div v-else-if="favorites.length === 0" class="empty-favorites">
        <div class="empty-icon">💔</div>
        <h3>Избранное пусто</h3>
        <p>Добавляйте товары в избранное, чтобы не потерять их</p>
        <RouterLink :to="{ name: 'Catalog' }" class="continue-btn">Перейти в каталог</RouterLink>
      </div>
      
      <div v-else class="favorites-grid">
        <div v-for="item in favorites" :key="item.id" class="favorite-card">
          <div class="card-image" @click="router.push({ name: 'Item', params: { id: item.id } })">
            <img :src="item.img" :alt="item.name" />
            <div class="image-overlay">
              <span>Подробнее →</span>
            </div>
          </div>
          <div class="card-body">
            <h3 @click="router.push({ name: 'Item', params: { id: item.id } })">{{ item.name }}</h3>
            <div class="price">{{ item.price }} ₽</div>
            <div class="card-actions">
              <button @click="handleAddToCart(item)" class="cart-btn">В корзину</button>
              <button @click="handleRemoveFromFavorites(item.id)" class="remove-btn">❤️ Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showModal" class="toast">
      <div class="toast-content">
        <span>{{ modalText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-page {
  min-height: 80vh;
  padding: 40px 0;
  background: #0a0a0a;
  width: 100%;
}

.favorites-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .favorites-container {
    padding: 0 30px;
  }
}

@media (max-width: 480px) {
  .favorites-container {
    padding: 0 20px;
  }
}

.favorites-header {
  text-align: center;
  margin-bottom: 40px;
}

.favorites-header h1 {
  font-size: 56px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
  letter-spacing: normal;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .favorites-header h1 {
    font-size: 42px;
  }
}

@media (max-width: 480px) {
  .favorites-header h1 {
    font-size: 32px;
  }
}

.favorites-header p {
  color: #888;
  font-size: 16px;
}

@media (max-width: 480px) {
  .favorites-header p {
    font-size: 14px;
  }
}

.empty-favorites {
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

.empty-favorites h3 {
  font-size: 28px;
  color: white;
  margin-bottom: 12px;
}

@media (max-width: 480px) {
  .empty-favorites h3 {
    font-size: 22px;
  }
}

.empty-favorites p {
  color: #888;
  margin-bottom: 30px;
  font-size: 16px;
}

@media (max-width: 480px) {
  .empty-favorites p {
    font-size: 14px;
  }
}

.login-btn, .continue-btn {
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border-radius: 40px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

@media (max-width: 480px) {
  .login-btn, .continue-btn {
    padding: 12px 24px;
    font-size: 14px;
  }
}

.login-btn:hover, .continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 25px;
  }
}

@media (max-width: 480px) {
  .favorites-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.favorite-card {
  background: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.favorite-card:hover {
  transform: translateY(-5px);
  border-color: rgba(168, 85, 247, 0.3);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.favorite-card:hover .card-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-image:hover .image-overlay {
  opacity: 1;
}

.image-overlay span {
  background: #a855f7;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  color: white;
}

.card-body {
  padding: 20px;
}

.card-body h3 {
  font-size: 18px;
  color: white;
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.3s;
}

.card-body h3:hover {
  color: #a855f7;
}

.price {
  font-size: 22px;
  font-weight: 700;
  color: #a855f7;
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .price {
    font-size: 20px;
  }
}

.card-actions {
  display: flex;
  gap: 12px;
}

@media (max-width: 480px) {
  .card-actions {
    flex-direction: column;
  }
}

.cart-btn {
  flex: 1;
  padding: 10px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.cart-btn:hover {
  transform: scale(1.02);
}

.remove-btn {
  flex: 1;
  padding: 10px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  border-radius: 10px;
  color: #ff6b6b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: #ff6b6b;
  color: white;
}

.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
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
</style>