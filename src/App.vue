<template>
  <div id="app">
    <NotificationProvider>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/form">Form Validation</router-link> |
        <router-link to="/posts">Paginated Posts</router-link> |
        <router-link to="/images">Infinite Images</router-link> |
        <router-link to="/upload">Upload Dropzone</router-link>
      </div>
      <router-view />
    </NotificationProvider>
  </div>
</template>

<script>
import { NotificationProvider } from './store'
export default {
  name: 'App',
  components: {
    NotificationProvider,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 10px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
