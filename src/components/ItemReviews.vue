<script setup>
import { useRoute } from 'vue-router'
import { useStore } from '../composables/useStore'
import { ref, onMounted } from 'vue'

const route = useRoute()
const { currentUser } = useStore()

const productId = Number(route.params.id)

const reviews = ref([])
const newText = ref('')
const newRating = ref(5)
const error = ref('')
const success = ref('')

// Загрузка отзывов
function loadReviews() {
  const saved = localStorage.getItem('llshop_reviews')
  const all = saved ? JSON.parse(saved) : []
  reviews.value = all.filter(r => r.productId === productId)
}

// Сохранение отзыва
function saveReview(review) {
  const saved = localStorage.getItem('llshop_reviews')
  const all = saved ? JSON.parse(saved) : []
  all.push(review)
  localStorage.setItem('llshop_reviews', JSON.stringify(all))
}

// Добавление отзыва
function addReview() {
  error.value = ''
  success.value = ''
  
  if (!currentUser.value) {
    error.value = 'Войдите в аккаунт'
    return
  }
  
  if (!newText.value.trim()) {
    error.value = 'Введите текст'
    return
  }
  
  const review = {
    id: Date.now(),
    productId: productId,
    userName: currentUser.value.login,
    rating: newRating.value,
    text: newText.value,
    date: new Date().toLocaleDateString()
  }
  
  saveReview(review)
  reviews.value.push(review)
  success.value = 'Отзыв добавлен!'
  newText.value = ''
  
  setTimeout(() => {
    success.value = ''
  }, 2000)
}

// Начальные отзывы
function initReviews() {
  const saved = localStorage.getItem('llshop_reviews')
  if (!saved) {
    const defaultReviews = [
      { id: 1, productId: 1, userName: 'Алексей', rating: 5, text: 'Отлично! Всё быстро.', date: '10.03.2024' },
      { id: 2, productId: 1, userName: 'Мария', rating: 4, text: 'Хорошие цены.', date: '12.03.2024' },
      { id: 3, productId: 2, userName: 'Дмитрий', rating: 5, text: 'Рекомендую!', date: '05.03.2024' },
      { id: 4, productId: 3, userName: 'Елена', rating: 5, text: 'Мгновенная доставка', date: '01.03.2024' }
    ]
    localStorage.setItem('llshop_reviews', JSON.stringify(defaultReviews))
  }
}

onMounted(() => {
  initReviews()
  loadReviews()
})
</script>

<template>
  <div>
    <div class="add-review">
      <h4>Оставить отзыв</h4>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
      
      <div class="rating">
        <span>Оценка:</span>
        <span 
          v-for="star in 5" 
          :key="star"
          @click="newRating = star"
          :class="['star', { active: star <= newRating }]"
        >★</span>
      </div>
      
      <textarea v-model="newText" placeholder="Ваш отзыв..." rows="3"></textarea>
      <button @click="addReview">Отправить</button>
    </div>
    
    <div class="reviews-list">
      <h4>Отзывы ({{ reviews.length }})</h4>
      
      <div v-if="reviews.length === 0" class="empty">
        <p>Пока нет отзывов. Будьте первым!</p>
      </div>
      
      <div v-for="review in reviews" :key="review.id" class="review">
        <div class="review-header">
          <strong>{{ review.userName }}</strong>
          <div class="stars">
            <span v-for="s in 5" :key="s" :class="['star-small', { active: s <= review.rating }]">★</span>
          </div>
          <span class="date">{{ review.date }}</span>
        </div>
        <p>{{ review.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-review {
  background: #1a1a1a;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.add-review h4 {
  margin-bottom: 12px;
  color: #a855f7;
}

.error {
  color: #ff6b6b;
  margin-bottom: 10px;
  font-size: 13px;
}

.success {
  color: #4caf50;
  margin-bottom: 10px;
  font-size: 13px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.star {
  font-size: 24px;
  color: #555;
  cursor: pointer;
}

.star.active {
  color: #ffc107;
}

.add-review textarea {
  width: 100%;
  padding: 10px;
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 8px;
  color: white;
  margin-bottom: 12px;
  resize: vertical;
}

.add-review button {
  padding: 8px 20px;
  background: #a855f7;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}

.reviews-list h4 {
  margin-bottom: 15px;
  color: white;
}

.review {
  background: #1a1a1a;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.review-header strong {
  color: #a855f7;
}

.stars {
  display: flex;
  gap: 3px;
}

.star-small {
  font-size: 12px;
  color: #555;
}

.star-small.active {
  color: #ffc107;
}

.date {
  color: #888;
  font-size: 12px;
}

.review p {
  color: #ccc;
  font-size: 14px;
}

.empty {
  text-align: center;
  padding: 30px;
  color: #888;
  background: #1a1a1a;
  border-radius: 10px;
}
</style>