<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'

const router = useRouter()
const { register } = useStore()

const form = reactive({
  login: '',
  password: '',
  email: '',
  phone: '',
  city: ''
})

const errors = ref({
  login: '',
  password: '',
  email: '',
  general: ''
})

const isLoading = ref(false)

function regsub() {
  errors.value = { login: '', password: '', email: '', general: '' }
  isLoading.value = true
  
  if (!form.login) {
    errors.value.login = 'Введите логин'
    isLoading.value = false
    return
  }
  
  if (!form.password) {
    errors.value.password = 'Введите пароль'
    isLoading.value = false
    return
  }
  
  if (form.password.length < 5) {
    errors.value.password = 'Пароль должен быть не менее 5 символов'
    isLoading.value = false
    return
  }
  
  if (!form.email) {
    errors.value.email = 'Введите email'
    isLoading.value = false
    return
  }
  
  if (!form.email.includes('@')) {
    errors.value.email = 'Email должен содержать @'
    isLoading.value = false
    return
  }

  const error = register(form)
  if (error) {
    errors.value.general = error
    isLoading.value = false
    return
  }

  isLoading.value = false
  router.push('/login')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">📝</div>
          <h2>Создать аккаунт</h2>
          <p>Присоединяйтесь к LLShop</p>
        </div>
        
        <form @submit.prevent="regsub">
          <div class="input-group">
            <label>Логин *</label>
            <input 
              v-model="form.login" 
              type="text" 
              placeholder="Введите логин"
              :class="{ error: errors.login }"
            />
            <span v-if="errors.login" class="error-text">{{ errors.login }}</span>
          </div>
          
          <div class="input-group">
            <label>Пароль * (мин. 5 символов)</label>
            <input 
              v-model="form.password" 
              type="password" 
              placeholder="Введите пароль"
              :class="{ error: errors.password }"
            />
            <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
          </div>
          
          <div class="input-group">
            <label>Email *</label>
            <input 
              v-model="form.email" 
              type="text" 
              placeholder="example@mail.com"
              :class="{ error: errors.email }"
            />
            <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
          </div>
          
          <div class="input-group">
            <label>Телефон</label>
            <input v-model="form.phone" type="tel" placeholder="+7 (999) 123-45-67" />
          </div>
          
          <div class="input-group">
            <label>Город</label>
            <input v-model="form.city" type="text" placeholder="Ваш город" />
          </div>
          
          <div v-if="errors.general" class="general-error">
            {{ errors.general }}
          </div>
          
          <button type="submit" class="auth-submit" :disabled="isLoading">
            {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Уже есть аккаунт? 
            <RouterLink :to="{ name: 'Login' }" class="auth-link-text">Войти</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #0a0a0a;
}

.auth-container {
  width: 100%;
  max-width: 500px;
}

.auth-card {
  background: #1a1a1a;
  border-radius: 30px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.auth-header h2 {
  font-size: 28px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
}

.auth-header p {
  color: #888;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 14px 16px;
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  transition: all 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #a855f7;
}

.input-group input.error {
  border-color: #ff6b6b;
}

.error-text {
  display: block;
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 6px;
}

.general-error {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  color: #ff6b6b;
  font-size: 14px;
  margin-bottom: 20px;
}

.auth-submit {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.auth-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.auth-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.auth-footer p {
  color: #888;
  font-size: 14px;
}

.auth-link-text {
  color: #a855f7;
  text-decoration: none;
  font-weight: 500;
}

.auth-link-text:hover {
  text-decoration: underline;
}
</style>