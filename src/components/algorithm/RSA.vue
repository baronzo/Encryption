<template>
  <div id="rsa">
    <div id="title">RSA</div>
    <div id="box">
      <div class="inside-box-left">
        <div class="box-title">Public Key</div>
        <div class="input-box">
            <textarea
                readonly
                id="input"
                type="text"
                v-model="pb_key"
            />
        </div>
        <div class="box-title">Private Key</div>
        <div class="input-box">
            <textarea
                readonly
                id="input"
                type="text"
                v-model="pv_key"
            />
        </div>
        <div class="button" @click="genKey" >Generate Key Pair</div>
      </div>
      <div class="inside-box-right">
        <div v-if="!isEncryptMode" class="box-title">Encoded Text</div>
        <div v-if="isEncryptMode" class="box-title">Plain Text</div>
        <div v-if="!isEncryptMode" class="input-box">
            <textarea
                id="input"
                type="text"
                v-model="decrypt_cypher_text"
            />
        </div>
        <div v-if="isEncryptMode" class="input-box">
            <textarea
                id="input"
                type="text"
                v-model="plantext"
            />
        </div>
        <div class="button-area">
          <div @click="switchMode" class="swapIcon" id="button-swap">
            <i id="i-swap" class="fas fa-arrows-alt-v"></i>
            <i id="i-swap" class="fas fa-arrow-down"></i>
          </div>
        </div>
        <div v-if="isEncryptMode" class="box-title">Encoded Text</div>
        <div v-if="!isEncryptMode" class="box-title">Plain Text</div>
        <div v-if="isEncryptMode" class="input-box">
            <textarea
                id="input"
                type="text"
                v-model="cyber_text"
            />
        </div>
        <div v-if="!isEncryptMode" class="input-box">
            <textarea
                id="input"
                type="text"
                v-model="decrypted_text"
            />
        </div>
        <div v-if="isEncryptMode" @click="encrypt"  class="button">Encrypt</div>
        <div v-if="!isEncryptMode" @click="decrypt"  class="button">Decrypt</div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent ({
  data() {
    return {
      isEncryptMode: true as boolean,
      activeMenu: 'btn1' as String,
      asciiArray: [] as Array<bigint>,
      plantext: "" as String,
      p: 0 as number,
      q: 0 as number,
      n: 0 as number,
      phi: 0 as number,
      e: 0 as number,
      d: 0n as bigint,
      primes: [] as Array<number>,
      pb_key: "" as string,
      pv_key: "" as string,
      cypher_arr: [] as Array<string>,
      decrypt_text_arr: [] as Array<string>,
      cyber_text: "" as string,
      decrypted_text: "" as string,
      pbkeytoencrypt: [] as Array<string>,
      pvkeytodecrypt: [] as Array<string>,
      copy_btn_Text_encrypt: "Click to copy" as string,
      copy_btn_Text_decrypt: "Click to copy" as string,
      click_copy_pvkey_txt: "Click to copy" as string,
      click_copy_pbkey_txt: "Click to copy" as string,
      decrypt_cypher_text: "" as string,
      decrypt_pvkey_text: "" as string
    }
  },


  methods: {
    switchMode(){
      this.isEncryptMode = !this.isEncryptMode
    },

    genKey() {
      const startRandom = Math.floor( Math.random() * (100000000)) + 1
      this.getPrimes(startRandom, startRandom+5000)
      this.selectRandomPQ()
      this.find_n()
      this.find_phi()
      this.find_e()
      this.d = this.modInverse(BigInt(this.e), BigInt(this.phi))
      this.find_Public()
      this.find_Private()
      this.decrypt_pvkey_text = this.pv_key
    },

    downloadTxt(format: string, text: string) {
      if (text != '') {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', format);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
      }
    },

    click_copy_btn_encrypt(copyData: string) {
      navigator.clipboard.writeText(copyData);
      this.copy_btn_Text_encrypt = "\xa0\xa0\xa0 Copied !!\xa0\xa0\xa0"
      setTimeout(() => {
        this.copy_btn_Text_encrypt = "Click to copy"
      },1500)
    },

    click_copy_pvkey(copyData: string) {
      navigator.clipboard.writeText(copyData);
      this.click_copy_pvkey_txt = "\xa0\xa0\xa0\xa0\xa0\xa0 Copied !!"
      setTimeout(() => {
        this.click_copy_pvkey_txt = "Click to copy"
      },1500)
    },

    click_copy_pbkey(copyData: string) {
      navigator.clipboard.writeText(copyData);
      this.click_copy_pbkey_txt = "\xa0\xa0\xa0\xa0\xa0\xa0 Copied !!"
      setTimeout(() => {
        this.click_copy_pbkey_txt = "Click to copy"
      },1500)
    },

    click_copy_btn_decrypt(copyData: string) {
      navigator.clipboard.writeText(copyData);
      this.copy_btn_Text_decrypt = "\xa0\xa0\xa0 Copied !!\xa0\xa0\xa0"
      setTimeout(() => {
        this.copy_btn_Text_decrypt = "Click to copy"
      },1500)
    },

    clickCopy(copyData: string) {
      navigator.clipboard.writeText(copyData);
    },

    encrypt() {
      this.plainTextToAscii(this.plantext)
      this.readPbKey()
      this.cypher_arr = []
      this.asciiArray.forEach(ascii =>
          this.cypher_arr.push((this.find_cyberText(BigInt(ascii), BigInt(this.pbkeytoencrypt[0]), BigInt(this.pbkeytoencrypt[1]))).toString()),
      )
      this.cyber_text = btoa((this.cypher_arr).toString())
      this.decrypt_cypher_text = this.cyber_text
      let history = {
        'Algorithm': 'RSA',
        'data': {
          'Input': this.plantext,
          'Output': this.cyber_text,
          'Public Key': this.pb_key,
          'Private Key': this.pv_key
        }
      }
      this.addDataToHistory(history)
    },

    clear_plaintext() {
      this.plantext = ""
    },

    decrypt() {
      this.readPvKey()
      this.map_cyber_text_for_decrypt()
      this.decrypted_text = ""
      this.decrypt_text_arr.forEach(de =>
          this.decrypted_text += String.fromCharCode(Number(this.find_cyberText(BigInt(de), BigInt(this.pvkeytodecrypt[0]), BigInt(this.pvkeytodecrypt[1])))),
      )
      let history = {
        'Algorithm': 'RSA',
        'data': {
          'Input': this.decrypt_cypher_text,
          'Output': this.decrypted_text,
          'Private Key': this.decrypt_pvkey_text
        }
      }
      this.addDataToHistory(history)
    },

    map_cyber_text_for_decrypt() {

      this.decrypt_text_arr = atob(this.decrypt_cypher_text).split(",")
    },

    find_cyberText(m: bigint, e: bigint, n: bigint): bigint {
      if (e == 0n) {
        return 1n
      }
      else if (e%2n == 0n) {
        var d: bigint
        d = this.find_cyberText(m, e/2n, n)
        return (d*d)%n
      } else {
        return ((m%n)*this.find_cyberText(m, e - 1n, n))%n
      }
    },

    clear_encrypted() {
      this.decrypt_cypher_text = ""
    },

    readPbKey() {
      this.pbkeytoencrypt = atob(this.pb_key).split(" ")
    },

    readPvKey() {
      this.pvkeytodecrypt = atob(this.decrypt_pvkey_text).split(" ")
    },

    find_Public() {
      this.pb_key = btoa(this.e + " " + this.n)
    },

    find_Private() {
      this.pv_key = btoa(this.d + " " + this.n)
    },

    modInverse(a: bigint, m: bigint): bigint {
      // validate inputs
      [a, m] = [BigInt(a), BigInt(m)]
      if (Number.isNaN(a) || Number.isNaN(m)) {
        return BigInt(NaN) // invalid input
      }
      a = (a % m + m) % m
      if (!a || m < 2) {
        return BigInt(NaN) // invalid input
      }
      // find the gcd
      const s: any = []
      let b: bigint = m
      while(b) {
        [a, b] = [b, a % b]
        s.push({a, b})
      }
      if (a !== 1n) {
        return BigInt(NaN) // inverse does not exists
      }
      // find the inverse
      let x: bigint = 1n
      let y: bigint = 0n
      for(let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y,  x - y * BigInt(Math.floor(Number(s[i].a / s[i].b)))]
      }
      return (y % m + m) % m
    },

    find_n() {
      this.n = Number(this.p) * Number(this.q)
    },

    find_phi() {
      this.phi = (Number(this.p) - 1) * (Number(this.q) - 1)
    },

    find_e() {
      var loop = true
      var n = []
      while(loop) {
        var r = Math.floor( Math.random() * Number(this.phi) );
        if( n.indexOf( r ) < 0) {
          n.push( r );
          if (r % Number(this.phi) > 0) {
            if (this.matu_e(r)) {
              this.e = r
              return
            }
          }
        }
      }
    },

    find_d () {
      let e = Number(this.e)
      let phi = Number(this.phi)
      this.d = BigInt(((phi * Math.floor( Math.random() * 1000 ) + 2) + 1) / e)
    },

    matu_e (inp: number) {
      for (let j = 2, s = Math.sqrt(inp); j <= s; j++) {
        if (inp % j == 0) {
          return false
        }
      }
      return inp >= 2
    },

    plainTextToAscii(text: String) {
      this.asciiArray = []
      for (let i = 0; i < text.length; i++) {
        this.asciiArray.push(BigInt(text.charCodeAt(i)))
      }
    },

    selectRandomPQ() {
      var loop = true
      var n = []
      while(loop) {
        var r = Math.floor( Math.random() * this.primes.length );
        if( n.indexOf( r ) < 0 ) n.push( r );
        if( n.length == 2 ) loop = false;
      }
      this.p = this.primes[n[0]]
      this.q = this.primes[n[1]]
    },

    getPrimes (min: number, max: number) {
      for (let index = min; index < max; index++) {

        if (this.matu (index)) {
          this.primes.push(index)
        }
      }
    },

    matu (inp: number) {
      for (let j = 2, s = Math.sqrt(inp); j <= s; j++) {
        if (inp % j == 0) {
          return false
        }
      }
      return inp >= 2
    },
    addDataToHistory(data: any) {
      let store: string | null = window.localStorage.getItem('history')
      let storeLists: Array<any> = []
      if (store) {
        storeLists = JSON.parse(store)
        storeLists.unshift(data)
      } else {
        storeLists.push(data)
      }
      if (storeLists.length > 25) {
        storeLists.pop()
      }
      window.localStorage.setItem('history', JSON.stringify(storeLists))
    }
  },
})
</script>

<style lang="scss">
 @import "../style/RSA";
</style>
