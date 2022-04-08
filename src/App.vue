<template>
  <LayoutComponent />
</template>

<script lang="ts">
import LayoutComponent from './components/Layout.vue'


export default {
  name: 'App',
  components: {
    LayoutComponent
  }
}
</script>

<style>
* {
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap');
  font-family: 'IBM Plex Sans Thai', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
