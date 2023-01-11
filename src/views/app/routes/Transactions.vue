<template>
  <v-container>
    <v-toolbar
      title="All Transactions"
      density="compact"
      color="transparent"
      class="mb-10"
    ></v-toolbar>

    <TransactionsTableVue />
  </v-container>
</template>
  
<script>
import TransactionsTableVue from "./transactionsComponents/TransactionsTable.vue";
export default {
  components: {
    TransactionsTableVue,
  },
};
</script>
  
  <style scoped>
.coinIcon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
</style>