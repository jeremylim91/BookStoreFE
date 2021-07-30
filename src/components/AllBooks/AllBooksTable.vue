<template>
  <v-data-table
    multi-sort
    :headers="headers"
    :items="allBooks"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:item.thumbnailUrl="{ item }">
      <!-- if the thumnail field is empty, show NA -->
      <div v-if="urlIsInvalid(item)">
        NA
      </div>
      <!-- Else the thumbbnail is not empty, display it -->
      <div v-else>
        <v-img :src="item.thumbnailUrl"> </v-img>
      </div>
    </template>
  </v-data-table>
</template>

<script>
// let index=0

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      index: 0,
      headers: [
        // {
        //   text: 'Index',
        //   value: "index",
        //   align: 'start',
        //   sortable: false,
        // },
        { text: "Title", value: "title" },
        { text: "Price (SGD)", value: "price" },
        { text: "Page count", value: "pageCount" },
        { text: "Thumbnail", value: "thumbnailUrl" },
        { text: "Authors", value: "authors" },
        { text: "Description", value: "shortDescription" },
      ],
    };
  },
  methods: {
    ...mapActions("moduleAllBooks", ["getAllBooksData"]),
    urlIsInvalid(item) {
      return item.thumbnailUrl == "" || item.thumbnailUrl == null;
    },
  },
  mounted() {
    this.getAllBooksData();
  },
  computed: {
    ...mapGetters("moduleAllBooks", {
      allBooks: "getAllBooksData",
    }),
  },
};
</script>
<style></style>
