<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    
    <div class="products-grid">
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
      products: []
    }
  },
  created() {
    productsRequest()
      .then((data) => {
        this.products = data
      });
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
</style>