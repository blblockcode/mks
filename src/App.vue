<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">批量空投</RouterLink>
          <a href="javascript:;" @click="deploy">发币</a>
        </nav>
        <div class="account-btn" @click="connectWeb3" v-if="account.length === 0">链接钱包</div>
        <div class="account-text" v-else>{{accountText}}</div>
      </div>
    </header>

    <div class="home">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {deployToken, initWeb3} from "./plugs/web3";

export default {
  computed: {
    ...mapGetters(["baseData", "lang"]),
    accountText() {
      let frontLen = 3
      let endLen = 4
      let xing = "";
      for (let i = 0; i < 3; i++) {
        xing += "*";
      }
      return (
          this.account.substring(0, frontLen) + xing + this.account.substring(this.account.length - endLen)
      );
    }
  },
  data() {
    return {
      account: "",
      transactionHash: "",
    }
  },
  async created() {
    await this.connectWeb3()
  },
  methods: {
    ...mapActions(["setUserInfo", "setConfig"]),
    async connectWeb3() {
      const web3 = await initWeb3()
      if (web3) {
        let accounts = await web3.eth.getAccounts()
        this.account = accounts[0]
      }
    },
    async deploy() {
      this.transactionHash = await deployToken()
      window.open("https://bscscan.com/tx/" + this.transactionHash)
    }
  }
}
</script>

<style lang="less">
@import './assets/base.css';
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.home {
  flex: 1;
  background: url(./assets/bg.png) no-repeat;
  background-size: cover;
  background-position: 50%;
  background-color: #0c0e14;
}

header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  background: #000;
  color: #fff;
  line-height: 72px;
  padding: 0 5px;
}

header .logo {
  display: inline-block;
  vertical-align: middle;
}

.logo {
  height: 72px;
  float: left;
}

header .wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  flex: 1;
}

a,
.green {
  text-decoration: none;
  color: #ffffff;
  transition: 0.4s;
}

nav {
  font-size: 15px;
}

nav a.router-link-exact-active {
  background-color: transparent;
}

nav a:hover {
  background-color: hsla(161, 15%, 76%, 0.2);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.account-btn {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background-color: #2980fe;
  color: #fff;
  border-radius: 24px;
  padding: 0 24px;
  font-size: 16px;
  cursor: pointer;
}
</style>
