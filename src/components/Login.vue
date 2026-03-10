<template>
  <form class="login" @submit.prevent="login">
    <h1>Авторизация</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <label>Email</label>
    <input type="email" required v-model="email" />
    <label>Пароль</label>
    <input type="password" required v-model="password" />
    <hr/>
    <button type="submit">Войти</button>
    
    <p class="register-link">
      Нет аккаунта? <router-link to="/register">Регистрация</router-link>
    </p>
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
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.login h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.login label {
  display: block;
  margin: 10px 0 5px;
  color: #666;
}

.login input {
  width: 90%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login hr {
  margin: 15px 0;
  border: none;
  border-top: 1px solid #eee;
}

.login button {
  width: 90%;
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login button:hover {
  background: #3aa876;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
}

.error-message {
  background-color: #ff4444;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
}
</style>