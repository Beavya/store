<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    
    <div class="products">
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
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.home h1 {
  text-align: center;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1060px;
}
</style>