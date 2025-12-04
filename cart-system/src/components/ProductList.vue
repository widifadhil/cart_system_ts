<template>
  <div>
    <div class="header">
      <div>
        <h2 style="margin:0">Produk Pilihan</h2>
        <div class="subtitle">Pilih produk yang ingin dimasukkan ke keranjang</div>
      </div>
      <div class="search-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <input v-model="q" placeholder="Cari produk..." class="search-input" />
      </div>
    </div>

    <div class="grid">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import { useAdminStore } from '../stores/admin';
import { ref, computed } from 'vue';

const adminStore = useAdminStore();
const q = ref('');
const filtered = computed(() => {
  if (!q.value) return adminStore.products;
  return adminStore.products.filter(p => p.name.toLowerCase().includes(q.value.toLowerCase()));
});
</script>

<style scoped>
.header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:12px;
}
.search-wrapper {
  position: relative;
}
.search-wrapper svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}
.search-input {
  padding:8px 10px 8px 36px;
  border-radius:10px;
  border:1px solid #e6edf9;
  transition: all .2s ease;
}
.search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-600);
}
</style>
