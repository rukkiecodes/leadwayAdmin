<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" md="5">
        <v-toolbar density="compact" color="transparent">
          <v-btn @click="$router.go(-1)" class="bg-indigo">
            <v-icon>mdi-arrow-left</v-icon>
            <span class="text-capitalize ml-2">Go Back</span>
          </v-btn>
        </v-toolbar>
        <v-img
          cover
          height="200"
          class="d-flex justify-center align-center text-center my-5"
          src="https://res.cloudinary.com/rukkiecodes/image/upload/v1672842426/rupixen-com-Q59HmzK38eQ-unsplash_zdj3iw.jpg"
        >
          <v-avatar
            v-if="user?.avatar != undefined"
            color="grey"
            size="120"
            rounded="50"
          >
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
          <v-card-title
            v-if="user?.investment != undefined"
            class="d-flex justify-space-between align-center pt-0"
          >
            <span class="text-body-2 font-weight-bold">Investments</span>
            <span class="text-body-2"
              >${{
                (user?.investment)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</span
            >
          </v-card-title>
          <v-card-title
            v-if="user?.earnings != undefined"
            class="d-flex justify-space-between align-center pt-0"
          >
            <span class="text-body-2 font-weight-bold">Earnings</span>
            <span class="text-body-2"
              >${{
                (user?.earnings)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</span
            >
          </v-card-title>
          <v-card-title
            v-if="user?.investmentBTC != undefined"
            class="d-flex justify-space-between align-center pt-0"
          >
            <span class="text-body-2 font-weight-bold">Investments BTC</span>
            <span class="text-body-2">{{ user?.investmentBTC }}</span>
          </v-card-title>
          <v-card-title
            v-if="user?.earningsBTC != undefined"
            class="d-flex justify-space-between align-center pt-0"
          >
            <span class="text-body-2 font-weight-bold">Earnings BTC</span>
            <span class="text-body-2">{{ user?.earningsBTC }}</span>
          </v-card-title>
          <v-card-title
            v-if="user?.pin != undefined"
            class="d-flex justify-space-between align-center pt-0"
          >
            <span class="text-body-2 font-weight-bold">Withdraw pin</span>
            <span class="text-body-2">{{ user?.pin }}</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-toolbar density="compact" color="transparent">
          <v-toolbar-title class="text-body-2 font-weight-regular">
            Messages
          </v-toolbar-title>
        </v-toolbar>
        <v-card
          height="80vh"
          flat
          class="d-flex flex-column justify-space-between rounded-lg"
        >
          <div class="pa-4 overflow-auto chatSheet">
            <div
              v-for="chat in chats"
              :key="chat.id"
              class="d-flex justify-start mt-4"
              style="width: 100%"
            >
              <v-card
                min-width="4"
                max-width="70%"
                class="bg-white rounded-xl rounded-ts-0"
              >
                <v-card-text class="pa-2 text-caption">
                  {{ chat.message }}</v-card-text
                >
              </v-card>
            </div>
          </div>

          <v-toolbar class="px-4 pr-2 rounded-lg" color="indigo">
            <v-text-field
              hide-details
              color="white"
              density="compact"
              variant="plain"
              label="Aa..."
              placeholder="Enter a message"
              v-model="message"
              @keypress.enter="sendMessage"
            />
            <v-btn
              @click="sendMessage"
              :loading="loading"
              variant="tonal"
              class="ml-4 bg-indigo-darken-4"
              flat
              :height="39"
            >
              <span class="text-capitalize text-caption">Send</span>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/plugins/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { mapState } from "vuex";
export default {
  data: () => ({
    user: null,
    transactions: [],
    dialog: false,
    loading: false,
    chats: [],
    message: "",
    admin: localStorage.blueZoneAdminToken,
  }),

  mounted() {
    this.$nextTick(() => {
      this.getCurrentUser();
      this.getChat();
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

    async getChat() {
      const unsub = onSnapshot(
        query(
          collection(db, "support", this.$route.params.id, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          this.chats = [];
          snapshot.forEach((doc) => {
            this.chats.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        }
      );
      return unsub;
    },

    scroolToBottom() {
      const chatSheet = document.querySelector(".chatSheet");
      chatSheet.scrollTop = chatSheet.scrollHeight - chatSheet.clientHeight;
    },

    async sendMessage() {
      if (this.message == "") return;
      let admin = await localStorage.blueZoneAdminToken;

      addDoc(collection(db, "support", this.$route.params.id, "messages"), {
        message: this.message,
        user: admin,
        timestamp: serverTimestamp(),
      });
      this.message = "";
    },
  },

  computed: {
    ...mapState(["snackbar"]),
  },
};
</script>

<style scoped>
.chatSheet {
  height: 100%;
}

.chatSheet::-webkit-scrollbar {
  width: 5px;
}

@media (max-width: 768px) {
  .chatSheet::-webkit-scrollbar {
    width: 0px;
  }
}

.chatSheet::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
