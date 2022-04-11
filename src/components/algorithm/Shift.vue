<template>
  <div id="Mono">
    <div id="title">Monoalphabetic Substitution Cipher</div>
    <div id="changeMode">
      <div id="mode" v-if="mode" @click="mode = !mode">Encoded</div>
      <div id="mode" v-if="!mode" @click="mode = !mode">Decoded</div>
    </div>
    <div id="monoBox">
      <div id="keyBox">
        <div id="keyHeader">Key</div>
        <div id="keyInputBox">
          <textarea id="keyInput" type="text" maxlength="26" v-model="keyInput"/>
        </div>
      </div>
      <div id="messageBox">
        <div id="pHeader">PText</div>
        <div id="pInputBox">
          <textarea id="pInput" type="text" v-model="messageInput" />
        </div>
        <div id="cHeader" v-if="mode">Decoded</div>
        <div id="cHeader" v-if="!mode">Encoded</div>
        <div id="cValueBox">
          <div id="cValue"></div>
        </div>
        <div id="buttonBox">Done</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  alpha: "abcdefghijklmnopqrstuvwxyz",
  name: "MonoComponent",
  data() {
    return {
      mode: false,
      keyInput: "",
      messageInput: "",
    };
  },
  method: {
    encrypt() {
      
    },
  }
};
</script>

<style lang="scss">

</style>
