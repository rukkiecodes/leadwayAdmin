import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { db } from "@/plugins/firebase"

const state = {
    allTransactions: []
}

const getters = {
    allTransactions: state => state.allTransactions
}

const mutations = {
    setAllTransactions(state, withdrawRequest) {
        state.allTransactions.push(withdrawRequest)
    }
}

const actions = {
    getAllTransactions({ commit }) {
        this.state.transactions.allTransactions = []

        const unsub = onSnapshot(collection(db, 'users'),
            snapshot => {
                snapshot.forEach(async doc => {
                    let withdrawRequests = await getDocs(collection(db, 'users', doc.id, 'transactions'))
                    withdrawRequests.forEach(doc => {
                        commit('setAllTransactions', {
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                })
            })
        return unsub
    },

    async confirmTransaction({ commit, dispatch }, request) {
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

        return dispatch('getAllTransactions')
    }
}

export default { state, getters, mutations, actions }