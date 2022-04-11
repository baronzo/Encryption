<template>
  <div>
    <div id="vigen">
    <div id="title">Vigenere Cipher </div>
    
    <div id="vigenBox">
      <div id="inOutPutBox">
        <div id="messageBox">
          <div id="pHeader">Plain Text</div>
          <div id="pInputBox">
            <textarea
              id="pInput"
              type="text"
              maxlength=""
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
  </div>
</template>

<script lang="ts">
export default {
  name: 'VigenereComponent'
}
</script>

<style lang="scss">
  @import "../style/Vigenere.scss";
</style>
