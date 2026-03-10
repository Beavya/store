<template>
  <form class="register" @submit.prevent="register">
    <h1>Регистрация</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div class="criteria-box">
      <p class="criteria-title">Требования к регистрации:</p>
      <ul class="criteria-list">
        <li>• Email должен быть уникальным</li>
        <li>• Пароль должен содержать минимум 6 символов</li>
        <li>• Все поля обязательны для заполнения</li>
      </ul>
    </div>
    
    <label>ФИО</label>
    <input type="text" required v-model="fio" />
    
    <label>Email</label>
    <input type="email" required v-model="email" />
    
    <label>Пароль</label>
    <input type="password" required v-model="password" />
    
    <hr/>
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
          this.$store.commit('AUTH_SUCCESS', token);
          localStorage.setItem('myAppToken', token);
          this.$router.push('/');
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
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.register h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.criteria-box {
  background-color: #f8f9fa;
  border-left: 4px solid #42b983;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.criteria-title {
  font-weight: bold;
  color: #42b983;
  margin-bottom: 5px;
}

.criteria-list {
  list-style: none;
  color: #666;
  font-size: 13px;
}

.criteria-list li {
  margin: 3px 0;
}

.register label {
  display: block;
  margin: 10px 0 5px;
  color: #666;
}

.register input {
  width: 90%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.register hr {
  margin: 15px 0;
  border: none;
  border-top: 1px solid #eee;
}

.register button {
  width: 90%;
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register button:hover {
  background: #3aa876;
}

.login-link {
  text-align: center;
  margin-top: 15px;
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
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
}
</style>