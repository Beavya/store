<template>
  <div class="home">
    <div v-if="message" class="message success">
      {{ message }}
    </div>
    
    <h1>Каталог товаров</h1>
    
    <div class="products">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @product-added="showMessage"/>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { productsRequest } from '@/utils/api'

export default {
  name: 'HomeView',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      message: ''
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      productsRequest()
        .then((data) => {
          this.products = data
        });
    },
    showMessage(text) {
      this.message = text;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.message.success {
  background-color: #42b983;
  color: white;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  max-width: 1060px;
  text-align: center;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1060px;
}
</style>