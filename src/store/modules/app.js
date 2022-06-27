import * as types from "../mutation-types";

let lang;
try{
	let userLang = window.localStorage.getItem("userlang") || "zh";
	if(userLang.substring(0,2) == 'zh'){
		lang = require('@/language/zh.js');
	}else{
		lang = require('@/language/en.js');
	}
	window.localStorage.setItem('userlang',userLang);
}catch(e){
	console.log(e)
}

const state = {
    baseData: {
    },
	userInfo:{
		mine_reward_pm:"0",//PM待领取挖矿奖励
		mine_reward_receive_pm:"0",//PM已领取挖矿奖励
		invite_reward_pm:"0",//PM待领取的邀请奖励
		invite_reward_receive_pm:"0",//PM已领取的邀请奖励
		invite_reward_pdao:"0",//PDAO待领取的邀请奖励
		invite_reward_receive_pdao:"0",//PDAO已领取的邀请奖励
		mine_reward_peth:"0",//PETH待领取挖矿奖励
		mine_reward_receive_peth:"0",//PETH已领取挖矿奖励
		mine_reward_pbtc:"0",//PBTC待领取挖矿奖励
		mine_reward_receive_pbtc:"0",//PBTC已领取挖矿奖励
	},
	lang: lang,//语言
	transConfig:{
		mine_reward_pm_min:"0",//PM挖矿提取最低
		invite_reward_pm_min:"0",//PM邀请提取最低
		invite_reward_pdao_min:"0",//PDAO邀请提取最低
		mine_reward_peth_min:"0",//PETH挖矿提取最低
		mine_reward_pbtc_min:"0",//PETH挖矿提取最低
	},
};

// getters
const getters = {
    baseData: state => state.baseData,
    lang: state => state.lang,
	userInfo: state => state.userInfo,
	transConfig: state => state.transConfig,
};

// actions
const actions = {
    setBaseData({ commit }, data) {
        commit(types.BASE_DATA, data);
    },
	changeLang({commit},data){
		commit('changeLang',data);
	},
	setUserInfo({commit},data){
		commit('setUserInfo',data);
	},
	setConfig({commit},data){
		commit('setConfig',data);
	},
};


const mutations = {
    [types.BASE_DATA](state, data) {
        state.baseData = data;
    },
	changeLang(state, userLang){
		if(userLang.substring(0,2) == 'zh'){
			lang = require('@/language/zh.js');
		}else{
			lang = require('@/language/en.js');
		}
		window.localStorage.setItem('userlang',userLang);
		state.lang = lang;
	},
	setUserInfo(state,data){
		state.userInfo = JSON.parse(JSON.stringify(data));
	},
	setConfig(state,data){
		state.transConfig = data;
	}
};

export default {
    state,
    getters,
    actions,
    mutations
};