<template>
  <div>
    <PageHeader class="test-header">
      <template v-slot:headerContent>
        Search
      </template>
      <template v-slot:subheader>
        Find books by title or content
      </template>
    </PageHeader>
    <SearchBar />
    <v-container>
      <v-row>
        <v-col
          v-for="book in searchResults"
          :key="book.id"
          :cols="book < 1 ? 12 : 3"
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
    return {};
  },
  computed: {
    ...mapGetters("moduleSearch", { searchResults: "getSearchResults" }),
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
