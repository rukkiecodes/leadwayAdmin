<template>
  <router-view />
  <v-snackbar
    v-model="snackbar.active"
    :color="snackbar.color"
    close-on-back
    location="top right"
    absolute
  >
    {{ snackbar.text }}

    <template v-slot:actions>
      <v-btn icon size="small" variant="text" @click="snackbar.active = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["snackbar"]),
  },
};
</script>

<style>
@import "./assets/icon/css/line-awesome.min.css";
</style>