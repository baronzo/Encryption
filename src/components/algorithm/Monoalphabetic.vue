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
              @keyup="checkMessage(keyInput)"
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
              maxlength="26"
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
            <div id="buttonMono" @click="selectMode()" v-if="mode">Encrypt</div>
            <div id="buttonMono" @click="selectMode()" v-if="!mode">
              Decrypt
            </div>
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
      let answer = "";
      for (let i = 0; i < this.messageInput.length; i++) {
        if (this.messageInput[i] == " ") {
          answer += " ";
        } else {
          answer +=
            this.alpha[
              (this.alpha.indexOf(this.messageInput[i]) +
                this.alpha.indexOf(this.keyInput[i])) %
                26
            ];
        }
      }
      this.encryptInput = answer;
    },
    decrypt() {
      this.messageInput = this.messageInput.toUpperCase();
      this.keyInput = this.keyInput.toUpperCase();
      let answer = "";
      for (let i = 0; i < this.messageInput.length; i++) {
        if (this.messageInput[i] == " ") {
          answer += " ";
        } else {
          if (
            this.alpha.indexOf(this.messageInput[i]) -
              this.alpha.indexOf(this.keyInput[i]) <
            0
          ) {
            answer +=
              this.alpha[
                this.alpha.indexOf(this.messageInput[i]) -
                  this.alpha.indexOf(this.keyInput[i]) +
                  26
              ];
          } else {
            answer +=
              this.alpha[
                this.alpha.indexOf(this.messageInput[i]) -
                  (this.alpha.indexOf(this.keyInput[i]) % 26)
              ];
          }
        }
      }
      this.encryptInput = answer;
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
      let message = this.messageInput.replace(/\s/g, "");
      while (key.length < message.length) {
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
    checkMessage(key:string) {
      let message = this.messageInput.replace(/\s/g, "");
      if (key.length > message.length) {
        this.keyInput = key.substring(0, key.length - 1);
      }
    },
  },
});
</script>

<style lang="scss">
@import "../style/Monoalphabetic.scss";
</style>
