<template>
  <div>
    <v-container>
      <!-- eslint-disable-next-line -->
      <v-form
        ref="form"
        v-model="valid"
        class="form"
        @submit.prevent="submitForm"
      >
        <v-row>
          <!-- eslint-disable-next-line -->

          <v-col cols="12" md="10">
            <v-text-field
              v-model.trim="searchString"
              :rules="nameRules"
              label="Search for a book"
              required
            />
          </v-col>
          <v-col cols="12" md="2" class="search-button-col">
            <v-btn type="submit">
              Search!
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { GET_SEARCH_RESULTS } from "../../store/moduleSearch";
export default {
  props: ["showLoader"],
  data: () => ({
    valid: false,
    searchString: "",
    nameRules: [(v) => !!v || "Try entering some text to search for books"],
  }),
  methods: {
    ...mapActions("moduleSearch", { getSearchResults: GET_SEARCH_RESULTS }),

    submitForm() {
      // check if form is valid
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.showLoader();
        this.getSearchResults(this.searchString);
      }
    },
  },
};
</script>

<style scoped>
.form {
  width: 100%;
}
.search-button-col {
  display: flex;
  justify-content: center;
}
</style>
