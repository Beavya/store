<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">Internet Shop</router-link>
      
      <div class="nav-links">
        <template v-if="isAuthenticated">
          <router-link to="/">Главная</router-link>
          <button @click="logout" class="logout-btn">Выйти</button>
        </template>
        <template v-else>
          <router-link to="/login">Вход</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH_LOGOUT')
        .then(() => {
          this.$router.push('/login');
        })
        .catch(() => {
          this.$router.push('/login');
        });
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #42b983;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}

.logout-btn {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-btn:hover {
  background: white;
  color: #42b983;
}
</style>