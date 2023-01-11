import {
    createStore
} from 'vuex'

// MODULES
import login from './modules/login'
import snackbar from './modules/snackbar'
import getProfile from './modules/getProfile'
import drawer from './modules/drawer'
import addCopy from './modules/addCopy'
import withdrawRequests from './modules/withdrawRequests'
import transactions from './modules/transactions'
import pendingTransactions from './modules/pendingTransactions'
import users from './modules/users'
import tradeList from './modules/tradeList'
import traders from './modules/traders'

export default createStore({
    strict: false,
    modules: {
        login,
        snackbar,
        getProfile,
        drawer,
        addCopy,
        withdrawRequests,
        transactions,
        pendingTransactions,
        users,
        tradeList,
        traders
    },
})