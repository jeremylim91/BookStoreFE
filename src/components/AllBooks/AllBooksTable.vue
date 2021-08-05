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
        <v-img :src="item.thumbnailUrl" class="book-thumbnail" />
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <!-- if the thumnail field is empty, show NA -->
      <div class="actions-container">
        <!-- <EditBtn :handle-btn-click="handleEditBtnClick($event, item)" /> -->
        <v-btn
          class="mx-auto my-3"
          block
          color="primary"
          elevation="3"
          dark
          @click="handleEditBtnClick($event, item)"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
        <v-btn
          class="ma-auto"
          block
          color="error"
          plain
          @click="handleDeleteBtnClick($event, item)"
        >
          Delete
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
// import EditBtn from '../HOCs/EditBtn.vue';
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["openDialog", "updateSelectedBook", "closeDialog"],
  data() {
    return {
      index: 0,
      headers: [
        { text: "Title", value: "title" },
        { text: "Price (SGD)", value: "price" },
        { text: "Page count", value: "pageCount" },
        { text: "Thumbnail", value: "thumbnailUrl" },
        { text: "Authors", value: "authors" },
        { text: "Description", value: "shortDescription" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  methods: {
    ...mapActions("moduleAllBooks", ["getAllBooksData"]),
    urlIsInvalid(item) {
      return item.thumbnailUrl == "" || item.thumbnailUrl == null;
    },
    handleEditBtnClick(event, item) {
      this.updateSelectedBook(item);
      this.openDialog("edit");
    },
    handleDeleteBtnClick(event, item) {
      this.updateSelectedBook(item);
      this.openDialog("delete");
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
<style>
v-btn {
  padding: 5px 5px 5px;
}

.book-thumbnail {
  max-width: 150px;
}
tbody tr:nth-of-type(odd) {
  background-color: rgb(246, 249, 255);
}
</style>
