<template>
  <div class="cart-card">
    <div class="cart-header">
      <div>
        <div style="font-weight:700">Keranjang</div>
        <div class="subtitle">Barang yang akan dibeli</div>
      </div>
      <div class="badge">{{ cart.totalItems() }}</div>
    </div>

    <div v-if="cart.items.length === 0" style="padding:12px 0;color:var(--muted)">Keranjang kosong — tambahkan produk.</div>

    <div v-else style="display:flex;flex-direction:column;gap:10px">
      <div v-for="it in cart.items" :key="it.id" class="cart-item">
        <div style="display:flex;gap:10px;align-items:center;width:100%">
          <div style="width:56px;height:56px;border-radius:8px;background:#fff;border:1px solid #eef6ff;display:flex;align-items:center;justify-content:center">
            {{ it.name.charAt(0) }}
          </div>

          <div style="flex:1">
            <div style="font-weight:700">{{ it.name }}</div>
            <div style="font-size:13px;color:var(--muted)">Rp {{ it.price.toLocaleString('id-ID') }}</div>
          </div>

          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
            <div class="qty-control">
              <button class="icon-btn" @click="cart.decrement(it.id)">−</button>
              <div style="min-width:28px;text-align:center;font-weight:700">{{ it.qty }}</div>
              <button class="icon-btn" @click="cart.increment(it.id)">＋</button>
            </div>
            <button class="remove" @click="cart.removeFromCart(it.id)" style="font-size:12px;color:var(--danger);background:transparent;border:none;cursor:pointer">Hapus</button>
          </div>
        </div>
      </div>

      <div class="totals">
        <div style="color:var(--muted)">Total</div>
        <div style="font-weight:800">Rp {{ cart.totalPrice().toLocaleString('id-ID') }}</div>
      </div>

      <div class="checkout">
        <button class="btn btn-primary" @click="checkout">Checkout</button>
        <button class="btn btn-ghost" @click="cart.clearCart()">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
const cart = useCartStore();

function checkout() {
  // simulasi checkout sederhana
  if (cart.items.length === 0) {
    alert('Keranjang kosong');
    return;
  }
  alert('Checkout berhasil — total: Rp ' + cart.totalPrice().toLocaleString('id-ID'));
  cart.clearCart();
}
</script>
<style>
/* Styling untuk cart-card */
.cart-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}


.remove { font-size:12px; }
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cart-header .subtitle {
  font-size: 0.8rem;
  color: var(--muted);
}

.badge {
  background-color: #42b883; /* Warna hijau Vue */
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
}

.totals {
  display: flex;
  justify-content: space-between;
}
.qty-control { display:flex;align-items:center;gap:6px; }
.icon-btn { width:34px;height:34px;border-radius:8px;border:1px solid #eef6ff;display:grid;place-items:center;background:white;cursor:pointer; }
.icon-btn:hover { background:#f8fbff; }
</style>
