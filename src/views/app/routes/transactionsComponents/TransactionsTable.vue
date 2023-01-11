<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">User</th>
        <th class="text-left">Amount</th>
        <th class="text-left">Currency</th>
        <th class="text-left">Type</th>
        <th class="text-left">Time</th>
        <th class="text-left">Date</th>
        <th class="text-left">Status</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, i) in allTransactions.slice(0, slice)" :key="request?.id">
        <td class="text-body-2 font-weight-bold text-grey-darken-3">
          {{ i }}
        </td>
        <User :user="request" />
        <td>
          <div class="d-flex align-center">
            <i
              class="coinIcon pr-0 mr-0"
              :class="
                request?.currency == 'Ethereum'
                  ? 'lab la-ethereum text-blue'
                  : request?.currency == 'Bitcoin'
                  ? 'lab la-bitcoin text-amber'
                  : 'las la-coins'
              "
            ></i>
            <span
              class="text-body-2 font-weight-bold"
              :class="
                request?.currency == 'Ethereum' ? 'text-blue' : 'text-amber'
              "
              >{{ request?.amount }}</span
            >
          </div>
        </td>
        <td
          class="text-body-2 font-weight-bold"
          :class="request?.currency == 'Ethereum' ? 'text-blue' : 'text-amber'"
        >
          {{ request.currency }}
        </td>
        <td class="text-body-2 font-weight-bold">
          {{ request.type }}
        </td>
        <td class="text-body-2 font-weight-bold text-grey-darken-3">
          {{ request.timestamp?.toDate().toDateString() }}
        </td>
        <td class="text-body-2 font-weight-bold text-grey-darken-3">
          {{ request.timestamp?.toDate().toLocaleTimeString("en-US") }}
        </td>
        <td
          class="text-body-2 font-weight-bold"
          :class="request?.state != 'pending' ? 'text-green' : 'text-amber'"
        >
          {{ request.state }}
        </td>
        <td>
          <v-btn
            flat
            size="small"
            @click="confirmTransaction(request)"
            class="rounded-lg text-caption font-weight-bold text-white"
            :class="request?.state != 'pending' ? 'bg-green' : 'bg-amber'"
          >
            {{ request?.state == "pending" ? "Confirm" : "Confirmed" }}</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import User from "../WithdrawRequestCmponents/User.vue";
export default {
  props: {
    slice: {
      type: Number,
      required: false,
    },
  },

  components: {
    User,
  },

  methods: {
    ...mapActions(["confirmTransaction"]),
  },

  computed: {
    ...mapGetters(["allTransactions"]),
  },
};
</script>
