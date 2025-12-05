<script setup lang="ts">
import { useRoute } from 'vue-router';
import Cart from './components/Cart.vue';

const route = useRoute();
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="brand">
        <div class="logo">MS</div>
        <div>
          <div class="title">MasterSteel - Cart Demo</div>
          <div class="subtitle">Contoh tugas menggunakan Vue + TypeScript</div>
        </div>
      </div>

      <nav class="navigation">
        <router-link to="/" class="btn">
          <i class="fas fa-home nav-icon"></i>
          <span class="nav-text">Home</span>
        </router-link>
        <router-link to="/admin" class="btn">
          <i class="fas fa-cog nav-icon"></i>
          <span class="nav-text">Admin</span>
        </router-link>
      </nav>
    </header>

    <main class="main">
      <section class="left">
        <router-view />
      </section>

      <aside class="right-panel" v-if="route.path === '/'">
        <Cart />
      </aside>
    </main>
  </div>
</template>

<style scoped>
/* === GENERAL & MOBILE-FIRST STYLES === */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem; /* Padding untuk mobile */
}

/* --- Header --- */
.header {
  display: flex;
  flex-wrap: wrap; /* Izinkan item untuk wrap di layar kecil */
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  background-color: #1a237e; /* Warna baja yang lebih gelap */
  color: white;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  font-weight: bold;
  border-radius: 4px;
}

.title {
  font-weight: bold;
  font-size: 1.1rem;
}

.subtitle {
  font-size: 0.8rem;
  color: #666;
}

.brand > div:last-child {
  /* Biar subtitle tidak terlalu lebar di mobile */
  min-width: 150px;
}

/* --- Navigation --- */
.navigation {
  /* Mobile: Bottom Navigation Bar */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-top: 1px solid #e0e0e0;
  padding: 0.5rem 0;
  z-index: 1000;
}

.btn {
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s ease;
  /* Mobile: Icon and Text layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0.25rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
}

.nav-icon {
  font-size: 1.5rem; /* Ukuran ikon */
}

.router-link-exact-active {
  color: #1a237e;
}

/* --- Main Content --- */
.main {
  display: flex;
  flex-direction: column; /* Susun vertikal di mobile */
  gap: 2rem;
  padding-bottom: 80px; /* Beri ruang agar konten tidak tertutup bottom nav */
}

.left {
  flex: 1; /* Ambil ruang yang tersedia */
}

.right-panel {
  width: 100%; /* Lebar penuh di mobile */
}

/* === DESKTOP STYLES (Layar lebih besar) === */
@media (min-width: 1024px) {
  /* Kembalikan navigasi ke header di desktop */
  .navigation {
    position: static;
    border-top: none;
    background-color: transparent;
    padding: 0;
    gap: 0.75rem; /* 12px */
  }

  .btn {
    flex-direction: row;
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .nav-icon {
    display: none; /* Sembunyikan ikon di desktop */
  }

  .btn:hover,
  .router-link-exact-active {
    background-color: #f0f0f0;
  }

  .main {
    flex-direction: row; /* Susun horizontal di desktop */
    align-items: flex-start;
  }

  .right-panel {
    width: 350px; /* Lebar tetap untuk sidebar keranjang */
    position: sticky;
    top: 1.5rem; /* Sesuaikan dengan margin-bottom dari header */
  }
}
</style>
