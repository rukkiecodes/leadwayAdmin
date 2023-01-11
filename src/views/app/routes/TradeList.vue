<template>
  <v-container class="d-flex flex-column align-center justify-start">
    <v-card
      flat
      width="500"
      :key="trader.id"
      max-width="100%"
      class="rounded-lg mb-4"
      color="indigo-lighten-5"
      v-for="trader in allTradeList"
      :disabled="trader?.isDeleted"
    >
      <v-card-text class="d-flex justify-space-between align-center">
        <div>
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
          <span class="ml-4 text-h6">{{ trader?.name }}</span>
        </div>

        <v-btn
          @click="deleteTrader(trader)"
          class="bg-red text-capitalize"
          flat
        >
          Delete
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["deleteTrader"]),
  },

  computed: {
    ...mapGetters(["allTradeList"]),
  },
};
</script>

<style>
</style>