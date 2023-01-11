import { db } from "@/plugins/firebase"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"

const state = {
    allTraders: []
}

const getters = {
    allTraders: state => state.allTraders
}

const mutations = {
    setAllTraders(state, payload) {
        state.allTraders.push(payload)
    }
}

const actions = {
    getAllTraders({ commit }) {
        getDocs(collection(db, "copyTrades")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                commit('setAllTraders', {
                    id: doc.id,
                    ...doc.data()
                })
            })
        })
    }
}

export default { state, getters, mutations, actions }