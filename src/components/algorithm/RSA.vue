<template>
  <div id="rsa">
    <div id="title">RSA</div>
    <div id="box">
      <div class="inside-box">
        <div class="box-title">Public Key</div>
        <div class="input-box">
            <textarea
                id="input"
                type="text"
                maxlength="26"
                v-model="publicKey"
            />
        </div>
        <div class="box-title">Private Key</div>
        <div class="input-box">
            <textarea
                id="input"
                type="text"
                maxlength="26"
                v-model="privateKey"
            />
        </div>
        <div class="button">Generate Key Pair</div>
      </div>
      <div class="inside-box">
        <div class="box-title">Plain Text</div>
        <div class="input-box">
            <textarea
                id="input"
                type="text"
                maxlength="26"
                v-model="plainText"
            />
        </div>
        <div class="box-title">encoded</div>
        <div class="input-box">
            <textarea
                id="input"
                type="text"
                maxlength="26"
                v-model="encoded"
            />
        </div>
        <div @click="greeting" class="button">Encrypt</div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      privateKey: "",
      publicKey: "",
      plainText: "",
      encoded: "",
      count: 0
    }
  }
}
</script>

<style lang="scss">
 @import "../style/RSA";
</style>
