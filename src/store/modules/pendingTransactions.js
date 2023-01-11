import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { db } from "@/plugins/firebase"

const state = {
    allPendingTransactions: []
}

const getters = {
    allPendingTransactions: state => state.allPendingTransactions
}

const mutations = {
    setPendingTransactions(state, withdrawRequest) {
        state.allPendingTransactions.push(withdrawRequest)
    }
}

const actions = {
    getPendingTransactions({ commit }) {
        this.state.pendingTransactions.allPendingTransactions = []
        const unsub = onSnapshot(collection(db, 'users'),
            snapshot => {
                snapshot.forEach(async doc => {
                    let pendingTransactions = await getDocs(query(collection(db, 'users', doc.id, 'transactions'), where('state', '==', 'pending')))

                    pendingTransactions.forEach(doc => {
                        commit('setPendingTransactions', {
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                })
            })
        return unsub
    },

    async confirmPendingTransaction({ commit, dispatch }, request) {
        let { user, sharedId, type } = request

        let transactionType = await getDocs(query(collection(db, 'users', user, type == 'deposit' ? 'deposits' : 'withdraws'), where('sharedId', '==', sharedId)))
        let transaction = await getDocs(query(collection(db, 'users', user, 'transactions'), where('sharedId', '==', sharedId)))

        await updateDoc(doc(db, 'users', user, type == 'deposit' ? 'deposits' : 'withdraws', transactionType.docs[0].id), {
            state: 'confirmed'
        })

        await updateDoc(doc(db, 'users', user, 'transactions', transaction.docs[0].id), {
            state: 'confirmed'
        })

        this.state.snackbar.active = true
        this.state.snackbar.color = 'success'
        this.state.snackbar.text = 'Transaction confirmed successfully!'

        return dispatch('getPendingTransactions', 'getWithdrawRequests', 'getAllTransactions')
    }
}

export default { state, getters, mutations, actions }