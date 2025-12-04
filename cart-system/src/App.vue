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

      <nav style="display:flex;gap:12px;align-items:center">
        <router-link to="/" class="btn">Home</router-link>
        <router-link to="/admin" class="btn">Admin</router-link>
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
