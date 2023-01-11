import { db } from "@/plugins/firebase"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"

const state = {
    allTradeList: []
}

const getters = {
    allTradeList: state => state.allTradeList
}

const mutations = {
    setTradeList(state, payload) {
        state.allTradeList.push(payload)
    }
}

const actions = {
    getAllTradeList({ commit }) {
        this.state.tradeList.allTradeList = []
        getDocs(collection(db, "copyTrades")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                commit('setTradeList', {
                    id: doc.id,
                    ...doc.data()
                })
            })
        })
    },

    deleteTrader({ commit, dispatch }, trader) {
        this.state.tradeList.allTradeList = []
        updateDoc(doc(db, "copyTrades", trader.id), {
            isDeleted: true
        })

        this.state.snackbar.active = true
        this.state.snackbar.text = 'Trader deleted'
        this.state.snackbar.color = 'green'

        return dispatch('getAllTradeList')
    }
}

export default { state, getters, mutations, actions }