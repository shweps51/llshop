<script setup>
import { useStore } from '../composables/useStore'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const { catalog, addToCart, addToFavorites, currentUser } = useStore()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const showModal = ref(false)
const modalText = ref('')

// Пагинация
const currentPage = ref(1)
const itemsPerPage = 6

const categories = [
  { value: 'fortnite', label: 'Fortnite', icon: '🎮' },
  { value: 'steam', label: 'Steam', icon: '🎮' },
  { value: 'valorant', label: 'Valorant', icon: '🎯' },
  { value: 'genshin', label: 'Genshin Impact', icon: '⚔️' },
  { value: 'roblox', label: 'Roblox', icon: '🧸' }
]

const filteredCatalog = computed(() => {
  let filtered = catalog.value.slice()
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedCategory.value) {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }
  
  if (minPrice.value && !isNaN(minPrice.value) && minPrice.value !== '') {
    filtered = filtered.filter(item => item.price >= Number(minPrice.value))
  }
  
  if (maxPrice.value && !isNaN(maxPrice.value) && maxPrice.value !== '') {
    filtered = filtered.filter(item => item.price <= Number(maxPrice.value))
  }
  
  return filtered
})

// Пагинация: вычисляем общее количество страниц
const totalPages = computed(() => {
  return Math.ceil(filteredCatalog.value.length / itemsPerPage)
})

// Пагинация: получаем товары для текущей страницы
const paginatedCatalog = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCatalog.value.slice(start, end)
})

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  minPrice.value = ''
  maxPrice.value = ''
  currentPage.value = 1
}

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function handleAddToCart(item) {
  const result = addToCart(item)
  modalText.value = result.message
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 2000)
}

function handleAddToFavorites(item) {
  if (!currentUser.value) {
    modalText.value = 'Войдите в аккаунт, чтобы добавить в избранное'
    showModal.value = true
    setTimeout(() => {
      showModal.value = false
    }, 2000)
    return
  }
  const result = addToFavorites(item)
  modalText.value = result.message
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 2000)
}

function goToItem(item) {
  router.push({ name: 'Item', params: { id: item.id } })
}
</script>

<template>
  <div class="catalog">
    <!-- Hero секция -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">LLShop</span>
        </h1>
        <p class="hero-subtitle">Игровая валюта для твоих побед</p>
        <p class="hero-description">V-Bucks, Steam, Valorant, Genshin Impact, Roblox — всё в одном месте</p>
        <button class="hero-btn" @click="$el.querySelector('.products').scrollIntoView({ behavior: 'smooth' })">
          Начать покупки →
        </button>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">5+</div>
            <div class="stat-label">Популярных игр</div>
          </div>
          <div class="stat">
            <div class="stat-value">25+</div>
            <div class="stat-label">Товаров</div>
          </div>
          <div class="stat">
            <div class="stat-value">24/7</div>
            <div class="stat-label">Поддержка</div>
          </div>
        </div>
      </div>
    </section>

    <!-- О магазине -->
    <section class="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <h2>О магазине</h2>
            <p>Магазин игровой валюты <strong>LLShop</strong> — это ваш надёжный партнёр в мире онлайн-игр. Мы предлагаем самые выгодные цены на V-Bucks, Steam Gift Cards, Valorant Points, Genshin Impact кристаллы и Robux.</p>
            <p>Мгновенная доставка, круглосуточная поддержка и гарантия безопасности каждой транзакции — наши главные приоритеты.</p>
          </div>
          <div class="features">
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Мгновенно</h3>
              <p>Получите валюту сразу после оплаты</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Безопасно</h3>
              <p>Защита данных и безопасные платежи</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💎</div>
              <h3>Выгодно</h3>
              <p>Лучшие цены и регулярные скидки</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Каталог товаров -->
    <section class="products">
      <div class="container">
        <h2 class="section-title">Популярные товары</h2>
        
        <!-- Фильтры -->
        <div class="filters">
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Поиск товаров..." 
              class="search-input"
              @input="currentPage = 1"
            />
          </div>
          
          <div class="category-filters">
            <button 
              v-for="cat in categories" 
              :key="cat.value"
              @click="selectedCategory = selectedCategory === cat.value ? '' : cat.value; currentPage = 1"
              :class="['cat-btn', { active: selectedCategory === cat.value }]"
            >
              <span class="cat-icon">{{ cat.icon }}</span>
              <span>{{ cat.label }}</span>
            </button>
          </div>
          
          <div class="price-filters">
            <input type="text" v-model="minPrice" placeholder="от ₽" class="price-input" @input="currentPage = 1"/>
            <span>—</span>
            <input type="text" v-model="maxPrice" placeholder="до ₽" class="price-input" @input="currentPage = 1"/>
            <button @click="clearFilters" class="clear-btn">Сбросить</button>
          </div>
        </div>
        
        <!-- Товары -->
        <div v-if="paginatedCatalog.length === 0" class="no-results">
          <p>Товары не найдены</p>
        </div>
        
        <div class="products-grid">
          <div
            class="product-card"
            v-for="item in paginatedCatalog"
            :key="item.id"
          >
            <div class="product-image" @click="goToItem(item)">
              <img :src="item.img" :alt="item.name" />
              <div class="product-overlay">
                <span>Подробнее →</span>
              </div>
            </div>
            <div class="product-body">
              <h3 @click="goToItem(item)">{{ item.name }}</h3>
              <div class="product-price">{{ item.price }} ₽</div>
              <div class="product-desc">{{ item.desc.substring(0, 70) }}...</div>
              <div class="product-actions">
                <button @click="handleAddToCart(item)" class="btn-cart">В корзину</button>
                <button @click="handleAddToFavorites(item)" class="btn-fav">❤</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Пагинация -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="page-btn"
          >← Назад</button>
          
          <div class="page-numbers">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="changePage(page)"
              :class="['page-num', { active: currentPage === page }]"
            >{{ page }}</button>
          </div>
          
          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="page-btn"
          >Вперед →</button>
        </div>
      </div>
    </section>
    
    <!-- Модальное окно -->
    <transition name="slide">
      <div v-if="showModal" class="toast">
        <div class="toast-content">
          <span>{{ modalText }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.catalog {
  min-height: 100vh;
  width: 100%;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  width: 100%;
  padding: 60px 20px;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1), transparent 50%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  width: 100%;
  padding: 0 20px;
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 48px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 36px;
  }
}

.gradient-text {
  background: linear-gradient(135deg, #fff 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #e5e5e5;
}

@media (max-width: 768px) {
  .hero-subtitle {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .hero-subtitle {
    font-size: 18px;
  }
}

.hero-description {
  font-size: 18px;
  color: #888;
  margin-bottom: 32px;
}

@media (max-width: 480px) {
  .hero-description {
    font-size: 14px;
  }
}

.hero-btn {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border: none;
  padding: 14px 36px;
  border-radius: 40px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.hero-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 60px;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .hero-stats {
    gap: 30px;
  }
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 14px;
  color: #888;
  margin-top: 8px;
}

/* About Section */
.about {
  padding: 80px 20px;
  background: #0a0a0a;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.about-text h2 {
  font-size: 36px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (max-width: 480px) {
  .about-text h2 {
    font-size: 28px;
  }
}

.about-text p {
  color: #aaa;
  line-height: 1.7;
  margin-bottom: 16px;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px 16px;
  text-align: center;
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: rgba(168, 85, 247, 0.3);
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.feature-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: white;
}

.feature-card p {
  font-size: 13px;
  color: #777;
}

/* Products Section */
.products {
  padding: 60px 20px 80px;
  background: #050505;
  width: 100%;
}

.section-title {
  font-size: 36px;
  text-align: center;
  margin-bottom: 50px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (max-width: 480px) {
  .section-title {
    font-size: 28px;
  }
}

/* Filters */
.filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 14px 20px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 40px;
  color: white;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #a855f7;
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.cat-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 40px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s;
}

.cat-btn:hover {
  border-color: #a855f7;
  color: #a855f7;
}

.cat-btn.active {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border-color: transparent;
  color: white;
}

.cat-icon {
  font-size: 16px;
}

.price-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.price-input {
  width: 100px;
  padding: 10px 14px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 30px;
  color: white;
}

.clear-btn {
  padding: 10px 24px;
  background: transparent;
  border: 1px solid #ff6b6b;
  border-radius: 30px;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: #ff6b6b;
  color: white;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.product-card {
  background: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: rgba(168, 85, 247, 0.3);
  box-shadow: 0 10px 30px rgba(168, 85, 247, 0.1);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-overlay {
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

.product-image:hover .product-overlay {
  opacity: 1;
}

.product-overlay span {
  background: #a855f7;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
}

.product-body {
  padding: 20px;
}

.product-body h3 {
  font-size: 18px;
  margin-bottom: 8px;
  cursor: pointer;
  color: white;
}

.product-body h3:hover {
  color: #a855f7;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: #a855f7;
  margin-bottom: 8px;
}

.product-desc {
  font-size: 13px;
  color: #777;
  line-height: 1.5;
  margin-bottom: 16px;
}

.product-actions {
  display: flex;
  gap: 12px;
}

.btn-cart {
  flex: 1;
  padding: 10px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cart:hover {
  transform: scale(1.02);
}

.btn-fav {
  width: 42px;
  padding: 10px;
  background: #2a2a2a;
  border: 1px solid #ff6b6b;
  border-radius: 30px;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-fav:hover {
  background: #ff6b6b;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 10px 20px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  border-color: #a855f7;
  color: #a855f7;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.page-num {
  width: 40px;
  height: 40px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.page-num:hover {
  border-color: #a855f7;
  color: #a855f7;
}

.page-num.active {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border-color: transparent;
  color: white;
}

.no-results {
  text-align: center;
  padding: 60px;
  color: #888;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.toast-content {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  padding: 12px 24px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>