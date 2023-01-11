<template>
  <td>
    <span
      class="text-body-2 font-weight-bold text-grey-darken-3 hidden-sm-and-up"
      >{{ currentUser?.name }}</span
    >
    <v-list class="hidden-xs">
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar size="45" class="mr-3 rounded-lg" rounded="0">
            <v-img
              :src="
                currentUser?.avatar != undefined
                  ? currentUser?.avatar
                  : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
              "
              cover
            />
          </v-avatar>
        </template>

        <v-list-item-title
          class="text-grey-darken-3 font-weight-bold text-body-2"
          >{{ currentUser?.name }}</v-list-item-title
        >
        <v-list-item-subtitle class="text-caption">{{
          currentUser?.phone
        }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </td>
</template>

<script>
import { db } from "@/plugins/firebase";
import { doc, getDoc } from "@firebase/firestore";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    currentUser: null,
  }),

  mounted() {
    this.getCurrentUser();
  },

  methods: {
    getCurrentUser() {
      getDoc(doc(db, "users", this.user.user))
        .then((doc) => {
          if (doc.exists()) {
            this.currentUser = doc.data();
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },
};
</script>

<style>
</style>