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
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  flex-grow: 1;
  margin-bottom: 10px;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #42b983;
  margin: 10px 0;
}

.add-to-cart-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.add-to-cart-btn:hover {
  background-color: #3aa876;
}
</style>