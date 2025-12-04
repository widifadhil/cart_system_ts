<template>
  <div>
    <h2>Admin - Product Management</h2>

    <!-- Create Product Form -->
    <div class="card" style="margin-bottom: 24px;">
      <h3>Add New Product</h3>
      <form @submit.prevent="handleCreateProduct">
        <div class="form-group">
          <label for="new-name">Name</label>
          <input class="input" id="new-name" v-model="newProduct.name" type="text" required>
        </div>
        <div class="form-group">
          <label for="new-desc">Description</label>
          <textarea class="input" id="new-desc" v-model="newProduct.description"></textarea>
        </div>
        <div class="form-group">
          <label for="new-price">Price</label>
          <input class="input" id="new-price" v-model.number="newProduct.price" type="number" required>
        </div>
        <div class="form-group">
          <label>Image</label>
          <div class="file-upload-wrapper">
            <input id="new-image" type="file" @change="handleImageUpload($event, 'new')" accept="image/*" class="file-input">
            <label for="new-image" class="btn btn-ghost">Choose File</label>
            <span class="file-name">{{ newProduct.imageName || 'No file chosen' }}</span>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Create</button>
      </form>
    </div>

    <!-- Product List -->
    <h3 class="section-title">Product List</h3>

    <div class="table-wrapper">
      <table class="table modern-table">
        <thead>
          <tr>
            <th style="width: 60px;">ID</th>
            <th>Name</th>
            <th>Description</th>
            <th style="width: 140px;">Price</th>
            <th style="width: 180px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in adminStore.products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>Rp {{ formatCurrency(product.price) }}</td>
            <td class="action-cell">
              <button class="btn-table btn-edit" @click="startEditing(product)">Edit</button>
              <button class="btn-table btn-delete" @click="adminStore.deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="editingProduct" class="modal-overlay" @click.self="cancelEditing">
      <div class="modal-content">
        <h3>Edit Product</h3>
        <form @submit.prevent="handleUpdateProduct">
          <div class="form-group">
            <label :for="'edit-name-' + editingProduct.id">Name</label>
            <input class="input" :id="'edit-name-' + editingProduct.id" v-model="editingProduct.name" type="text" required>
          </div>
          <div class="form-group">
            <label :for="'edit-desc-' + editingProduct.id">Description</label>
            <textarea class="input" :id="'edit-desc-' + editingProduct.id" v-model="editingProduct.description"></textarea>
          </div>
          <div class="form-group">
            <label :for="'edit-price-' + editingProduct.id">Price</label>
            <input class="input" :id="'edit-price-' + editingProduct.id" v-model.number="editingProduct.price" type="number" required>
          </div>
          <div class="form-group">
            <label>Image</label>
            <div class="file-upload-wrapper">
              <input :id="'edit-image-' + editingProduct.id" type="file" @change="handleImageUpload($event, 'edit')" accept="image/*" class="file-input">
              <label :for="'edit-image-' + editingProduct.id" class="btn btn-ghost">Choose File</label>
              <span class="file-name">{{ editingProduct.imageName || 'No file chosen' }}</span>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Save</button>
          <button class="btn btn-ghost" @click="cancelEditing">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAdminStore } from '../stores/admin';
import type { Product } from '../types';

const adminStore = useAdminStore();
const newProduct = ref<Omit<Product, 'id'> & { imageName?: string }>({ name: '', description: '', price: 0, image: '', imageName: '' });
const editingProduct = ref<(Product & { imageName?: string }) | null>(null);


function formatCurrency(n: number) {
  return n.toLocaleString('id-ID');
}

function handleImageUpload(event: Event, type: 'new' | 'edit') {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        if (type === 'new') {
          newProduct.value.image = e.target.result;
          newProduct.value.imageName = file.name;
        } else if (editingProduct.value) {
          editingProduct.value.image = e.target.result;
          editingProduct.value.imageName = file.name;
        }
      }
    };
    reader.readAsDataURL(file);
  }
}

function handleCreateProduct() {
  const { imageName, ...productData } = newProduct.value;
  adminStore.createProduct(productData);
  newProduct.value = { name: '', description: '', price: 0, image: '', imageName: '' };
}

function startEditing(product: Product) {
  editingProduct.value = { ...product, imageName: product.image ? 'image.jpg' : '' };
}

function cancelEditing() {
  editingProduct.value = null;
}

function handleUpdateProduct() {
  if (editingProduct.value) {
    const { imageName, ...productData } = editingProduct.value;
    adminStore.updateProduct(productData);
    editingProduct.value = null;
  }
}
</script>

<style scoped>
.file-upload-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}
.file-input {
  display: none;
}
.file-name {
  color: var(--muted);
  font-size: 14px;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e6edf9;
  border-radius: 12px;
  box-shadow: var(--shadow);
}
.table { 
  width: 100%; 
  border-collapse: collapse; 
  background: white;
}
.table th, .table td { 
  padding: 12px 14px; 
  text-align: left; 
  border-bottom: 1px solid #e6edf9;
  vertical-align: middle;
}
.table th {
  background: #f9fafb;
  font-weight: 600;
  font-size: 13px;
  color: var(--muted)
}
.table tr:last-child td {
  border-bottom: none;
}
.table tr:hover {
  background: #f6f9fc;
}

.action-cell {
  display: flex;
  gap: 8px;
}
.btn-table {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
  transition: all .15s ease;
}
.btn-edit {
  border-color: #c8d4e7;
  color: #3f51b5;
  background: white;
}
.btn-edit:hover {
  background: #f1f3fa;
  transform: translateY(-1px);
}
.btn-delete {
  background: #fbebee;
  border-color: #f6cbd0;
  color: #c53030;
}
.btn-delete:hover {
  background: #f8e1e3;
  transform: translateY(-1px);
}

.section-title {
  margin-bottom: 12px;
  font-size: 20px;
}

.form-group { margin-bottom: 12px; }
.input { width: 100%; padding: 8px 10px; border-radius: 10px; border: 1px solid #e6edf9; }
textarea.input { height: 80px; }
.modal-overlay { 
  position: fixed; 
  top: 0; left: 0; right: 0; bottom: 0; 
  background: rgba(0,0,0,0.6); 
  display: flex; justify-content: center; align-items: center; 
  backdrop-filter: blur(4px);
  z-index: 100;
}
.modal-content { 
  background: white; 
  padding: 24px; 
  border-radius: 12px; 
  min-width: 450px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
</style>
