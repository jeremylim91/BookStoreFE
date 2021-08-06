<template>
  <div width="100%">
    <PageHeader class="test-header">
      <template v-slot:headerContent>
        Search
      </template>
      <template v-slot:subheader>
        Find books by title or content
      </template>
    </PageHeader>
    <SearchBar :showLoader="showLoader" />
    <v-divider />
    <v-container>
      <v-row>
        <v-col v-if="loader">
          <center>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </center>
        </v-col>
        <v-col v-else-if="searchResults.length < 1">
          <center>
            {{ searchStatus }}
          </center>
        </v-col>
        <v-col
          v-else
          v-for="book in searchResults"
          :key="book.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <Card>
            <template v-slot:image>
              <v-img
                :aspect-ratio="16 / 9"
                contain
                :src="book.thumbnailUrl"
                class="imageClass"
              />
            </template>
            <template v-slot:title>
              {{ book.title }}
            </template>
            <template v-slot:subheader>
              {{ book.authors }}
            </template>
            <template v-slot:price>
              {{ book.price }}
            </template>
            <template v-slot:description>
              {{ book.shortDescription }}
            </template>
          </Card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "../HOCs/PageHeader.vue";
import SearchBar from "./SearchBar.vue";
import Card from "../HOCs/Card.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PageHeader,
    SearchBar,
    Card,
  },
  data() {
    return {
      loader: false,
    };
  },
  computed: {
    ...mapGetters("moduleSearch", { searchResults: "getSearchResults" }),
    ...mapGetters("moduleSearch", { searchStatus: "getSearchStatus" }),
  },
  methods: {
    showLoader() {
      setTimeout(() => {
        this.loader = false;
      }, 1000);
      this.loader = true;
    },
    thereAreResults() {
      if (this.searchResults.length === 0) return true;
      return false;
    },
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.imageClass {
  background-image: url("https://wallpaperaccess.com/full/3593911.jpg");
  background-repeat: repeat;
  background-size: 20em;
}
</style>
