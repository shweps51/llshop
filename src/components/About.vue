<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="about-hero-content">
        <h1>О нас</h1>
        <p>Твой надёжный партнёр в мире игровой валюты</p>
      </div>
    </section>

    <div class="about-container">
      <div class="about-main">
        <div class="about-card">
          <h2>LLShop — игровая валюта без границ</h2>
          <p>Магазин игровой валюты <strong>LLShop</strong> — это онлайн-каталог современных решений для геймеров.</p>
          <p>V-Bucks, Gold, UC, Valorant Points — пополняй счёт в любимых играх по выгодным ценам.</p>
          <p>Удобные фильтры, актуальный ассортимент и простой интерфейс делают выбор быстрым и приятным.</p>
        </div>

        <div class="advantages">
          <div class="advantage">
            <div class="advantage-icon">⚡</div>
            <h3>Мгновенная доставка</h3>
            <p>Получите валюту сразу после оплаты</p>
          </div>
          <div class="advantage">
            <div class="advantage-icon">🔒</div>
            <h3>Безопасность</h3>
            <p>Защита данных и безопасные платежи</p>
          </div>
          <div class="advantage">
            <div class="advantage-icon">💎</div>
            <h3>Лучшие цены</h3>
            <p>Низкие цены и регулярные скидки</p>
          </div>
          <div class="advantage">
            <div class="advantage-icon">🎮</div>
            <h3>Все популярные игры</h3>
            <p>Fortnite, WoW, PUBG, Valorant и другие</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 80vh;
  background: #0a0a0a;
  width: 100%;
  padding: 0;
  margin: 0;
}

.about-hero {
  background: radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.15), transparent 50%);
  padding: 80px 0;
  text-align: center;
  width: 100%;
}

.about-hero-content {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: 0 40px;
}

.about-hero-content h1 {
  font-size: 64px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
  letter-spacing: normal;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .about-hero-content h1 {
    font-size: 48px;
  }
  .about-hero-content {
    padding: 0 30px;
  }
}

@media (max-width: 480px) {
  .about-hero-content h1 {
    font-size: 36px;
  }
  .about-hero-content {
    padding: 0 20px;
  }
}

.about-hero-content p {
  font-size: 20px;
  color: #aaa;
}

@media (max-width: 480px) {
  .about-hero-content p {
    font-size: 16px;
  }
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
  width: 100%;
}

@media (max-width: 768px) {
  .about-container {
    padding: 40px 30px;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 30px 20px;
  }
}

.about-main {
  background: #1a1a1a;
  border-radius: 30px;
  padding: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
}

@media (max-width: 768px) {
  .about-main {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .about-main {
    padding: 25px 20px;
  }
}

.about-card {
  text-align: center;
  margin-bottom: 50px;
}

.about-card h2 {
  font-size: 32px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .about-card h2 {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .about-card h2 {
    font-size: 22px;
  }
}

.about-card p {
  color: #aaa;
  line-height: 1.7;
  margin-bottom: 16px;
  font-size: 16px;
}

@media (max-width: 480px) {
  .about-card p {
    font-size: 14px;
  }
}

.advantages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
}

.advantage {
  text-align: center;
  padding: 30px 20px;
  background: #0a0a0a;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.advantage:hover {
  transform: translateY(-5px);
  border-color: rgba(168, 85, 247, 0.3);
}

.advantage-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.advantage h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
}

.advantage p {
  color: #777;
  font-size: 14px;
}
</style>