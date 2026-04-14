<script setup>
import { useRoute } from 'vue-router'
import { useStore } from '../composables/useStore'
import { computed } from 'vue'

const route = useRoute()
const { findItem } = useStore()

const item = computed(() => findItem(Number(route.params.id)))
</script>

<template>
  <div class="item-desc">
    <h3>Описание товара</h3>
    <p>{{ item?.desc || 'Описание отсутствует' }}</p>
  </div>
</template>

<style scoped>
.item-desc h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.item-desc p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}
</style>