<template>
  <div>
    <v-container>
      <v-form v-model="valid" class="form" @submit.prevent="getSearchResults">
        <v-row>
          <v-col cols="8" offset="1">
            <v-text-field
              v-model="searchString"
              :rules="nameRules"
              label="Search for a book"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="2">
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
import { mapActions, mapGetters } from "vuex";
import { GET_SEARCH_RESULTS } from "../../store/moduleSearch";
export default {
  data: () => ({
    valid: false,
    searchString: "",
    nameRules: [(v) => !!v || "Try entering some text to search for books"],
  }),
  methods: {
    ...mapActions("moduleSearch", [GET_SEARCH_RESULTS]),
  },
  computed: {
    ...mapGetters("moduleSearch", { searchResults: GET_SEARCH_RESULTS }),
  },
};
</script>

<style scoped>
.form {
  width: 100%;
}
</style>
