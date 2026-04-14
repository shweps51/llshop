<script setup>
import { useStore } from './composables/useStore'
import { useRoute } from 'vue-router'

const { currentUser, logout, cart, favorites } = useStore()
const route = useRoute()

</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-container">
        <RouterLink :to="{ name: 'Catalog' }" class="logo">
          <span class="logo-icon">🎮</span>
          LLShop
        </RouterLink>
        
        <nav class="nav">
          <RouterLink :to="{ name: 'Catalog' }" class="nav-link">Каталог</RouterLink>
          <RouterLink :to="{ name: 'About' }" class="nav-link">О нас</RouterLink>
          <RouterLink v-if="currentUser" :to="{ name: 'Favorites' }" class="nav-link">
            Избранное <span class="badge">{{ favorites.length }}</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Cart' }" class="nav-link cart-link">
            Корзина <span class="badge">{{ cart.length }}</span>
          </RouterLink>
          <RouterLink v-if="currentUser?.isAdmin" :to="{ name: 'AdminList' }" class="nav-link">Админка</RouterLink>
        </nav>
        
        <div class="auth">
          <div v-if="currentUser" class="user-info">
            <span class="user-name">👤 {{ currentUser.login }}</span>
            <RouterLink :to="{ name: 'Profile' }" class="profile-link">Профиль</RouterLink>
            <button @click="logout" class="logout-btn">Выйти</button>
          </div>
          <div v-else class="auth-links">
            <RouterLink :to="{ name: 'Login' }" class="auth-link">Войти</RouterLink>
            <RouterLink :to="{ name: 'Register' }" class="auth-link register-link">Регистрация</RouterLink>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-col">
          <div class="footer-logo">
            <span class="logo-icon">🎮</span>
            <span>LLShop</span>
          </div>
          <p class="footer-desc">Магазин игровой валюты с лучшими ценами и мгновенной доставкой.</p>
          <div class="social-links">
            <a href="#" class="social-link">📘</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">🎵</a>
            <a href="#" class="social-link">💬</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>Магазин</h4>
          <ul>
            <li><RouterLink :to="{ name: 'Catalog' }">Каталог</RouterLink></li>
            <li><RouterLink :to="{ name: 'About' }">О нас</RouterLink></li>
            <li><RouterLink :to="{ name: 'Favorites' }">Избранное</RouterLink></li>
            <li><RouterLink :to="{ name: 'Cart' }">Корзина</RouterLink></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Помощь</h4>
          <ul>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Оплата</a></li>
            <li><a href="#">Возврат</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Контакты</h4>
          <ul>
            <li>📧 support@llshop.com</li>
            <li>📱 +7 (999) 67-52-67</li>
            <li>💬 Telegram: @shweps51</li>
            <li>📍 Санкт-Петербург, ул. Ким, 52</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 LLShop. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<style>

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.nav {
  margin-left: 40px;
}

.auth {
  margin-left: auto;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0a0a0a;
  color: #fff;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Header */
.header {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header-container {
  width: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

@media (max-width: 768px) {
  .header-container {
    padding: 16px 20px;
    flex-direction: column;
    text-align: center;
  }
}

.logo {
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #fff 0%, #a855f7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.logo-icon {
  font-size: 28px;
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
  color: #a855f7;
}

.nav {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .nav {
    justify-content: center;
  }
}

.nav-link {
  text-decoration: none;
  color: #e5e5e5;
  font-weight: 500;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.nav-link:hover {
  color: #a855f7;
}

.badge {
  background: #a855f7;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 20px;
  min-width: 20px;
  text-align: center;
}

.cart-link .badge {
  background: #ff6b6b;
}

/* Auth */
.auth-links {
  display: flex;
  gap: 12px;
}

.auth-link {
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.3s;
  white-space: nowrap;
}

.auth-link:first-child {
  color: #e5e5e5;
  border: 1px solid #333;
}

.auth-link:first-child:hover {
  border-color: #a855f7;
  color: #a855f7;
}

.register-link {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: white;
}

.register-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .user-info {
    justify-content: center;
  }
}

.user-name {
  color: #a855f7;
  font-weight: 500;
  white-space: nowrap;
}

.profile-link {
  text-decoration: none;
  color: #e5e5e5;
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  white-space: nowrap;
}

.profile-link:hover {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.logout-btn:hover {
  background: rgba(255, 107, 107, 0.2);
}

/* Main */
.main {
  flex: 1;
  width: 100%;
}

/* Footer */
.footer {
  background: #050505;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 60px;
  width: 100%;
}

.footer-container {
  width: 100%;
  padding: 50px 32px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 40px 20px 30px;
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.footer-logo {
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (max-width: 768px) {
  .footer-logo {
    justify-content: center;
  }
}

.footer-desc {
  color: #888;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .social-links {
    justify-content: center;
  }
}

.social-link {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #888;
  transition: all 0.3s;
  font-size: 18px;
}

.social-link:hover {
  background: #a855f7;
  color: white;
  transform: translateY(-3px);
}

.footer-col h4 {
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-col ul {
  list-style: none;
}

.footer-col ul li {
  margin-bottom: 12px;
}

.footer-col ul li a {
  text-decoration: none;
  color: #888;
  transition: color 0.3s;
  font-size: 14px;
}

.footer-col ul li a:hover {
  color: #a855f7;
}

.footer-col ul li {
  color: #888;
  font-size: 14px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 32px;
  text-align: center;
}

.footer-bottom p {
  color: #666;
  font-size: 13px;
}
</style>