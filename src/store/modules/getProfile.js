import { db } from "@/plugins/firebase"
import { doc, getDoc } from "firebase/firestore"

const state = {

}

const actions = {
    async getUserProfile() {
        let admin = await localStorage.blueZoneAdminToken
        const profile = await (await getDoc(doc(db, "admin", admin))).data()
        this.state.getProfile = { ...profile }
    }
}

export default { state, actions }