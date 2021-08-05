<template>
  <div>
    <v-container>
      <!-- eslint-disable-next-line -->
      <v-form
        v-model="valid"
        class="form"
        @submit.prevent="getSearchResults(searchString)"
      >
        <v-row>
          <!-- eslint-disable-next-line -->

          <v-col cols="12" md="10">
            <v-text-field
              v-model="searchString"
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
  data: () => ({
    valid: false,
    searchString: "",
    nameRules: [(v) => !!v || "Try entering some text to search for books"],
  }),
  methods: {
    ...mapActions("moduleSearch", { getSearchResults: GET_SEARCH_RESULTS }),
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
