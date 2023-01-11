<template>
  <v-container class="d-flex justify-center align-center">
    <v-card width="400" max-width="100%">
      <v-card-title class="text-h5">Add New Copy Trader</v-card-title>
      <v-card-text>
        <v-text-field v-model="addCopy.name" label="Name" density="compact" variant="outlined" />
        <v-text-field
          label="Wins"
          type="number"
          density="compact"
          v-model="addCopy.wins"
          variant="outlined"
          />
          <v-text-field
          label="Losses"
          type="number"
          density="compact"
          variant="outlined"
          v-model="addCopy.losses"
          />
          <v-text-field
          label="Rate"
          type="number"
          density="compact"
          variant="outlined"
          v-model="addCopy.rate"
          />
          <v-text-field
          label="Profit"
          type="number"
          density="compact"
          variant="outlined"
          v-model="addCopy.profit"
        />
        <v-file-input
          label="Upload Image"
          density="compact"
          variant="outlined"
          @change="addCopy.file = $event.target.files[0]"
        />

        <v-btn @click="addCopyTrader" :loading="addCopy.loading" color="indigo" height="40"  block flat
          >Create</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(['addCopyTrader'])
  },

  computed: {
    ...mapState(["addCopy"]),
  },
};
</script>
