import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { CartItem, Product } from '../types';
import { useAdminStore } from './admin';

const STORAGE_KEY = 'cart_v1';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const adminStore = useAdminStore();

  // load from localStorage
  const load = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[] | null;
        if (Array.isArray(parsed)) {
          items.value = parsed;
        } else {
          items.value = [];
        }
      } catch {
        items.value = [];
      }
    } else {
      items.value = [];
    }
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value ?? []));
  };

  // watch changes and persist
  watch(items, save, { deep: true });

  // watch for product changes in admin store
  watch(() => adminStore.products, (newProducts) => {
    // Update or remove items in the cart based on changes in the admin product list
    items.value = items.value.map(item => {
      const product = newProducts.find(p => p.id === item.id);
      if (product) {
        // update product details
        return { ...item, name: product.name, price: product.price, description: product.description, image: product.image };
      }
      return item;
    }).filter(item => newProducts.some(p => p.id === item.id)); // remove items that are no longer in the product list
  }, { deep: true });


  const findIndex = (productId: number) => {
    return items.value.findIndex(i => i.id === productId);
  };

  function addToCart(product: Product) {
    const idx = findIndex(product.id);
    if (idx >= 0) {
      const item = items.value[idx];
      if (item) {
        item.qty = (item.qty ?? 0) + 1;
      }
    } else {
      // pastikan qty ada dan number
      items.value.push({ ...product, qty: 1 });
    }
  }

  function removeFromCart(productId: number) {
    items.value = (items.value ?? []).filter(i => i.id !== productId);
  }

  function increment(productId: number) {
    const idx = findIndex(productId);
    if (idx >= 0) {
      const item = items.value[idx];
      if (item) {
        item.qty = (item.qty ?? 0) + 1;
      }
    }
  }

  function decrement(productId: number) {
    const idx = findIndex(productId);
    if (idx >= 0) {
      const item = items.value[idx];
      if (item) {
        item.qty = (item.qty ?? 0) - 1;
        if ((item.qty ?? 0) <= 0) {
          // remove item jika qty <= 0
          removeFromCart(productId);
        }
      }
    }
  }

  function clearCart() {
    items.value = [];
  }

  // --- ubah jadi fungsi yang mengembalikan number (bisa dipanggil)
  function totalItems() {
    const list = items.value ?? [];
    return list.reduce((s, i) => s + (i.qty ?? 0), 0);
  }

  function totalPrice() {
    const list = items.value ?? [];
    return list.reduce((s, i) => s + ((i.qty ?? 0) * (i.price ?? 0)), 0);
  }

  // init load
  load();

  return {
    items,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    totalItems,
    totalPrice,
  };
});
