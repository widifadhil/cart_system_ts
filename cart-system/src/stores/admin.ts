import { defineStore } from 'pinia';
import { ref } from 'vue';
import { products as initialProducts } from '../data/products';
import type { Product } from '../types';

export const useAdminStore = defineStore('admin', () => {
  const isAdmin = ref(false);
  const products = ref<Product[]>(initialProducts);

  function toggleAdmin() {
    isAdmin.value = !isAdmin.value;
  }

  function createProduct(product: Omit<Product, 'id'>) {
    const maxId = products.value.reduce((max, p) => p.id > max ? p.id : max, 0);
    products.value.push({ id: maxId + 1, ...product });
  }

  function updateProduct(product: Product) {
    const index = products.value.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products.value[index] = product;
    }
  }

  function deleteProduct(id: number) {
    const index = products.value.findIndex(p => p.id === id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  }

  return {
    isAdmin,
    products,
    toggleAdmin,
    createProduct,
    updateProduct,
    deleteProduct,
  };
});
