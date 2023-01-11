import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { db } from "@/plugins/firebase"

const state = {
    allWithdrawRequests: []
}

const getters = {
    allWithdrawRequests: state => state.allWithdrawRequests
}

const mutations = {
    setWithdrawRequests(state, withdrawRequest) {
        state.allWithdrawRequests.push(withdrawRequest)
    }
}

const actions = {
    getWithdrawRequests({ commit }) {
        const unsub = onSnapshot(collection(db, 'users'),
            snapshot => {

                snapshot.forEach(async doc => {
                    let withdrawRequests = await getDocs(collection(db, 'users', doc.id, 'withdraws'))

                    this.state.withdrawRequests.allWithdrawRequests = []
                    withdrawRequests.forEach(doc => {
                        commit('setWithdrawRequests', {
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                })
            })
        return unsub
    },

    async confirmPendingWithdrawRequest({ commit, dispatch }, request) {
        let { user, id, sharedId } = request

        let transaction = await getDocs(query(collection(db, 'users', user, 'transactions'), where('sharedId', '==', sharedId)))

        await updateDoc(doc(db, 'users', user, 'withdraws', id), {
            state: 'confirmed'
        })

        await updateDoc(doc(db, 'users', user, 'transactions', transaction.docs[0].id), {
            state: 'confirmed'
        })

        this.state.snackbar.active = true
        this.state.snackbar.color = 'success'
        this.state.snackbar.text = 'Withdraw request confirmed'

        return dispatch('getWithdrawRequests')
    }
}

export default { state, getters, mutations, actions }