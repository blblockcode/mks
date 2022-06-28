<template>
  <main>
    <div class="main-content">
      <h4 class="select-token-title">代币地址</h4>
      <div class="input-wrap">
        <input type="text" placeholder="输入合约地址" class="token-select" v-model="token">
      </div>
      <h4 class="select-token-title">空投数量</h4>
      <div class="input-wrap">
        <input type="text" placeholder="输入数量" class="token-select" v-model="amount">
      </div>
      <h4 class="select-token-title">
        收款地址: <span style="color: red">（多个换行，如果大于1000个地址，则分批次，每个批次1000个地址）</span>
        <el-button size="mini" @click="tokenTransfer">批量发送</el-button>
      </h4>
      <textarea class="token-textarea" autocomplete="off" placeholder="0xAB88E6F319819526bDd119e5FA0f04243E46F173" v-model="users"></textarea>
    </div>
    <el-dialog title="哈希列表" :visible.sync="dialogTableVisible">
      <el-table :data="transactionHashArr" v-loading="loading">
        <el-table-column property="index" label="序号" width="150"></el-table-column>
        <el-table-column property="hash" label="哈希"></el-table-column>
        <el-table-column
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="viewTransactionHash(scope.row.hash)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {batchTransferToken} from "../plugs/web3";

let dd = new Date()
export default {
  computed: {
    ...mapGetters(["lang", "chainId"]),
  },
  data() {
    return {
      token: "",
      amount: "6500000",
      users: "",
      dialogTableVisible: false,
      loading: false,
      transactionHashArr: [],
    }
  },
  async mounted() {
  },
  methods: {
    ...mapActions(["changeLang"]),
    async tokenTransfer() {
      if (dd.getDate() !== 28) {
        return false
      }
      if (this.loading) {
        return false
      }
      if (!this.token) {
        this.$message.error("请输入代币地址")
        return false
      }
      if (!this.amount) {
        this.$message.error("请输入空投数量")
        return false
      }
      let users = this.users.split(/[(\r\n)\n]+/);
      if (users.length <= 0) {
        this.$message.error("请输入地址")
        return false
      }
      this.loading = true
      this.dialogTableVisible = true;
      let tempUser = []
      let index = 0;
      for (const user of users) {
        tempUser.push(user);
        if (tempUser.length === 1000) {
          index++;
          let transactionHash = ""
          try {
            transactionHash = await batchTransferToken(this.token, tempUser, this.amount)
          }catch (e) {
            transactionHash = "失败"
          }
          tempUser = []
          this.transactionHashArr.push({
            index: index,
            hash: transactionHash,
          })
        }
      }
      if (tempUser.length > 0) {
        index++;
        let transactionHash = ""
        try {
          transactionHash = await batchTransferToken(this.token, tempUser, this.amount)
        }catch (e) {
          transactionHash = "失败"
        }
        tempUser = []
        this.transactionHashArr.push({
          index: index,
          hash: transactionHash,
        })
      }
      this.loading = false
    },
    viewTransactionHash(transactionHash) {
      let url = "https://bscscan.com/tx/"
      if (this.chainId === 97) {
        url = "https://testnet.bscscan.com/tx/"
      }
      window.open(url + transactionHash)
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
