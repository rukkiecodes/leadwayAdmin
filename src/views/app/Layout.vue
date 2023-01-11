<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer.drawer" color="indigo">
      <v-list density="compact" class="py-0">
        <v-list-item
          :key="i"
          class="mb-2"
          :value="item"
          :to="item.to"
          active-color="white"
          v-for="(item, i) in items"
        >
          <template v-slot:prepend>
            <v-avatar color="white" size="35" rounded="0" class="rounded-lg">
              <i :class="item.icon" class="icon text-indigo"></i>
            </v-avatar>
          </template>

          <v-list-item-title
            v-text="item.text"
            class="ml-4 mt-0 text-body-2 font-weight-regular"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="white" class="pl-sm-4 pr-4" flat>
      <v-app-bar-nav-icon
        @click="drawer.drawer = !drawer.drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5"
        >Bluezon <span class="text-indigo">Admin</span></v-toolbar-title
      >
      <v-spacer />
      <v-chip color="indigo" size="large" class="pl-1">
        <v-avatar class="mr-2">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
        Hello, {{ getProfile.name }}
      </v-chip>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import { useDisplay } from "vuetify";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    items: [
      { text: "Dashboard", icon: "las la-chart-pie", to: "/app" },
      {
        text: "Create Trader",
        icon: "las la-exchange-alt",
        to: "/app/createTrade",
      },
      {
        text: "Trader List",
        icon: "las la-list",
        to: "/app/tradeList",
      },
      {
        text: "Traders",
        icon: "las la-user-friends",
        to: "/app/Traders",
      },
      {
        text: "All Transactions",
        icon: "las la-exchange-alt",
        to: "/app/transactions",
      },
      {
        text: "Withdraw requests",
        icon: "las la-arrow-right",
        to: "/app/withdrawRequest",
      },
      {
        text: "Pending Transactions",
        icon: "las la-credit-card",
        to: "/app/pendingTransactions",
      },
      {
        text: "User support",
        icon: "las la-comments",
        to: "/app/support",
      },
      {
        text: "Users",
        icon: "las la-user",
        to: "/app/users",
      },
    ],
  }),

  created() {
    this.getUserProfile();
    this.drawerVisibility();

    this.getWithdrawRequests();
    this.getAllTransactions();
    this.getPendingTransactions();
    this.countUsers();
    this.getUsers();
    this.getAllTradeList();
    this.getAllTraders();
  },

  methods: {
    ...mapActions([
      "getUserProfile",
      "getWithdrawRequests",
      "getAllTransactions",
      "getPendingTransactions",
      "countUsers",
      "getUsers",
      "getAllTradeList",
      "getAllTraders",
    ]),

    drawerVisibility() {
      switch (useDisplay().name.value) {
        case "xs":
          return (this.drawer.drawer = false);
        case "sm":
          return (this.drawer.drawer = false);
        case "md":
          return (this.drawer.drawer = false);
        case "lg":
          return (this.drawer.drawer = true);
        case "xl":
          return (this.drawer.drawer = true);
        case "xxl":
          return (this.drawer.drawer = true);
      }
    },
  },

  computed: {
    ...mapState(["getProfile", "drawer"]),
  },
};
</script>

<style scoped>
.icon {
  font-size: 1rem;
}
</style>
