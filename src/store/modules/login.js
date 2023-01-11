import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/plugins/firebase";
import router from "@/router";

const state = {
    email: 'support@bluezone-finance.com',
    password: 'admin%dollars',
    loading: false,
}

const actions = {
    loginAdmin() {
        let { email, password } = this.state.login

        if (email === '' || password === '') {
            alert('Please enter your email and password')
        } else {
            this.state.login.loading = true
            signInWithEmailAndPassword(auth, state.email, state.password)
                .then((userCredential) => {
                    this.state.login.loading = false
                    router.push('/app')
                    localStorage.blueZoneAdminToken = userCredential.user.uid
                    this.state.snackbar.active = true
                    this.state.snackbar.text = 'Login successful'
                    this.state.snackbar.color = 'green'
                })
                .catch((error) => {
                    const errorCode = error.code;

                    if (errorCode == 'auth/email-already-in-use') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'Email already in use'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/invalid-email') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'Invalid email'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/weak-password') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'Weak password'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/operation-not-allowed') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'Operation not allowed'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/user-disabled') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'User disabled'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/user-not-found') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'User not found'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/wrong-password') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'Wrong password'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/invalid-verification-code') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'Invalid verification code'
                        this.state.snackbar.color = 'red'
                    } else if (errorCode == 'auth/invalid-verification-id') {
                        this.state.login.loading = false
                        this.state.snackbar.active = true
                        this.state.snackbar.text = 'Invalid verification id'
                        this.state.snackbar.color = 'red'
                    }
                })
        }
    }
}

export default { state, actions }