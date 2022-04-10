<template>
  <div id="Mono">
    <div id="title">Shift Cipher</div>
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
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ShiftComponent',
  mounted() {
    this.cal()
  },
  data() {
    return {
      test: 1
    }
  },
  methods: {
    cal() {
      const vm = this
      let num = 1
      console.log(vm.test + num)
    }
  },
})
</script>

<style lang="scss" scope>
#Mono {
  width: 100%;
  height: calc(100vh - 120px);
  margin-top: 10px;
  #title {
    font-size: 2em;
    font-weight: bold;
    margin-top: 0;
    display: flex;
    justify-content: center;
  }
  #changeMode {
    width: 82.25%;
    #mode {
      font-size: 1.5em;
      color: #818181;
      cursor: pointer;
      margin-left: 95%;
      &:hover {
        text-decoration: underline;
      }
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
  }
  #monoBox {
    display: flex;
    margin: 0 0 0 10%;
    width: 75%;
    #keyBox {
      width: 45%;
      #keyHeader {
        font-size: 1.2em;
        padding: 10px;
        border-top: 1px solid rgb(0, 0, 0, 0.25);
        border-left: 1px solid rgb(0, 0, 0, 0.25);
        border-right: 1px solid rgb(0, 0, 0, 0.25);
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
      }
      #keyInputBox {
        border: 1px solid rgb(0, 0, 0, 0.25);
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        height: 293.25%;
        #keyInput {
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          padding: 10px 0 0 10px;
          font-size: 1.75em;
        }
      }
    }
    #messageBox {
      margin-left: 2.5%;
      width: 50%;
      #pHeader {
        font-size: 1.2em;
        padding: 10px;
        border-top: 1px solid rgb(0, 0, 0, 0.25);
        border-left: 1px solid rgb(0, 0, 0, 0.25);
        border-right: 1px solid rgb(0, 0, 0, 0.25);
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
      }
      #pInputBox {
        border: 1px solid rgb(0, 0, 0, 0.25);
        border-bottom: none;
        height: 120%;
        #pInput {
          border: none;
          width: 100%;
          height: 100%;
          outline: none;
          padding: 10px 0 0 10px;
          font-size: 1.75em;
        }
      }
      #cHeader {
        font-size: 1.2em;
        padding: 10px;
        border-top: 1px solid rgb(0, 0, 0, 0.25);
        border-left: 1px solid rgb(0, 0, 0, 0.25);
        border-right: 1px solid rgb(0, 0, 0, 0.25);
      }
      #cValueBox {
        height: 120%;
        #cValue {
          border: none;
          border: 1px solid rgb(0, 0, 0, 0.25);
          border-bottom-right-radius: 3px;
          border-bottom-left-radius: 3px;
          width: 100%;
          outline: none;
          height: 100%;
          padding: 10px 0 0 10px;
          font-size: 1.75em;
        }
      }
      #buttonBox {
        height: 30%;
        margin-top: 2.5%;
        border-radius: 3px;
        font-size: 1.75em;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #5fd6fc;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
