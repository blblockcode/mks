<template>
  <main>
    <div class="main-content">
      <h4 class="select-token-title">输入代币</h4>
      <div class="input-wrap">
        <input type="text" placeholder="输入合约地址" class="token-select" v-model="token">
      </div>
      <h4 class="select-token-title">输入数量</h4>
      <div class="input-wrap">
        <input type="text" placeholder="输入数量" class="token-select" v-model="amount">
      </div>
      <h4 class="select-token-title">
        收款地址: <span style="color: red">（多个地址换行）</span>
        <button class="upload-show" @click="tokenTransfer">
          批量发送
        </button>
      </h4>
      <a v-if="transactionHash.length > 0" style="color: green" :href="'https://bscscan.com/tx/' + transactionHash">
        {{transactionHash}}
      </a>
      <textarea class="token-textarea" autocomplete="off" placeholder="0xAB88E6F319819526bDd119e5FA0f04243E46F173" v-model="users"></textarea>
    </div>
  </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {batchTransferToken} from "../plugs/web3";

export default {
  computed: {
    ...mapGetters(["baseData", "lang", "userInfo", "transConfig"]),
  },
  data() {
    return {
      token: "",
      amount: "6500000",
      users: "",
      transactionHash: "",
    }
  },
  async mounted() {
  },
  methods: {
    ...mapActions(["changeLang"]),
    async tokenTransfer() {
      let users = this.users.split(/[(\r\n)\n]+/);
      this.transactionHash = await batchTransferToken(this.token, users, this.amount)
      window.open("https://bscscan.com/tx/" + this.transactionHash)
    }
  },
}
</script>

<style>

.main-content {
  width: 80%;
  background: #2f3033;
  border-radius: 8px;
  padding: 12px 48px 30px;
  color: #fff;
  margin: 20px auto 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

@media screen and (max-width: 769px) {
  .main-content {
    width: 100%;
    padding: 2px 24px 12px;
    margin-top: 0;
  }
}

.select-token-title {
  font-size: 18px;
  margin: 12px 0 6px;
}

.token-select {
  width: 100%;
  background-color: #333;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.token-textarea {
  width: 100%;
  height: 350px;
  position: relative;
  display: block;
  resize: vertical;
  padding: 5px 11px;
  line-height: 1.5;
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  color: #fff;
  background-color: #333;
  background-image: none;
  -webkit-appearance: none;
  border: 1px solid #fff;
  border-radius: 8px;
}

</style>
