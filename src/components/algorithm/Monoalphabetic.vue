<template>
  <div id="Mono">
    <div id="title">Monoalphabetic Substitution Cipher</div>
    <div id="monoBox">
      <div id="inOutPutBox">
        <div id="keyBox">
          <div id="keyHeader">Key</div>
          <div id="keyInputBox">
            <textarea
              id="keyInput"
              type="text"
              v-model="keyInput"
              maxlength="26"
            />
          </div>
          <div id="genBox">
            <div id="genKey" @click="generateKey()">Generate Key</div>
          </div>
        </div>
        <div id="messageBox">
          <div id="pHeader" v-if="mode">Plain Text</div>
          <div id="pHeader" v-if="!mode">Encoded</div>
          <div id="pInputBox">
            <textarea
              id="pInput"
              type="text"
              v-model="messageInput"
            />
          </div>
          <div id="swapBox">
            <div id="swap" class="swapIcon" @click="changeMode()">
              <i id="iSwap" class="fas fa-arrows-alt-v"></i>
              <i id="iSwap" class="fas fa-arrow-down"></i>
            </div>
          </div>
          <div id="cHeader" v-if="mode">Encoded</div>
          <div id="cHeader" v-if="!mode">Plain Text</div>
          <div id="cValueBox">
            <textarea
              id="cInput"
              type="text"
              v-model="encryptInput"
              :disabled="true"
            />
          </div>
          <div id="buttonBox">
            <div class="button-mono" @click=" keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z\s]*$/) ? null : selectMode()" v-if="mode"
                :class="{disable: keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z\s]*$/)}">Encrypt</div>
            <div class="button-mono" @click=" keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z\s]*$/) ? null : selectMode()" v-if="!mode"
                :class="{disable: keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z\s]*$/)}">Decrypt</div>
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
      let message = this.messageInput.toUpperCase();
      let key = this.keyInput.toUpperCase();
      if (this.checkKey(key, message))
      {
        return;
      }
      let answer = "";
      for (let i = 0; i < message.length; i++) {
        if (message[i] == " ") {
          answer += " ";
        } else {
          answer += this.alpha[(this.alpha.indexOf(message[i]) + this.alpha.indexOf(key[i])) % 26];
        }
      }
      this.encryptInput = this.checkUpperLowerCase(answer);
    },
    decrypt() {
      let message = this.messageInput.toUpperCase();
      let key = this.keyInput.toUpperCase();
      if (this.checkKey(key, message))
      {
        return;
      }
      let answer = "";
      for (let i = 0; i < message.length; i++) {
        if (message[i] == " ") {
          answer += " ";
        } else {
          if (this.alpha.indexOf(message[i]) - this.alpha.indexOf(key[i]) < 0)
          {
            answer += this.alpha[this.alpha.indexOf(message[i]) - this.alpha.indexOf(key[i]) + 26];
          } else {
            answer +=this.alpha[this.alpha.indexOf(message[i]) - (this.alpha.indexOf(key[i]) % 26)];
          }
        }
      }
      this.encryptInput = this.checkUpperLowerCase(answer);
    },
    changeMode() {
      this.mode = !this.mode;
      let first, second;
      first = this.messageInput;
      second = this.encryptInput;
      this.messageInput = second;
      this.encryptInput = first;
    },
    generateKey() {
      let key = "";
      while (key.length < 26) {
        let rndInt = Math.random() * 26 + 1;
        rndInt = parseInt(String(rndInt));
        if (key.includes(this.alpha[rndInt - 1])) {
          continue;
        } else {
          key += this.alpha[rndInt - 1];
        }
      }
      this.keyInput = key;
    },
    checkUpperLowerCase(str:String) {
      let text = [];
      let message = this.messageInput;
      const isUpperCase = (str:String) => str === str.toUpperCase();
      for (let i = 0; i < message.length; i++) {
        if (message[i] == " ") {
          text.push(" ");
        } else {
          isUpperCase(message[i]) ? text.push(str[i].toUpperCase()) : text.push(str[i].toLowerCase());
        }
      }
      return text.join("");
    },
    checkKey(key:String, message:String) {
      if (key.length != 26) {
        alert("Key must contain 26 letters");
        return true;
      }
      if (key.match(/[^A-Z]/)) {
        alert("Key must contain only letters");
        return true;
      }
      for (let i = 0; i < message.length; i++) {
        if (key[i] == this.alpha[i]) {
          alert("Key must not same position as alphabet");
          return true;
        }
      }
      return false;
    }
  },
});
</script>

<style lang="scss">
@import "../style/Monoalphabetic.scss";
</style>
