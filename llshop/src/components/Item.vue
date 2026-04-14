<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'
import { computed, ref } from 'vue'
import ItemReviews from './ItemReviews.vue'

const route = useRoute()
const router = useRouter()
const { findItem, addToCart, addToFavorites } = useStore()

const item = computed(() => findItem(Number(route.params.id)))
const showModal = ref(false)
const modalText = ref('')
const activeTab = ref('desc')

function handleAddToCart() {
  const result = addToCart(item.value)
  modalText.value = result.message
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 2000)
}

function handleAddToFavorites() {
  const result = addToFavorites(item.value)
  modalText.value = result.message
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 2000)
}
</script>

<template>
  <div v-if="item" class="item-page">
    <div class="container">
      <div class="item-content">
        <div class="item-image">
          <img :src="item.img" :alt="item.name" />
        </div>
        
        <div class="item-details">
          <h1>{{ item.name }}</h1>
          <div class="price">{{ item.price }} ₽</div>
          
          <div class="action-buttons">
            <button @click="handleAddToCart" class="cart-btn">Добавить в корзину</button>
            <button @click="handleAddToFavorites" class="fav-btn">❤ В избранное</button>
          </div>
          
          <div class="tabs">
            <button @click="activeTab = 'desc'" :class="['tab', { active: activeTab === 'desc' }]">Описание</button>
            <button @click="activeTab = 'info'" :class="['tab', { active: activeTab === 'info' }]">Характеристики</button>
            <button @click="activeTab = 'reviews'" :class="['tab', { active: activeTab === 'reviews' }]">Отзывы</button>
          </div>
          
          <div class="tab-content">
            <div v-if="activeTab === 'desc'" class="item-desc">
              <h3>Описание товара</h3>
              <p>{{ item.desc }}</p>
            </div>
            
            <div v-if="activeTab === 'info'" class="item-info">
              <h3>Характеристики</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="label">Цена:</span>
                  <span class="value">{{ item.price }} ₽</span>
                </div>
                <div class="info-item">
                  <span class="label">Категория:</span>
                  <span class="value">{{ item.category || 'Не указана' }}</span>
                </div>
              </div>
            </div>
            
            <div v-if="activeTab === 'reviews'" class="item-reviews">
              <ItemReviews />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <div class="container">
      <h2>Товар не найден</h2>
      <RouterLink :to="{ name: 'Catalog' }" class="back-link">Вернуться в каталог</RouterLink>
    </div>
  </div>
  
  <div v-if="showModal" class="toast">
    <div class="toast-content">
      <p>{{ modalText }}</p>
    </div>
  </div>
</template>

<style scoped>
.item-page {
  min-height: 100vh;
  padding: 40px 0;
  background: #0f0f0f;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

.item-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  background: #1a1a1a;
  border-radius: 24px;
  overflow: hidden;
}

.item-image {
  background: #0f0f0f;
  padding: 40px;
  text-align: center;
}

.item-image img {
  max-width: 100%;
  border-radius: 16px;
}

.item-details {
  padding: 40px 40px 40px 0;
}

.item-details h1 {
  font-size: 32px;
  color: white;
  margin-bottom: 15px;
}

.price {
  font-size: 32px;
  font-weight: bold;
  color: #a855f7;
  margin-bottom: 25px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.cart-btn {
  padding: 12px 28px;
  background: #a855f7;
  border: none;
  border-radius: 40px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.fav-btn {
  padding: 12px 28px;
  background: #1a1a1a;
  border: 2px solid #ff6b6b;
  border-radius: 40px;
  color: #ff6b6b;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #333;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
}

.tab.active {
  color: #a855f7;
  border-bottom: 2px solid #a855f7;
}

.item-desc h3, .item-info h3 {
  color: white;
  margin-bottom: 15px;
}

.item-desc p {
  color: #ccc;
  line-height: 1.6;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}

.info-item .label {
  color: #aaa;
}

.info-item .value {
  color: white;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.toast-content {
  background: #a855f7;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
}

.not-found {
  text-align: center;
  padding: 100px 0;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #a855f7;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .item-content {
    grid-template-columns: 1fr;
  }
  
  .item-details {
    padding: 20px;
  }
  
  .tabs {
    flex-wrap: wrap;
  }
}
</style>