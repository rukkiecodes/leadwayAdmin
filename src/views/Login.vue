<template>
  <v-card width="400" max-width="90%" class="loginForm">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-text-field v-model="login.email" label="Email" type="email" variant="outlined" />
      <v-text-field v-model="login.password" label="Password" type="password" variant="outlined" />

      <v-btn @click="loginAdmin" :loading="login.loading" color="indigo" size="large" block>Login</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    methods: {
        ...mapActions(['loginAdmin'])
    },

    computed: {
        ...mapState(['login'])
    }
};
</script>

<style scoped>
.loginForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>