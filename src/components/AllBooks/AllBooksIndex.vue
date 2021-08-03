<template>
  <div>
    <PageHeader class="test-header">
      <template v-slot:headerContent>
        All Books
      </template>
      <template v-slot:subheader>
        View and manage all books in your store
      </template>
    </PageHeader>
    <AllBooksTable :openDialog="openDialog" />
    <!-- <v-layout row justify-center> -->
    <v-dialog v-model="showDialog" persistent max-width="70%">
      <template v-slot:activator="{ on }">
        <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      </template>
      <v-card>
        <!-- <v-card-title class="headline"
          >Use Google's location service?</v-card-title
        >
        <v-card-text
          >Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.</v-card-text
        > -->
        <template v-if="showForm">
          <v-card-title>
            Create a new book entry
          </v-card-title>

          <v-form ref="form" v-model="valid" class="form" lazy-validation>
            <v-card-text>
              <v-text-field
                v-model="title"
                :rules="rules"
                counter="25"
                hint="This field uses counter prop"
                label="Book title"
              ></v-text-field>
              <v-text-field
                v-model="thumbnailUrl"
                hint="Please enter a valid URL"
                label="URL to book image"
              ></v-text-field>

              <v-text-field
                v-model="authors"
                :rules="rules"
                counter="25"
                hint="This field uses counter prop"
                label="Authors"
              ></v-text-field>
              <v-text-field
                v-model="price"
                :rules="numRules"
                counter="25"
                hint="Please enter a valid integer"
                label="Price (SGD)"
              ></v-text-field>
              <v-text-field
                v-model="shortDescription"
                :rules="rules"
                counter="25"
                hint="This field uses counter prop"
                label="Description"
              ></v-text-field>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Handle cancellation -->
            <v-btn color="green darken-1" plain @click="showDialog = false"
              >Cancel</v-btn
            >
            <!-- Trigger the preview to display -->
            <v-btn
              type="submit"
              color="green darken-1"
              :disabled="!valid"
              @click="validate"
              plain
              >Preview</v-btn
            >
          </v-card-actions>
        </template>
        <!-- Handle the preview -->
        <template v-else>
          <Card>
            <template v-slot:image>
              <v-img
                :aspect-ratio="16 / 9"
                contain
                :src="thumbnailUrl"
                class="imageClass"
              />
            </template>
            <template v-slot:title>
              {{ title }}
            </template>
            <template v-slot:subheader>
              {{ authors }}
            </template>
            <template v-slot:price>
              {{ price }}
            </template>
            <template v-slot:description>
              {{ shortDescription }}
            </template>
          </Card>

          <v-card-title> Preview </v-card-title>

          <v-card-text>
            blah blah
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Handle back-->
            <v-btn color="green darken-1" plain @click="showForm = true"
              >Back/Edit</v-btn
            >
            <v-btn color="green darken-1" plain @click="showForm = true"
              >Submit</v-btn
            >
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
    <!-- </v-layout> -->
  </div>
  <!-- <v-overlay :value="overlay"></v-overlay> -->
</template>

<script>
import PageHeader from "../HOCs/PageHeader.vue";
import AllBooksTable from "./AllBooksTable.vue";
import Card from "../HOCs/Card.vue";
// import { mapActions, mapGetters } from "vuex";
// import Card from "../HOCs/Card.vue";
export default {
  components: {
    PageHeader,
    AllBooksTable,
    Card,
  },
  data() {
    return {
      valid: false,
      showOverlay: false,
      showDialog: false,
      showForm: true,
      showPreview: false,
      authors: "",
      price: 0,
      shortDescription: "",
      title: "",
      thumbnailUrl: "",
      rules: [
        (v) => !!v || "This is a required field",
        (v) => v.length <= 25 || "Max 25 characters",
      ],
      numRules: [(v) => !isNaN(v) || "Please enter a valid integer"],
      // urlRules: [(v) => this.checkUrl(v) || "URL invalid"],
    };
  },
  methods: {
    // ...mapActions("moduleCreateBook", ["verifyUrl"]),

    // checkUrl(v) {
    //   this.verifyUrl(v);
    //   return this.isUrlValid;
    // },

    createPreview() {
      this.showPreview = true;
    },

    openDialog() {
      this.showDialog = true;
    },
    validate() {
      console.log("Validating the input....");
      console.log("this.$ref.form.valdiate() is:");
      this.$refs.form.validate();
      this.createPreview();
    },
    validateFormInput() {
      console.log(this.$refs.form.valdiate());
      this.createPreview();
    },
  },
  // computed: {
  //   ...mapGetters("moduleCreateBook", { isUrlValid: "getSearchResults" }),
  // },
};
</script>

<style>
.test-header {
  /* position: absolute; */
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
}
@media only screen and (max-width: 960px) {
  .test-header {
    display: none;
  }
}
</style>
