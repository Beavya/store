<template>
  <form class="register" @submit.prevent="register">
    <h1>Регистрация</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <ul class="criteria-list">
      <li>Email должен быть уникальным</li>
      <li>Пароль должен содержать минимум 6 символов</li>
      <li>Все поля обязательны для заполнения</li>
    </ul>

    <div>
      <label>ФИО</label>
      <input type="text" required v-model="fio" />
    </div>

    <div>
      <label>Email</label>
      <input type="email" required v-model="email" />
    </div>

    <div>
      <label>Пароль</label>
      <input type="password" required v-model="password" />
    </div>
    
    <button type="submit">Зарегистрироваться</button>
    
    <p class="login-link">
      Уже есть аккаунт? <router-link to="/login">Войти</router-link>
    </p>
  </form>
</template>

<script>
import { signupRequest } from '@/utils/api'

export default {
  data() {
    return {
      fio: "",
      email: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    register() {
      this.errorMessage = "";
      
      const userData = {
        fio: this.fio,
        email: this.email,
        password: this.password
      }
      
      signupRequest(userData)
        .then((token) => {
          this.$router.push('/login');
        })
        .catch((error) => {
          this.errorMessage = 'Ошибка регистрации. Проверьте требования ниже.';
        });
    }
  }
}
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
}

.register h1 {
  text-align: center;
}

.criteria-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  font-size: 13px;
  background-color: #f8f9fa;
  padding: 10px 25px;
}

.register label {
  color: #666;
}

.register input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
}

.register button {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

.register button:hover {
  background: #3aa876;
}

.login-link {
  text-align: center;
  font-size: 14px;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
}

.error-message {
  background-color: #ff4444;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>