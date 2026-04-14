<script setup>
import { useStore } from '../composables/useStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { catalog } = useStore()
const router = useRouter()

// Для подтверждения удаления
const showConfirm = ref(false)
const deleteId = ref(null)
const deleteName = ref('')

function askDelete(id, name) {
  deleteId.value = id
  deleteName.value = name
  showConfirm.value = true
}

function confirmDelete() {
  // Удаляем товар из массива
  const index = catalog.value.findIndex(i => i.id === deleteId.value)
  if (index !== -1) {
    catalog.value.splice(index, 1)
  }
  showConfirm.value = false
}

function cancelDelete() {
  showConfirm.value = false
  deleteId.value = null
  deleteName.value = ''
}
</script>

<template>
  <div class="admin-list">
    <h3 class="list-title">Список товаров</h3>
    
    <div v-for="item in catalog" :key="item.id" class="list-item">
      <div class="item-info">
        <img :src="item.img" class="item-img" />
        <div>
          <strong>{{ item.name }}</strong>
          <span class="item-price">{{ item.price }} ₽</span>
        </div>
      </div>
      <div class="item-actions">
        <button @click="router.push('/admin/edit/' + item.id)" class="edit-btn">Редактировать</button>
        <button @click="askDelete(item.id, item.name)" class="delete-btn">Удалить</button>
      </div>
    </div>
    
    <!-- Простое окно подтверждения -->
    <div v-if="showConfirm" class="modal">
      <div class="modal-content">
        <p>Удалить "{{ deleteName }}" ?</p>
        <div class="modal-buttons">
          <button @click="confirmDelete" class="confirm-btn">Да</button>
          <button @click="cancelDelete" class="cancel-btn">Нет</button>
        </div>
      </div>
      <div class="modal-backdrop" @click="cancelDelete"></div>
    </div>
  </div>
</template>

<style scoped>
.admin-list {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  color: white;
}

.list-title {
  margin-bottom: 20px;
  color: #a855f7;
}

.list-item {
  border-bottom: 1px solid #333;
  padding: 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  display: flex;
  gap: 15px;
  align-items: center;
}

.item-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}

.item-price {
  color: #a855f7;
  margin-left: 10px;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.edit-btn {
  background: #a855f7;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.edit-btn:hover {
  background: #7c3aed;
}

.delete-btn {
  background: #ff6b6b;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.delete-btn:hover {
  background: #ff5252;
}

/* Модальное окно */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  min-width: 280px;
  border: 1px solid #a855f7;
  z-index: 1001;
}

.modal-content p {
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
}

.modal-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.confirm-btn {
  background: #ff6b6b;
  border: none;
  padding: 8px 24px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.confirm-btn:hover {
  background: #ff5252;
}

.cancel-btn {
  background: #a855f7;
  border: none;
  padding: 8px 24px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #7c3aed;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
</style>