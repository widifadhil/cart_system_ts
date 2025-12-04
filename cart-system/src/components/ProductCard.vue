<template>
  <article class="card" role="article">
    <div class="img">
      <img v-if="product.image" :src="product.image" alt="" style="width:100%;height:100%;object-fit:cover;">
      <div v-else class="placeholder">{{ product.name.charAt(0) }}</div>
    </div>

    <div>
      <div class="name">{{ product.name }}</div>
      <div class="desc">{{ product.description }}</div>
      <div class="price">Rp {{ formatCurrency(product.price) }}</div>
    </div>

    <div style="display:flex;gap:10px;margin-top:auto;align-items:center;justify-content:space-between;">
      <button class="btn btn-secondary" @click="viewDetails">Details</button>
      <button class="btn btn-primary" @click="add">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
        </svg>
        Add
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Product } from '../types';
import { defineProps } from 'vue';
import { useCartStore } from '../stores/cart';

const props = defineProps<{ product: Product }>();
const cart = useCartStore();
const router = useRouter();

function add() {
  cart.addToCart(props.product);
}

function viewDetails() {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } });
}

function formatCurrency(n: number) {
  return n.toLocaleString('id-ID');
}
</script>

<style scoped>
.card {
  transition: all .2s ease;
  height:100%;
}
.card:hover {
  transform: scale(1.05);
}
.img { border-radius:10px; overflow:hidden; margin-bottom:8px; }
.placeholder { height:140px; display:flex; align-items:center; justify-content:center; font-size:36px; color:#475569; background: linear-gradient(135deg,#eef2ff,#f8fafc); }
.name { font-weight:700; margin-bottom:4px; }
.price { color:var(--accent-600); font-weight:800; margin-top:6px; }
.desc { color:var(--muted); font-size:13px; margin-bottom:6px; }
.btn { 
  padding:8px 12px;
  border-radius:10px;
  display:flex;
  align-items:center;
  gap: 6px;
}
.btn-secondary { border:1px solid #e6edf9; background:transparent; color:var(--accent-600); }
.btn-primary { 
  background:var(--accent);
  color:white;
  transition: all .2s ease;
}
.btn-primary:hover {
  background: var(--accent-600);
  transform: scale(1.1);
}
</style>
