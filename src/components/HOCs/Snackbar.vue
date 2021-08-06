<template>
  <v-snackbar v-model="snackbarFromStore" :timeout="timeout">
    {{ snackbarContent }}
    <template v-slot:action="{ attrs }">
      <!-- eslint-disable-next-line -->
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="snackbarFromStore = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      timeout: 2000,
    };
  },
  computed: {
    ...mapGetters("moduleSnackbar", {
      snackbarContent: "getSnackbarContent",
    }),
    snackbarFromStore: {
      get() {
        return this.$store.state.moduleSnackbar.snackbar;
      },
      set(value) {
        this.$store.dispatch("moduleSnackbar/setSnackbar", value);
      },
    },
  },
};
</script>

<style></style>
