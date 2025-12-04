<template>
  <div v-if="product">
    <div class="img">
      <img v-if="product.image" :src="product.image" alt="" style="width:100%;height:100%;object-fit:cover;">
      <div v-else class="placeholder">{{ product.name.charAt(0) }}</div>
    </div>
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>Rp {{ product.price.toLocaleString('id-ID') }}</p>
  </div>
  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { products } from '../data/products';

const route = useRoute();
const productId = Number(route.params.id);
const product = products.find(p => p.id === productId);
</script>

<style scoped>
.img { border-radius:10px; overflow:hidden; margin-bottom:8px; width: 300px; height: 300px; }
.placeholder { height:100%; display:flex; align-items:center; justify-content:center; font-size:36px; color:#475569; background: linear-gradient(135deg,#eef2ff,#f8fafc); }
</style>
