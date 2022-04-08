<template>
  <div id="navbar">
    <div class="logo">
      <img class="logo-image" src="../assets/jwt-3.svg" alt="">
      <p class="text">
        <router-link class="link" to="/">Encryption</router-link>
      </p>
    </div>
    <div class="menu">
      <div class="sub-menu">
        <router-link class="link" to="/shift">Shift</router-link>
      </div>
      <div class="sub-menu">
        <router-link class="link" to="/mono">Monoalphabetic</router-link>
      </div>
      <div class="sub-menu">
        <router-link class="link" to="/vigenere">Vigenere</router-link>
      </div>
      <div class="sub-menu">
        <router-link class="link" to="/rsa">RSA</router-link>
      </div>
    </div>
    <div class="craft">Craft by Jill</div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'NavbarComponent'
}
</script>

<style lang="scss">
  #navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    width: 100%;
    height: 100px;
    background-color: black;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      .logo-image {
        width: 50px;
        height: 50px;
      }
      .text {
        color: #fff;
        font-size: 32px;
        margin-left: 18px;
        .link {
          color: #fff;
          cursor: pointer;
          text-decoration: none;
        }
      }
    }
    .menu {
      display: flex;
      margin-right: 30px;
      .sub-menu {
        color: rgb(126, 124, 124);
        margin-right: 24px;
        font-weight: bold;
        .link {
          color: rgb(126, 124, 124);
          cursor: pointer;
          text-decoration: none;
          &:hover {
            color: white;
          }
        }
      }
    }
    .craft {
      color: #fff;
      font-size: 20px;
      margin-right: 20px
    }
  }
  router-link {
    color: white;
  }
</style>