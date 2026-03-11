<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    
    <div v-if="loading" class="loading">Загрузка...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="products-grid">
      <ProductCard 
        v-for="product in products" 
        :key="product.id"
        :product="product"
      />
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
      loading: true,
      error: ''
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      productsRequest()
        .then((data) => {
          this.products = data
          this.loading = false
        })
        .catch((error) => {
          this.error = 'Ошибка загрузки товаров'
          this.loading = false
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.home h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}

.error {
  color: #ff4444;
}
</style>