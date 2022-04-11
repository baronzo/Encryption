<template>
  <div id="Mono">
    <div id="title">Monoalphabetic Substitution Cipher</div>
    <div id="monoBox">
      <div id="inOutPutBox">
        <div id="keyBox">
          <div id="keyHeader">Key</div>
          <div id="keyInputBox">
            <textarea id="keyInput" type="text" v-model="keyInput"/>
          </div>
          <div id="genBox"><div id="genKey">Generate Key</div></div>
        </div>
        <div id="messageBox">
          <div id="pHeader">Plain Text</div>
          <div id="pInputBox">
            <textarea id="pInput" type="text" v-model="messageInput"/>
          </div>
          <div id="swapBox"><div id="swap"><i id="iSwap" class="fas fa-arrows-alt-v"></i></div></div>
          <div id="cHeader">Encoded</div>
          <div id="cValueBox">
            <textarea id="cInput" type="text" v-model="encryptInput"/>
          </div>
          <div id="buttonBox">
            <div id="buttonMono" @click="selectMode()" v-if="mode">Encrypt</div>
            <div id="buttonMono" @click="selectMode()" v-if="!mode">Decrypt</div>
          </div>
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
      mode: true,
      keyInput: "",
      messageInput: "",
      encryptInput: "",
      alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    };
  },
  methods: {
    selectMode() {
      if (this.mode) {
        this.encrypt();
      } else {
        this.decrypt();
      }
    },
    encrypt() {
      this.messageInput = this.messageInput.toUpperCase();
      this.keyInput = this.keyInput.toUpperCase();
      console.log(this.alpha);
      console.log(this.messageInput);
      console.log(this.keyInput);
      let answer = "";
      for (let i = 0; i < this.messageInput.length; i++) {
        console.log(this.alpha.indexOf(this.keyInput[i]));
        if (this.messageInput[i] == " ") {
          answer += " ";
        } else {
          answer += this.alpha[(this.alpha.indexOf(this.messageInput[i]) + this.alpha.indexOf(this.keyInput[i])) % 26];
        }
      }
      this.encryptInput = answer;
    },
    decrypt() {
      this.encryptInput = this.encryptInput.toUpperCase();
      //this.messageInput = this.messageInput.toUpperCase();
      this.keyInput = this.keyInput.toUpperCase();
      let answer = "";
      /*for (let i = 0; i < this.messageInput.length; i++) {
        console.log(this.alpha.indexOf(this.keyInput[i]));
        if (this.messageInput[i] == " ") {
          answer += " ";
        } else {
          if (this.alpha.indexOf(this.messageInput[i]) - this.alpha.indexOf(this.keyInput[i]) < 0) {
            answer += this.alpha[(this.alpha.indexOf(this.messageInput[i]) - this.alpha.indexOf(this.keyInput[i])) + 26];
          } else {
            answer += this.alpha[(this.alpha.indexOf(this.messageInput[i]) - this.alpha.indexOf(this.keyInput[i])) % 26];
          }
        }
      }*/
      for (let i = 0; i < this.encryptInput.length; i++) {
        console.log(this.alpha.indexOf(this.keyInput[i]));
        if (this.encryptInput[i] == " ") {
          answer += " ";
        } else {
          if (this.alpha.indexOf(this.encryptInput[i]) - this.alpha.indexOf(this.keyInput[i]) < 0) {
            answer += this.alpha[(this.alpha.indexOf(this.encryptInput[i]) - this.alpha.indexOf(this.keyInput[i])) + 26];
          } else {
            answer += this.alpha[(this.alpha.indexOf(this.encryptInput[i]) - this.alpha.indexOf(this.keyInput[i])) % 26];
          }
        }
      }
      //this.encryptInput = answer;
      this.messageInput = answer;
    },
  },
});
</script>

<style scoped lang="scss">
@import "../style/Monoalphabetic.scss";
</style>
