import { db } from "@/plugins/firebase"
import { doc, getDoc } from "firebase/firestore"

const state = {

}

const actions = {
    async getUserProfile() {
        const profile = await (await getDoc(doc(db, "admin", import.meta.env.VITE_admin))).data()
        this.state.getProfile = { ...profile }
    }
}

export default { state, actions }