<template>
  <div>
    <h2>Админ панель</h2>
    <div>
      <RouterLink to="/admin/list">Список товаров</RouterLink>
      <RouterLink to="/admin/add">Добавить товар</RouterLink>
    </div>
    <RouterView />
  </div>
</template>