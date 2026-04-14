<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore, availableImages } from '../composables/useStore'

const { addItem } = useStore()
const router = useRouter()

const form = reactive({
  name: '',
  price: '',
  desc: '',
  img: availableImages[0].value,
  category: 'other'
})

const errors = ref({
  name: '',
  price: '',
  desc: ''
})

function add() {
  errors.value = { name: '', price: '', desc: '' }
  let hasError = false
  
  if (!form.name.trim()) {
    errors.value.name = 'Заполните название'
    hasError = true
  }
  
  if (!form.price) {
    errors.value.price = 'Заполните цену'
    hasError = true
  } else if (isNaN(form.price)) {
    errors.value.price = 'Цена должна быть числом'
    hasError = true
  } else if (Number(form.price) <= 0) {
    errors.value.price = 'Цена должна быть больше 0'
    hasError = true
  }
  
  if (hasError) return

  addItem({
    name: form.name,
    price: Number(form.price),
    desc: form.desc,
    img: form.img,
    category: form.category
  })
  
  router.push('/admin/list')
}
</script>

<template>
  <div>
    <h3>Добавить товар</h3>
    
    <div class="admin-form-group">
      <label>Название: </label>
      <input v-model="form.name" type="text" />
      <span v-if="errors.name" class="admin-error">{{ errors.name }}</span>
    </div>
    
    <div class="admin-form-group">
      <label>Цена: </label>
      <input v-model="form.price" type="text" />
      <span v-if="errors.price" class="admin-error">{{ errors.price }}</span>
    </div>
    
    <div class="admin-form-group">
      <label>Описание: </label>
      <textarea v-model="form.desc" rows="3" cols="30"></textarea>
    </div>

    <div class="admin-form-group">
      <label>Категория: </label>
      <select v-model="form.category">
        <option value="fortnite">Fortnite</option>
        <option value="wow">World of Warcraft</option>
        <option value="pubg">PUBG</option>
        <option value="valorant">Valorant</option>
        <option value="other">Другое</option>
      </select>
    </div>

    <div class="admin-form-group">
      <label>Картинка: </label>
      <select v-model="form.img">
        <option v-for="img in availableImages" :key="img.value" :value="img.value">
          {{ img.label }}
        </option>
      </select>
    </div>

    <div>
      <img :src="form.img" width="100" />
    </div>

    <div class="admin-form-group">
      <button @click="add" class="admin-submit">Добавить</button>
    </div>
  </div>
</template>

<style scoped>
.admin-form-group {
  margin-bottom: 15px;
}

.admin-form-group label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}

.admin-form-group input, 
.admin-form-group textarea, 
.admin-form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}

.admin-error {
  display: block;
  color: #ff5252;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 100px;
}

.admin-submit {
  margin-left: 100px;
  padding: 8px 20px;
  background: #1a8f89;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>