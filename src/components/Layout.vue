<template>
  <div id="layout">
    <div id="navbarBox">
      <NavbarComponent />
    </div>
    <div id="bodyBox">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import NavbarComponent from './Navbar.vue'

export default {
  name: 'LayoutComponent',
  components: {
    NavbarComponent
  }
}
</script>

<style lang="scss">
  $navHeight: 100px;
  #Layout {
    width: 100%;
    height: 100vh;
    overflow-y: overlay;
    #NavbarBox {
      height: $navHeight;
      top :0;
      z-index: 10;
    }
    #bodyBox {
      height: calc(100vh - (#{$navHeight}));
      overflow-y: auto;
    }
  }
</style>
