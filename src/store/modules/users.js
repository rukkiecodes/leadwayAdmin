import { db } from "@/plugins/firebase"
import { collection, getCountFromServer, onSnapshot } from "firebase/firestore"

const state = {
    count: 0,
    allUsers: []
}

const getters = {
    allUsers: state => state.allUsers,
}

const mutations = {
    setCount: (state, count) => {
        state.count = count
    },

    setAllUsers: (state, user) => {
        state.allUsers.push(user)
    }
}

const actions = {
    async countUsers({ commit }) {
        const coll = collection(db, "users")
        const snapshot = await getCountFromServer(coll)

        commit('setCount', snapshot.data().count)
    },

    getUsers({ commit }) {
        this.state.users.allUsers = []

        const unsub = onSnapshot(collection(db, 'users'),
            snapshot => {
                snapshot.forEach(async doc => {
                    commit('setAllUsers', {
                        id: doc.id,
                        ...doc.data()
                    })
                })
            })
        return unsub
    }
}

export default { state, mutations, actions, getters }