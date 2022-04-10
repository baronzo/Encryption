<template>
  <div id="Mono">
    <div id="title">Monoalphabetic Substitution Cipher</div>
    <div id="monoBox">
      <div id="inOutPutBox">
        <div id="messageBox">
          <div id="pHeader">Plain Text</div>
          <div id="pInputBox">
            <textarea
              id="pInput"
              type="text"
              maxlength="26"
              v-model="messageInput"
            />
          </div>
        </div>
        <div id="keyBox">
          <div id="keyHeader">Key</div>
          <div id="keyInputBox">
            <textarea id="keyInput" type="text" v-model="keyInput" />
          </div>
          <div id="cHeader" v-if="mode">Decoded</div>
          <div id="cHeader" v-if="!mode">Encoded</div>
          <div id="cValueBox">
            <textarea id="cInput" type="text" v-model="encryptInput" />
          </div>
          <div id="buttonBox" @click="encrypt">Encrypt</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MonoComponent",
  data() {
    return {
      mode: false,
      keyInput: "",
      messageInput: "",
      encryptInput: "",
      alpha: "abcdefghijklmnopqrstuvwxyz"
    };
  },
  methods: {
    encrypt() {
    },
  },
});
</script>

<style scoped lang="scss">
  @import "../style/Monoalphabetic.scss";
</style>
