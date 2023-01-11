<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" sm="6" md="7">
        <v-toolbar density="compact" color="transparent">
          <v-btn @click="$router.go(-1)" class="bg-indigo">
            <v-icon>mdi-arrow-left</v-icon>
            <span class="text-capitalize ml-2">Go Back</span>
          </v-btn>
        </v-toolbar>
        <v-img cover height="200" class="d-flex justify-center align-center text-center my-5"
          src="https://res.cloudinary.com/rukkiecodes/image/upload/v1672842426/rupixen-com-Q59HmzK38eQ-unsplash_zdj3iw.jpg">
          <v-avatar v-if="user?.avatar != undefined" color="grey" size="120" rounded="50">
            <v-img cover :src="user?.avatar"></v-img>
          </v-avatar>
        </v-img>

        <v-card class="rounded-lg" flat>
          <v-card-title>{{ user?.name }}</v-card-title>

          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-body-2 font-weight-bold">ID</span>
            <span class="text-body-2">{{ this.$route.params.id }}</span>
          </v-card-title>
          <v-card-title class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Name</span>
            <span class="text-body-2">{{ user?.name }}</span>
          </v-card-title>
          <v-card-title class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Email</span>
            <span class="text-body-2">{{ user?.email }}</span>
          </v-card-title>
          <v-card-title class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Phone</span>
            <span class="text-body-2">{{ user?.phone }}</span>
          </v-card-title>
          <v-card-title v-if="user?.investment != undefined" class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Investments</span>
            <span class="text-body-2">${{
            (user?.investment)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span>
          </v-card-title>
          <v-card-title v-if="user?.earnings != undefined" class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Earnings</span>
            <span class="text-body-2">${{
            (user?.earnings)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span>
          </v-card-title>
          <v-card-title v-if="user?.investmentBTC != undefined" class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Investments BTC</span>
            <span class="text-body-2">{{ user?.investmentBTC }}</span>
          </v-card-title>
          <v-card-title v-if="user?.earningsBTC != undefined" class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Earnings BTC</span>
            <span class="text-body-2">{{ user?.earningsBTC }}</span>
          </v-card-title>
          <v-card-title v-if="user?.pin != undefined" class="d-flex justify-space-between align-center pt-0">
            <span class="text-body-2 font-weight-bold">Withdraw pin</span>
            <span class="text-body-2">{{ user?.pin }}</span>
          </v-card-title>

          <v-card-actions>
            <v-btn @click="setEditUser" block class="bg-indigo" flat>Edit User

              <v-dialog v-model="dialog" activator="parent" width="400">
                <v-card>
                  <v-card-text>
                    <v-text-field type="number" density="compact" variant="outlined" label="Investment"
                      v-model="credentials.investment" />
                    <v-text-field type="number" label="Earnings" density="compact" variant="outlined"
                      v-model="credentials.earnings" />
                    <v-text-field type="number" density="compact" variant="outlined" label="Investment BTC"
                      v-model="credentials.investmentBTC" />
                    <v-text-field type="number" density="compact" variant="outlined" label="Earnings BTC"
                      v-model="credentials.earningsBTC" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="bg-indigo" block @click="updateUser" :loading="loading">Update User</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-toolbar density="compact" color="transparent">
          <v-toolbar-title class="text-body-2 font-weight-regular">
            Transactions
          </v-toolbar-title>
        </v-toolbar>
        <v-card flat :key="transaction.id" v-for="transaction in transactions"
          class="mx-1 pa-2 d-flex card rounded-xl mb-1">
          <v-avatar class="mr-2" size="30">
            <v-img :src="user?.avatar" cover />
          </v-avatar>
          <v-card-text class="pa-0 d-flex flex-column flex-wrap">
            <v-card-title class="py-1 pb-0 px-0 mt-n1 text-body-2 font-weight-black">{{ user?.name }}</v-card-title>
            <v-card-text class="text-caption px-0 py-0 mt-1 d-flex justify-space-between">
              <span>Amount</span>
              <span>{{ transaction?.amount }}</span>
            </v-card-text>
            <v-card-text class="text-caption px-0 py-0 mt-1 d-flex justify-space-between">
              <span class="text-caption">currency</span>
              <span class="text-caption">{{ transaction?.currency }}</span>
            </v-card-text>
            <v-card-text class="text-caption px-0 py-0 mt-1 d-flex justify-space-between">
              <span class="text-caption">Status</span>
              <span class="text-caption">{{ transaction?.state }}</span>
            </v-card-text>
            <v-card-text class="text-caption px-0 py-0 mt-1 d-flex justify-space-between">
              <span class="text-caption">Type</span>
              <span class="text-caption">{{ transaction?.type }}</span>
            </v-card-text>
            <v-card-text class="text-caption px-0 py-0 mt-1 d-flex justify-space-between">
              <span class="text-caption">Date</span>
              <span class="text-caption">{{
                transaction?.timestamp?.toDate().toDateString()
              }}</span>
            </v-card-text>
            <v-card-text class="text-caption px-0 py-0 mt-1 d-flex justify-space-between">
              <span class="text-caption">Time</span>
              <span class="text-caption">{{
                transaction?.timestamp?.toDate().toLocaleTimeString("en-US")
              }}</span>
            </v-card-text>
          </v-card-text>
          <v-avatar class="mr-2" size="30">
            <v-img src="@/assets/images/XTVCBTC--big.svg" cover></v-img>
          </v-avatar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/plugins/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { mapState } from "vuex";
export default {
  data: () => ({
    user: null,
    transactions: [],
    dialog: false,
    loading: false,
    credentials: {
      investment: "",
      earnings: "",
      investmentBTC: "",
      earningsBTC: "",
    },
  }),

  mounted() {
    this.$nextTick(() => {
      this.getCurrentUser();
      this.getUserTransactions();
    });
  },

  methods: {
    getCurrentUser() {
      getDoc(doc(db, "users", this.$route.params.id))
        .then((doc) => {
          if (doc.exists()) {
            this.user = doc.data();
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },

    getUserTransactions() {
      getDocs(collection(db, "users", this.$route.params.id, "transactions"))
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            this.transactions.push({ id: doc.id, ...doc.data() });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },

    updateUser() {
      this.loading = true;

      updateDoc(doc(db, "users", this.$route.params.id), { ...this.credentials })
        .then(() => {
          this.snackbar.active = true;
          this.snackbar.text = "User updated successfully";
          this.snackbar.color = "success";
          this.loading = false;
          this.dialog = false;
          this.getCurrentUser()
        })
        .catch((error) => {
          this.snackbar.active = true;
          this.snackbar.text = error.message;
          this.snackbar.color = "error";
          this.loading = false;
          this.getCurrentUser()
        });
    },

    setEditUser() {
      this.credentials.investment = this.user?.investment
      this.credentials.earnings = this.user?.earnings
      this.credentials.investmentBTC = this.user?.investmentBTC
      this.credentials.earningsBTC = this.user?.earningsBTC
    },
  },

  computed: {
    ...mapState(["snackbar"]),
  },
};
</script>
