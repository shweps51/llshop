import { reactive, computed, ref } from 'vue'

// Импортируем локальные картинки из assets
import vbucksImg from '../assets/vbuucks.png'
import steamImg from '../assets/steam.png'
import valorantImg from '../assets/valorant.jpg'
import genshinImg from '../assets/genshin.jpg'
import robloxImg from '../assets/roblox.png'

// Список доступных картинок для выбора
export const availableImages = [
  { value: vbucksImg, label: 'Fortnite картинка' },
  { value: steamImg, label: 'Steam картинка' },
  { value: valorantImg, label: 'Valorant картинка' },
  { value: genshinImg, label: 'Genshin Impact картинка' },
  { value: robloxImg, label: 'Roblox картинка' },
  { value: 'https://via.placeholder.com/300x200?text=New+Item', label: 'Заглушка' }
]

// Ключи для localStorage
const STORAGE_KEYS = {
  USERS: 'llshop_users',
  CATALOG: 'llshop_catalog',
  CURRENT_USER: 'llshop_current_user'
}

// НАЧАЛЬНЫЙ КАТАЛОГ ТОВАРОВ (26 товаров)
const getInitialCatalog = () => {
  return [
    // ========== FORTNITE (5 товаров) ==========
    {
      id: 1,
      name: '1000 V-Bucks',
      price: 850,
      desc: '1000 V-Bucks для Fortnite. Покупайте скины, эмоции и боевой пропуск!',
      img: vbucksImg,
      category: 'fortnite'
    },
    {
      id: 2,
      name: '2800 V-Bucks',
      price: 2100,
      desc: '2800 V-Bucks для Fortnite. Отличный выбор для активных игроков!',
      img: vbucksImg,
      category: 'fortnite'
    },
    {
      id: 3,
      name: '5000 V-Bucks',
      price: 3500,
      desc: '5000 V-Bucks для Fortnite. Самый выгодный пакет!',
      img: vbucksImg,
      category: 'fortnite'
    },
    {
      id: 4,
      name: '13500 V-Bucks',
      price: 8500,
      desc: '13500 V-Bucks для Fortnite. Мега-пакет для настоящих фанатов!',
      img: vbucksImg,
      category: 'fortnite'
    },
    {
      id: 5,
      name: 'V-Bucks Battle Pass',
      price: 650,
      desc: 'Боевой пропуск Fortnite + 1000 V-Bucks в подарок!',
      img: vbucksImg,
      category: 'fortnite'
    },
    // ========== STEAM (6 товаров) ==========
    {
      id: 6,
      name: 'Steam Gift Card 500 ₽',
      price: 475,
      desc: 'Подарочная карта Steam на 500 рублей.',
      img: steamImg,
      category: 'steam'
    },
    {
      id: 7,
      name: 'Steam Gift Card 1000 ₽',
      price: 950,
      desc: 'Подарочная карта Steam на 1000 рублей.',
      img: steamImg,
      category: 'steam'
    },
    {
      id: 8,
      name: 'Steam Gift Card 2000 ₽',
      price: 1900,
      desc: 'Подарочная карта Steam на 2000 рублей.',
      img: steamImg,
      category: 'steam'
    },
    {
      id: 9,
      name: 'Steam Gift Card 5000 ₽',
      price: 4700,
      desc: 'Подарочная карта Steam на 5000 рублей.',
      img: steamImg,
      category: 'steam'
    },
    {
      id: 10,
      name: 'CS:GO Prime Status',
      price: 1100,
      desc: 'Prime статус для CS:GO.',
      img: steamImg,
      category: 'steam'
    },
    {
      id: 11,
      name: 'PUBG G-Coin 1000',
      price: 750,
      desc: '1000 G-Coin для PUBG.',
      img: steamImg,
      category: 'steam'
    },
    // ========== VALORANT (5 товаров) ==========
    {
      id: 12,
      name: '100 Valorant Points',
      price: 130,
      desc: '100 Valorant Points.',
      img: valorantImg,
      category: 'valorant'
    },
    {
      id: 13,
      name: '500 Valorant Points',
      price: 550,
      desc: '500 Valorant Points.',
      img: valorantImg,
      category: 'valorant'
    },
    {
      id: 14,
      name: '1000 Valorant Points',
      price: 1000,
      desc: '1000 Valorant Points.',
      img: valorantImg,
      category: 'valorant'
    },
    {
      id: 15,
      name: '2000 Valorant Points',
      price: 1900,
      desc: '2000 Valorant Points.',
      img: valorantImg,
      category: 'valorant'
    },
    {
      id: 16,
      name: '5000 Valorant Points',
      price: 4500,
      desc: '5000 Valorant Points.',
      img: valorantImg,
      category: 'valorant'
    },
    // ========== GENSHIN IMPACT (5 товаров) ==========
    {
      id: 17,
      name: '60 Генезис кристаллов',
      price: 90,
      desc: '60 Генезис кристаллов для Genshin Impact.',
      img: genshinImg,
      category: 'genshin'
    },
    {
      id: 18,
      name: '300 Генезис кристаллов',
      price: 450,
      desc: '300 Генезис кристаллов для Genshin Impact.',
      img: genshinImg,
      category: 'genshin'
    },
    {
      id: 19,
      name: '980 Генезис кристаллов',
      price: 1350,
      desc: '980 Генезис кристаллов для Genshin Impact.',
      img: genshinImg,
      category: 'genshin'
    },
    {
      id: 20,
      name: '1980 Генезис кристаллов',
      price: 2700,
      desc: '1980 Генезис кристаллов для Genshin Impact.',
      img: genshinImg,
      category: 'genshin'
    },
    {
      id: 21,
      name: '3280 Генезис кристаллов',
      price: 4500,
      desc: '3280 Генезис кристаллов для Genshin Impact.',
      img: genshinImg,
      category: 'genshin'
    },
    // ========== ROBLOX (5 товаров) ==========
    {
      id: 22,
      name: '400 Robux',
      price: 450,
      desc: '400 Robux для Roblox.',
      img: robloxImg,
      category: 'roblox'
    },
    {
      id: 23,
      name: '800 Robux',
      price: 850,
      desc: '800 Robux для Roblox.',
      img: robloxImg,
      category: 'roblox'
    },
    {
      id: 24,
      name: '2000 Robux',
      price: 2100,
      desc: '2000 Robux для Roblox.',
      img: robloxImg,
      category: 'roblox'
    },
    {
      id: 25,
      name: '4500 Robux',
      price: 4700,
      desc: '4500 Robux для Roblox.',
      img: robloxImg,
      category: 'roblox'
    },
    {
      id: 26,
      name: 'Premium Roblox',
      price: 550,
      desc: 'Roblox Premium подписка на 1 месяц.',
      img: robloxImg,
      category: 'roblox'
    }
  ]
}

// Загрузка товаров из localStorage
const loadCatalog = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.CATALOG)
  if (saved && JSON.parse(saved).length > 0) {
    return JSON.parse(saved)
  }
  return getInitialCatalog()
}

// Загрузка пользователей из localStorage
const loadUsers = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.USERS)
  if (saved) {
    return JSON.parse(saved)
  }
  return []
}

// Загрузка текущего пользователя
const loadCurrentUser = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  if (saved) {
    return JSON.parse(saved)
  }
  return null
}

// Состояние
const state = reactive({
  catalog: loadCatalog(),
  users: loadUsers(),
  currentUser: loadCurrentUser(),
  isAdmin: false
})

// Функции для сохранения в localStorage
function saveCatalog() {
  localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(state.catalog))
}

function saveUsers() {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(state.users))
}

function saveCurrentUser() {
  if (state.currentUser) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(state.currentUser))
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

// Получение ключа для хранения данных пользователя
function getUserStorageKey(userId) {
  return `llshop_user_${userId}`
}

// Загрузка корзины пользователя
function loadUserCart(userId) {
  const key = getUserStorageKey(userId)
  const saved = localStorage.getItem(key + '_cart')
  if (saved) {
    return JSON.parse(saved)
  }
  return []
}

// Сохранение корзины пользователя
function saveUserCart(userId, cart) {
  const key = getUserStorageKey(userId)
  localStorage.setItem(key + '_cart', JSON.stringify(cart))
}

// Загрузка избранного пользователя
function loadUserFavorites(userId) {
  const key = getUserStorageKey(userId)
  const saved = localStorage.getItem(key + '_favorites')
  if (saved) {
    return JSON.parse(saved)
  }
  return []
}

// Сохранение избранного пользователя
function saveUserFavorites(userId, favorites) {
  const key = getUserStorageKey(userId)
  localStorage.setItem(key + '_favorites', JSON.stringify(favorites))
}

// Корзина и избранное для текущего пользователя
const userCart = ref([])
const userFavorites = ref([])

// Обновление данных текущего пользователя
function loadUserData() {
  if (state.currentUser) {
    userCart.value = loadUserCart(state.currentUser.id)
    userFavorites.value = loadUserFavorites(state.currentUser.id)
  } else {
    userCart.value = []
    userFavorites.value = []
  }
}

// Сохранение данных текущего пользователя
function saveUserData() {
  if (state.currentUser) {
    saveUserCart(state.currentUser.id, userCart.value)
    saveUserFavorites(state.currentUser.id, userFavorites.value)
  }
}

// Вычисляемые свойства
export const catalog = computed(() => state.catalog)
export const isAdmin = computed(() => state.isAdmin)
export const currentUser = computed(() => state.currentUser)
export const cart = computed(() => userCart.value)
export const favorites = computed(() => userFavorites.value)

// Функции для товаров
export function toggleAdmin() {
  state.isAdmin = !state.isAdmin
}

export function addItem(item) {
  state.catalog.push({
    id: state.catalog.length + 1,
    name: item.name,
    price: Number(item.price),
    desc: item.desc,
    img: item.img,
    category: item.category || 'other'
  })
  saveCatalog()
}

export function findItem(id) {
  return state.catalog.find(i => i.id === id)
}

export function editItem(id, data) {
  const item = findItem(id)
  if (item) {
    item.name = data.name
    item.price = Number(data.price)
    item.desc = data.desc
    if (data.img) {
      item.img = data.img
    }
    if (data.category) {
      item.category = data.category
    }
    saveCatalog()
  }
}

export function deleteItem(id) {
  const index = state.catalog.findIndex(i => i.id === id)
  if (index !== -1) {
    state.catalog.splice(index, 1)
    saveCatalog()
  }
}

// Функции для пользователей
export function register(user) {
  const exists = state.users.find(u => u.login === user.login)
  if (exists) {
    return 'Пользователь с таким логином уже существует'
  }

  const newUser = {
    id: state.users.length + 1,
    login: user.login,
    password: user.password,
    email: user.email,
    phone: user.phone || '',
    city: user.city || ''
  }

  state.users.push(newUser)
  saveUsers()
  return null
}

export function login(data) {
  // Фиксированный администратор
  if (data.login === 'shweps51' && data.password === 'admin52') {
    state.isAdmin = true
    state.currentUser = { id: 0, login: 'shweps51', isAdmin: true, email: 'admin@llshop.com', phone: '', city: '' }
    saveCurrentUser()
    loadUserData()
    return null
  }
  
  const found = state.users.find(
    u => u.login === data.login && u.password === data.password
  )

  if (!found) {
    return 'Неверный логин или пароль'
  }

  state.currentUser = found
  state.isAdmin = false
  saveCurrentUser()
  loadUserData()
  return null
}

export function logout() {
  saveUserData()
  state.currentUser = null
  state.isAdmin = false
  saveCurrentUser()
  userCart.value = []
  userFavorites.value = []
}

export function updateUserProfile(data) {
  if (state.currentUser) {
    if (data.email) state.currentUser.email = data.email
    if (data.phone) state.currentUser.phone = data.phone
    if (data.city) state.currentUser.city = data.city
    
    const userIndex = state.users.findIndex(u => u.id === state.currentUser.id)
    if (userIndex !== -1) {
      state.users[userIndex].email = state.currentUser.email
      state.users[userIndex].phone = state.currentUser.phone
      state.users[userIndex].city = state.currentUser.city
    }
    saveUsers()
    saveCurrentUser()
  }
}

// Функции для корзины
export function addToCart(item) {
  const existing = userCart.value.find(i => i.id === item.id)
  if (existing) {
    if ((existing.quantity || 1) >= 10) {
      return { success: false, message: 'Нельзя добавить больше 10 единиц товара' }
    }
    existing.quantity = (existing.quantity || 1) + 1
  } else {
    userCart.value.push({ 
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: 1
    })
  }
  saveUserData()
  return { success: true, message: 'Товар добавлен в корзину' }
}

export function removeFromCart(itemId) {
  const index = userCart.value.findIndex(i => i.id === itemId)
  if (index !== -1) {
    userCart.value.splice(index, 1)
    saveUserData()
  }
}

export function updateQuantity(itemId, quantity) {
  const item = userCart.value.find(i => i.id === itemId)
  if (item && quantity >= 1 && quantity <= 10) {
    item.quantity = quantity
    saveUserData()
    return true
  } else if (quantity > 10) {
    return { success: false, message: 'Максимальное количество - 10 штук' }
  } else if (quantity < 1) {
    removeFromCart(itemId)
    return true
  }
  return false
}

export function clearCart() {
  userCart.value = []
  saveUserData()
}

export function getCartTotal() {
  return userCart.value.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
}

// Функции для избранного
export function addToFavorites(item) {
  if (!state.currentUser) {
    return { success: false, message: 'Для добавления в избранное необходимо войти в аккаунт' }
  }
  const exists = userFavorites.value.find(i => i.id === item.id)
  if (!exists) {
    userFavorites.value.push(item)
    saveUserData()
    return { success: true, message: 'Товар добавлен в избранное' }
  }
  return { success: false, message: 'Товар уже в избранном' }
}

export function removeFromFavorites(itemId) {
  const index = userFavorites.value.findIndex(i => i.id === itemId)
  if (index !== -1) {
    userFavorites.value.splice(index, 1)
    saveUserData()
  }
}

export function isFavorite(itemId) {
  return userFavorites.value.some(i => i.id === itemId)
}

// Главная функция экспорта
export function useStore() {
  return {
    catalog,
    isAdmin,
    currentUser,
    cart,
    favorites,
    toggleAdmin,
    addItem,
    findItem,
    editItem,
    deleteItem,
    register,
    login,
    logout,
    updateUserProfile,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }
}

// Загружаем данные текущего пользователя при старте
loadUserData()