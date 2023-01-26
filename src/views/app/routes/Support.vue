<template>
    <v-container>
        <v-row justify="start">
            <v-col v-for="user in allUsers" :key="user.id" cols="12" sm="6" md="4" lg="4">
                <v-card class="rounded-lg">
                    <v-img cover height="100%" class="d-flex justify-center align-center text-center"
                        src="https://res.cloudinary.com/rukkiecodes/image/upload/v1672842426/rupixen-com-Q59HmzK38eQ-unsplash_zdj3iw.jpg">
                        <v-avatar v-if="user?.avatar != undefined" color="grey" size="120" rounded="50">
                            <v-img cover :src="user?.avatar"></v-img>
                        </v-avatar>
                    </v-img>

                    <v-card-title>{{ user?.name }}</v-card-title>

                    <v-card-title class="d-flex justify-space-between align-center">
                        <span class="text-body-2 font-weight-bold">ID</span>
                        <span class="text-body-2">{{ user?.id }}</span>
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

                    <v-card-actions>
                        <v-btn block :to="`/app/support/${user?.id}`" class="bg-indigo" flat>Message User</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["allUsers"]),
    },
};
</script>
