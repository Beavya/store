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
    <button type="button" @click="$router.push('/')" class="back-btn">Назад</button>
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

.error-message {
  background-color: #ff4444;
  color: white;
  padding: 10px;
  text-align: center;
}

.register .back-btn {
  width: fit-content;
  padding: 5px;
  background: #666;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.register .back-btn:hover {
  background: #555;
}
</style>