<template>
  <div class="product-card">
    <img :src="'http://lifestealer86.ru/' + product.image" alt="">
    <h3>{{ product.name }}</h3>
    <p class="description">{{ product.description }}</p>
    <p class="price">{{ product.price }} ₽</p>
    <button 
      v-if="isAuthenticated" 
      @click="addToCart"
      class="add-to-cart-btn"
    >
      В корзину
    </button>
  </div>
</template>

<script>
import { addToCartRequest } from '@/utils/api'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    addToCart() {
      const token = this.$store.state.token;
      addToCartRequest(this.product.id, token);
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 250px;
  border: 1px solid #ddd;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product-card h3 {
  color: #333;
  font-size: 18px;
}

.description {
  color: #666;
  font-size: 15px;
  flex-grow: 1;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #42b983;
  margin: 10px 0 0 0;
}

.add-to-cart-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
}

.add-to-cart-btn:hover {
  background-color: #3aa876;
}
</style>