<script setup>
import { useStore } from '../composables/useStore'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

const { currentUser, logout, updateUserProfile } = useStore()
const router = useRouter()

const editMode = ref(false)
const form = reactive({
  email: currentUser.value?.email || '',
  phone: currentUser.value?.phone || '',
  city: currentUser.value?.city || ''
})

const errors = ref({
  email: ''
})

function handleLogout() {
  logout()
  router.push('/')
}

function saveProfile() {
  errors.value = { email: '' }
  
  if (form.email && !form.email.includes('@')) {
    errors.value.email = 'Email должен содержать @'
    return
  }
  
  updateUserProfile(form)
  editMode.value = false
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">👤</div>
          <h2>Личный кабинет</h2>
        </div>
        
        <div v-if="currentUser" class="profile-content">
          <div class="info-row">
            <span class="label">Логин:</span>
            <span class="value">{{ currentUser.login }}</span>
          </div>
          
          <template v-if="!editMode">
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">{{ currentUser.email || 'Не указан' }}</span>
            </div>
            
            <div class="info-row">
              <span class="label">Телефон:</span>
              <span class="value">{{ currentUser.phone || 'Не указан' }}</span>
            </div>
            
            <div class="info-row">
              <span class="label">Город:</span>
              <span class="value">{{ currentUser.city || 'Не указан' }}</span>
            </div>
          </template>
          
          <template v-else>
            <div class="edit-form">
              <div class="input-group">
                <label>Email:</label>
                <input v-model="form.email" type="email" placeholder="Введите email" />
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
              </div>
              
              <div class="input-group">
                <label>Телефон:</label>
                <input v-model="form.phone" placeholder="Введите телефон" />
              </div>
              
              <div class="input-group">
                <label>Город:</label>
                <input v-model="form.city" placeholder="Введите город" />
              </div>
            </div>
          </template>
          
          <div class="profile-actions">
            <button v-if="!editMode" @click="editMode = true" class="btn-edit">
              Редактировать профиль
            </button>
            <template v-else>
              <button @click="saveProfile" class="btn-save">Сохранить</button>
              <button @click="editMode = false" class="btn-cancel">Отмена</button>
            </template>
            <button @click="handleLogout" class="btn-logout">Выйти из аккаунта</button>
          </div>
        </div>
        
        <div v-else class="not-logged">
          <p>Вы не авторизованы</p>
          <RouterLink :to="{ name: 'Login' }" class="login-link">Войти</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #0a0a0a;
}

.profile-container {
  width: 100%;
  max-width: 550px;
}

.profile-card {
  background: #1a1a1a;
  border-radius: 30px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.profile-header {
  text-align: center;
  margin-bottom: 32px;
}

.profile-avatar {
  font-size: 64px;
  margin-bottom: 16px;
}

.profile-header h2 {
  font-size: 28px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.label {
  color: #888;
  font-weight: 500;
}

.value {
  color: white;
  font-weight: 500;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
}

.input-group input {
  padding: 12px 16px;
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 12px;
  color: white;
  font-size: 14px;
}

.input-group input:focus {
  outline: none;
  border-color: #a855f7;
}

.error {
  color: #ff6b6b;
  font-size: 12px;
}

.profile-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.btn-edit, .btn-save, .btn-cancel, .btn-logout {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  flex: 1;
}

.btn-edit {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: white;
}

.btn-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.btn-save {
  background: #10b981;
  color: white;
}

.btn-save:hover {
  background: #059669;
}

.btn-cancel {
  background: #374151;
  color: white;
}

.btn-cancel:hover {
  background: #4b5563;
}

.btn-logout {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
}

.btn-logout:hover {
  background: rgba(255, 107, 107, 0.2);
}

.not-logged {
  text-align: center;
  padding: 20px;
}

.not-logged p {
  color: #888;
  margin-bottom: 20px;
}

.login-link {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 768px) {
  .profile-card {
    padding: 30px 20px;
  }
  
  .profile-actions {
    flex-direction: column;
  }
}
</style>