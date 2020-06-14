<template>
  <div id="app">
    <input v-model="email">
    <input v-yvuex:email="yCommit">
    <input v-yvuex:user.email="yCommit">
    <input v-yvuex:user.email="yCommit">
    <select v-yvuex:user.color="yCommit">
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="Green">Green</option>
    </select>
    <input v-yvuex:user.color="yCommit">
    <textarea v-yvuex:user.job="yCommit"></textarea>
    {{ this.$store.state.user.job }}
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    email: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('set', {
          attribute: 'email',
          value
        })
      }
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
