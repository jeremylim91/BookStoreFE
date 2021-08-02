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
          :cols="book < 1 ? 12 : 3"
          v-for="book in searchResults"
          :key="book.id"
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
      booksToShow: [
        {
          id: 1,
          title: "Unlocking Android",
          pageCount: 416,
          thumbnailUrl:
            "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
          authors: ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
          shortDescription:
            "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
          price: 25,
        },
        {
          id: 2,
          title: "Android in Action, Second Edition",
          pageCount: 592,
          thumbnailUrl:
            "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg",
          authors: ["W. Frank Ableson", "Robi Sen"],
          shortDescription:
            "Android in Action, Second Edition is a comprehensive tutorial for Android developers. Taking you far beyond \"Hello Android,\" this fast-paced book puts you in the driver's seat as you learn important architectural concepts and implementation strategies. You'll master the SDK, build WebKit apps using HTML 5, and even learn to extend or replace Android's built-in features by building useful and intriguing examples. ",

          price: 40,
        },
        {
          id: 3,
          title: "Flex on Java",
          pageCount: 265,
          thumbnailUrl:
            "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allmon.jpg",
          authors: ["Bernerd Allmon", "Jeremy Anderson"],
          shortDescription:
            " A beautifully written book that is a must have for every Java Developer. Ashish Kulkarni, Technical Director, E-Business Software Solutions Ltd.",
          price: 24,
        },
        {
          id: 4,
          title: "Flex on Java",
          pageCount: 265,
          thumbnailUrl:
            "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allmon.jpg",
          authors: ["Bernerd Allmon", "Jeremy Anderson"],
          shortDescription:
            " A beautifully written book that is a must have for every Java Developer. Ashish Kulkarni, Technical Director, E-Business Software Solutions Ltd.",
          price: 24,
        },
        {
          id: 5,
          title: "Flex on Java",
          pageCount: 265,
          thumbnailUrl:
            "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allmon.jpg",
          authors: ["Bernerd Allmon", "Jeremy Anderson"],
          shortDescription:
            " A beautifully written book that is a must have for every Java Developer. Ashish Kulkarni, Technical Director, E-Business Software Solutions Ltd.",
          price: 24,
        },
      ],
    };
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
