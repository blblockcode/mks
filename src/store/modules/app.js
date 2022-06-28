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
	lang: lang,//语言
	chainId: "",
};

// getters
const getters = {
    lang: state => state.lang,
	chainId: state => state.chainId,
};

// actions
const actions = {
    setChainId({ commit }, data) {
        commit("setChainId", data);
    },
	changeLang({commit},data){
		commit('changeLang',data);
	}
};


const mutations = {
	changeLang(state, userLang){
		if(userLang.substring(0,2) == 'zh'){
			lang = require('@/language/zh.js');
		}else{
			lang = require('@/language/en.js');
		}
		window.localStorage.setItem('userlang',userLang);
		state.lang = lang;
	},
	setChainId(state, data){
		state.chainId = data;
	}
};

export default {
    state,
    getters,
    actions,
    mutations
};