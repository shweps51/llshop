<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore, availableImages } from '../composables/useStore'
import { reactive, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const { findItem, editItem } = useStore()

const item = findItem(Number(route.params.id))

if (!item) {
  router.push('/404')
}

const form = reactive({
  name: item?.name || '',
  price: item?.price || '',
  desc: item?.desc || '',
  img: item?.img || availableImages[0].value,
  category: item?.category || 'other'
})

const errors = ref({
  name: '',
  price: '',
  desc: ''
})

function save() {
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

  editItem(item.id, {
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
    <h3>Редактировать товар</h3>
    
    <div class="admin-current">
      <div><strong>Текущий товар:</strong></div>
      <div>ID: {{ item.id }}</div>
      <div>Название: {{ item.name }}</div>
      <div>Цена: {{ item.price }}</div>
      <div>Описание: {{ item.desc }}</div>
      <div>Картинка: <img :src="item.img" width="50" /></div>
    </div>
    
    <hr />
    
    <div class="admin-form-group">
      <label>Новое название: </label>
      <input v-model="form.name" type="text" />
      <span v-if="errors.name" class="admin-error">{{ errors.name }}</span>
    </div>
    
    <div class="admin-form-group">
      <label>Новая цена: </label>
      <input v-model="form.price" type="text" />
      <span v-if="errors.price" class="admin-error">{{ errors.price }}</span>
    </div>
    
    <div class="admin-form-group">
      <label>Новое описание: </label>
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
      <label>Новая картинка: </label>
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
      <button @click="save" class="admin-save">Сохранить изменения</button>
    </div>
  </div>
</template>

<style scoped>
.admin-current {
  background: #000000;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.admin-form-group {
  margin-bottom: 15px;
}

.admin-form-group label {
  display: inline-block;
  width: 120px;
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
  margin-left: 120px;
}

.admin-save {
  margin-left: 120px;
  padding: 8px 20px;
  background: #1a8f89;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>