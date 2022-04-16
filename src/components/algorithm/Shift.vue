<template>
  <div id="shift">
    <div id="title">Shift Cipher</div>
    <div id="shiftBox">
      <div id="inOutPutBox">
        <div id="keyBox">
          <div id="keyHeader">Key</div>
          <div id="keyInputBox">
            <input
              id="keyInput"
              type="number"
              v-model="keyInput"
              minlength="1"
              maxlength="25"
              required
            />
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
            <div class="button-shift" @click=" keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z]*$/) ? null : selectMode()" v-if="mode" 
                :class="{disable: keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z]*$/)}">Encrypt</div>
            <div class="button-shift" @click=" keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z]*$/) ? null : selectMode()" v-if="!mode"
                :class="{disable: keyInput == '' || messageInput == '' || !messageInput.match(/^[a-zA-Z]*$/)}">
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
  name: "ShiftComponent",
  data() {
    return {
      mode: true,
      keyInput: 0 as Number,
      messageInput: "",
      encryptInput: "",
      // alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      alpha: "abcdefghijklmnopqrstuvwxyz"
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
      let message = this.messageInput
      if(!message.match(/^[a-zA-Z]*$/)) {
        message = ''
      }
      let keyNumber = Number(this.keyInput);
      if(keyNumber < 0) {
        keyNumber = 0
      }
      let answer = "";
      for (let index = 0; index < message.length; index++) {
          if (this.messageInput[index] == " ") {
          answer += " ";
        }
         else {
          answer += this.alpha[(this.alpha.indexOf(message[index]) + keyNumber) % 26];
        }
      }
      this.encryptInput = answer; 
    },
    decrypt() {
      let message = this.messageInput
      let keyNumber = Number(this.keyInput);
      let answer = "";
      for (let index = 0; index < message.length; index++) {
          if (this.messageInput[index] == " ") {
          answer += " ";
        } else {
          if (this.alpha.indexOf(message[index]) - keyNumber < 0) {
          answer += this.alpha[(this.alpha.indexOf(message[index]) - keyNumber) + 26];  
          }else {
            answer += this.alpha[(this.alpha.indexOf(message[index]) - keyNumber)];
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
  },
});
</script>

<style lang="scss">
@import "../style/Shift.scss";
</style>
