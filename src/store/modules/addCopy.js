import { db } from "@/plugins/firebase"
import { addDoc, collection } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const state = {
    loading: false,
    file: null,
    name: '',
    wins: null,
    losses: null,
    rate: null,
    profit: null,
}

const actions = {
    async addCopyTrader() {
        let { file, name, wins, losses, rate, profit } = this.state.addCopy

        if (name == '' || !wins || !losses || !rate || !profit, !file) {
            this.state.snackbar.active = true
            this.state.snackbar.text = 'Please fill in all fields'
            this.state.snackbar.color = 'red'
            return
        } else {
            if (!file) return

            const storage = getStorage()

            const storageRef = ref(storage, `copyTrades/${file.name}`)

            const uploadTask = uploadBytesResumable(storageRef, file)

            this.state.addCopy.loading = true

            uploadTask.on('state_changed', (snapshot) => {
            }, (error) => {
                console.log(error)
                this.state.addCopy.loading = false
                this.state.snackbar.active = true
                this.state.snackbar.text = 'Error uploading copy trader'
                this.state.snackbar.color = 'red'
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(collection(db, "copyTrades"), {
                        image: downloadURL,
                        name: this.state.addCopy.name,
                        wins: parseFloat(this.state.addCopy.wins),
                        losses: parseFloat(this.state.addCopy.losses),
                        rate: parseFloat(this.state.addCopy.rate),
                        profit: parseFloat(this.state.addCopy.profit),
                        isDeleted: false
                    })

                    this.state.addCopy.loading = false
                    this.state.snackbar.active = true
                    this.state.snackbar.text = 'Copy trader uploaded'
                    this.state.snackbar.color = 'green'
                })
            })
        }

    }
}

export default { state, actions }