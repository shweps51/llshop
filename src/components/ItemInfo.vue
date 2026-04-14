<script setup>
import { useRoute } from 'vue-router'
import { useStore } from '../composables/useStore'
import { computed } from 'vue'

const route = useRoute()
const { findItem } = useStore()

const item = computed(() => findItem(Number(route.params.id)))
</script>

<template>
  <div class="item-info">
    <h3>Характеристики</h3>
    <div class="info-list">
      <div class="info-item">
        <span class="label">Цена:</span>
        <span class="value">{{ item?.price }} ₽</span>
      </div>
      <div class="info-item">
        <span class="label">Категория:</span>
        <span class="value">{{ item?.category || 'Не указана' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-info h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e1e5e9;
}

.info-item .label {
  font-weight: 500;
  color: #666;
}

.info-item .value {
  color: #333;
}
</style>