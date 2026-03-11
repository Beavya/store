<template>
  <div class="cart">
    <h1>Корзина</h1>
    
    <div v-if="groupedItems.length === 0" class="empty-cart">
      Корзина пуста
    </div>
    
    <div v-else class="cart-items">
      <div v-for="group in groupedItems" :key="group.product_id" class="cart-item">
        <img :src="'http://lifestealer86.ru/' + group.image" alt="">
        <div class="item-info">
          <h3>{{ group.name }}</h3>
          <p class="description">{{ group.description }}</p>
          <p class="price">{{ group.price }} ₽</p>
          
          <div class="quantity-controls">
            <button 
              v-if="group.count > 1" 
              @click="decreaseQuantity(group)" 
              class="qty-btn"
            >−</button>
            <span class="quantity">{{ group.count }}</span>
            <button @click="increaseQuantity(group)" class="qty-btn">+</button>
            <button @click="removeGroup(group)" class="remove-btn">Удалить</button>
          </div>
        </div>
      </div>
      
      <div class="cart-total">
        <strong>Итого:</strong> {{ totalPrice }} ₽
      </div>
    </div>
  </div>
</template>

<script>
import { getCartRequest, addToCartRequest, removeFromCartRequest } from '@/utils/api'

export default {
  name: 'CartView',
  data() {
    return {
      cartItems: []
    }
  },
  computed: {
    groupedItems() {
      const groups = {};
      this.cartItems.forEach(item => {
        const productId = item.product_id;
        if (!groups[productId]) {
          groups[productId] = {
            product_id: productId,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            count: 0,
            cartIds: []
          };
        }
        groups[productId].count++;
        groups[productId].cartIds.push(item.id);
      });
      return Object.values(groups);
    },
    totalPrice() {
      return this.groupedItems.reduce((sum, group) => sum + (group.price * group.count), 0)
    }
  },
  created() {
    this.fetchCart()
  },
  methods: {
    fetchCart() {
      const token = this.$store.state.token;
      getCartRequest(token)
        .then((data) => {
          this.cartItems = data
        });
    },
    increaseQuantity(group) {
      const token = this.$store.state.token;
      addToCartRequest(group.product_id, token)
        .then(() => {
          this.fetchCart();
        });
    },
    decreaseQuantity(group) {
      const token = this.$store.state.token;
      const cartId = group.cartIds[group.cartIds.length - 1];
      removeFromCartRequest(cartId, token)
        .then(() => {
          this.fetchCart();
        });
    },
    removeGroup(group) {
      const token = this.$store.state.token;
      const promises = group.cartIds.map(cartId => 
        removeFromCartRequest(cartId, token)
      );
      Promise.all(promises)
        .then(() => {
          this.fetchCart();
        });
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.cart h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.cart-item {
  display: flex;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  background: white;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 10px;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 10px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
}

.qty-btn:hover {
  background: #f5f5f5;
}

.quantity {
  min-width: 30px;
  text-align: center;
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.remove-btn:hover {
  background: #cc0000;
}

.cart-total {
  text-align: right;
  font-size: 1.3rem;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 5px;
  margin-top: 20px;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}
</style>