<template>
  <div class="cart">
    <h1>Корзина</h1>
    
    <div v-if="message.text" class="message success">
      {{ message.text }}
    </div>
    
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
            <button v-if="group.count > 1" @click="decreaseQuantity(group)" class="qty-btn">−</button>
            <span>{{ group.count }}</span>
            <button @click="increaseQuantity(group)" class="qty-btn">+</button>
            <button @click="removeGroup(group)" class="remove-btn">Удалить</button>
          </div>
        </div>
      </div>
      
      <div class="cart-total">
        <b>Итого: {{ totalPrice }} ₽ </b>
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
      cartItems: [],
      message: { text: '' }
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
    showMessage(text) {
      this.message.text = text;
      setTimeout(() => {
        this.message.text = '';
      }, 3000);
    },
    increaseQuantity(group) {
      const token = this.$store.state.token;
      addToCartRequest(group.product_id, token)
        .then(() => {
          this.showMessage('Товар добавлен в корзину');
          this.fetchCart();
        });
    },
    decreaseQuantity(group) {
      const token = this.$store.state.token;
      const cartId = group.cartIds[group.cartIds.length - 1];
      removeFromCartRequest(cartId, token)
        .then(() => {
          this.showMessage('Товар удален из корзины');
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
          this.showMessage('Товар удален из корзины');
          this.fetchCart();
        });
    }
  }
}
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.message.success {
  background-color: #42b983;
  color: white;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  text-align: center;
}

.cart-item {
  display: flex;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.description {
  color: #666;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #42b983;
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
  cursor: pointer;
  font-size: 18px;
}

.qty-btn:hover {
  background: #f5f5f5;
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #cc0000;
}

.cart-items{
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-total {
  text-align: right;
  font-size: 18px;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
}
</style>