<template>
  <form class="login" @submit.prevent="login">
    <h1>Авторизация</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div>
      <label>Email</label>
      <input type="email" required v-model="email" class="{ 'error-input': errorMessage }"/>
    </div>

    <div>
      <label>Пароль</label>
      <input type="password" required v-model="password" :class="{ 'error-input': errorMessage }"/>
    </div>
    
    <button type="submit">Войти</button>
    <button type="button" @click="$router.push('/')" class="back-btn">Назад</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    login() {
      this.errorMessage = "";
      
      const userData = {
        email: this.email,
        password: this.password
      }
      
      this.$store.dispatch('AUTH_REQUEST', userData)
        .then(() => this.$router.push('/'))
        .catch((error) => {
          this.errorMessage = 'Ошибка входа. Проверьте email и пароль.';
        });
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
}

.login h1 {
  text-align: center;
}

.login label {
  color: #666;
}

.login input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
}

.login input.error-input {
  border-color: #ff4444;
  background-color: #fff8f8;
}

.login button {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

.login button:hover {
  background: #3aa876;
}

.error-message {
  background-color: #ff4444;
  color: white;
  padding: 10px;
  text-align: center;
}

.login .back-btn {
  width: fit-content;
  padding: 5px;
  background: #666;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.login .back-btn:hover {
  background: #555;
}
</style>