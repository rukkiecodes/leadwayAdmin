<template>
  <v-container class="d-flex flex-column align-center justify-start">
    <v-card
      flat
      width="500"
      max-width="100%"
      :key="trader?.id"
      class="rounded-lg mb-4"
      color="indigo-lighten-5"
      v-for="(trader, i) in allTradeList"
      :disabled="trader?.isDeleted"
    >
      <v-card-text class="d-flex justify-space-between align-center">
        <div class="d-flex">
          <v-avatar size="60">
            <v-img
              cover
              :src="
                trader?.image != undefined
                  ? trader?.image
                  : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
              "
              :alt="trader?.name"
            />
          </v-avatar>
          <div class="d-flex flex-column align-start justify-start">
            <span class="ml-4 text-h6">{{ trader?.name }}</span>
            <span class="ml-4 text-body-1 mt-n1"
              >{{ trader?.currency == undefined ? "BTC" : trader?.currency }},
              <span
                :class="
                  trader?.profitLoss == 'PROFIT' ? 'text-green' : 'text-red'
                "
                >{{ trader?.rate }}</span
              ></span
            >
            <span class="ml-4 text-body-1 mt-3"
              >{{ trader?.from == undefined ? trader?.losses : trader?.from }}
              <i class="las la-arrow-right"></i>
              {{ trader?.to == undefined ? trader?.wins : trader?.to }}</span
            >
          </div>
        </div>

        <v-btn
          flat
          @click="openDialog(trader)"
          class="bg-indigo text-capitalize"
        >
          View
        </v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-text class="text-center">
          <v-avatar size="100">
            <v-img
              cover
              :src="
                activeDialog?.image != undefined
                  ? activeDialog?.image
                  : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
              "
              :alt="activeDialog?.name"
            />
          </v-avatar>
        </v-card-text>
        <v-card-text>
          <v-select
            label="BUY/SELL"
            density="compact"
            variant="outlined"
            :items="['BUY', 'SELL']"
            v-model="buySell"
          />
          <v-select
            density="compact"
            variant="outlined"
            label="PROFIT/LOSS"
            :items="['PROFIT', 'LOSS']"
            v-model="profitLoss"
          />
          <v-text-field
            label="From"
            type="number"
            density="compact"
            variant="outlined"
            v-model="from"
          />
          <v-text-field
            label="To"
            type="number"
            density="compact"
            variant="outlined"
            v-model="to"
          />
          <v-text-field
            clearable
            label="Currency"
            density="compact"
            variant="outlined"
            v-model="currency"
          />
          <v-text-field
            clearable
            type="number"
            density="compact"
            variant="outlined"
            label="Enter Amount"
            v-model="amount"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            style="flex: 1"
            @click="dialog = false"
            class="text-capitalize bg-grey-darken-4"
            >Close</v-btn
          >
          <v-btn
            style="flex: 1"
            :loading="loading"
            @click="updateTrader"
            class="text-capitalize bg-indigo"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { db } from "@/plugins/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    dialog: false,
    activeDialog: null,
    loading: false,
    // credentials
    buySell: null,
    profitLoss: null,
    from: null,
    to: null,
    currency: null,
    amount: null,
  }),

  methods: {
    openDialog(trader) {
      this.activeDialog = trader;
      this.dialog = true;

      this.buySell = this.activeDialog.buySell;
      this.profitLoss = this.activeDialog.profitLoss;
      this.from = this.activeDialog.from;
      this.to = this.activeDialog.to;
      this.currency = this.activeDialog.currency;
      this.amount = this.activeDialog.amount;
    },

    updateTrader() {
      this.loading = true;
      updateDoc(doc(db, "copyTrades", this.activeDialog.id), {
        buySell: this.buySell,
        profitLoss: this.profitLoss,
        from: this.from,
        to: this.to,
        currency: this.currency,
        amount: this.amount,
      });

      this.loading = false;
      this.dialog = false;
      this.snackbar.active = true;
      this.snackbar.text = "Trader Updated Successfully";
      this.snackbar.color = "success";

      this.$store.dispatch("getAllTradeList");
    },
  },

  computed: {
    ...mapGetters(["allTradeList"]),

    ...mapState(["snackbar"]),
  },
};
</script>

<style>
</style>