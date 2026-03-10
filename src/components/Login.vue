<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User name</label>
    <input type="text" required v-model="username" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr/>
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      const userData = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('AUTH_REQUEST', userData)
        .then(() => this.$router.push('/'))
        .catch((error) => {
          alert('Ошибка входа. Проверьте логин и пароль.');
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
</style>