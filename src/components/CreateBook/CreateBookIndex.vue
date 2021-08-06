<template>
  <div>
    <PageHeader class="test-header">
      <template v-slot:headerContent>
        Create
      </template>
      <template v-slot:subheader>
        Add a new entry to your store
      </template>
    </PageHeader>

    <MultiStepForm
      :is-form-submitted="isFormSubmitted"
      :prep-data-and-submit="prepDataAndSubmit"
      :title="title"
      :authors="authors"
      :price="price"
      :short-description="shortDescription"
      :thumbnail-url="thumbnailUrl"
      :reset-form-fields="resetFormFields"
    >
      <template v-slot:title>
        <v-text-field
          v-model.trim="title"
          :rules="textRules"
          counter="50"
          label="Book title"
        />
      </template>
      <template v-slot:thumbnailUrl>
        <v-text-field
          v-model.trim="thumbnailUrl"
          hint="Please enter a valid URL"
          label="URL to book image"
        />
      </template>
      <template v-slot:authors>
        <v-text-field
          v-model="authors"
          :rules="textRules"
          counter="50"
          label="Authors"
        />
      </template>
      <template v-slot:price>
        <v-text-field
          v-model.number="price"
          :rules="numRules"
          counter="25"
          hint="Please enter a valid integer"
          label="Price (SGD)"
        />
      </template>
      <template v-slot:shortDescription>
        <v-text-field
          v-model.trim="shortDescription"
          :rules="descriptionRules"
          counter="500"
          label="Description"
        />
      </template>
    </MultiStepForm>
    <Snackbar />
  </div>
</template>

<script>
import PageHeader from "../HOCs/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";
import MultiStepForm from "../HOCs/MultiStepForm.vue";
import Snackbar from "../HOCs/Snackbar.vue";
export default {
  components: {
    PageHeader,
    MultiStepForm,
    Snackbar,
  },
  data() {
    return {
      // =====Form inputs=====================
      authors: "",
      price: 0,
      shortDescription: "",
      title: "",
      thumbnailUrl: "",
      // ======================================
      // ======Form Validation rules==========
      textRules: [
        (v) => !!v || "This is a required field",
        (v) => v.length <= 50 || "Max 25 characters",
      ],
      descriptionRules: [
        (v) => !!v || "This is a required field",
        (v) => v.length <= 500 || "Max 500 characters",
      ],
      numRules: [
        (v) => !isNaN(v) || "Please enter a valid integer",
        (v) => v !== "" || "Please enter a valid integer",
      ],
      // ======================================
      // =====Card============================
      // set a variable that will determine whether to display the "add another" button on the card
      isFormSubmitted: false,
      // ====================================
    };
  },
  computed: {
    ...mapGetters("moduleCreateBook", { isBookAdded: "getIsBookAdded" }),
  },
  methods: {
    ...mapActions("moduleCreateBook", {
      createBook: "createBook",
    }),
    ...mapActions("moduleSnackbar", {
      setSnackbarContent: "setSnackbarContent",
    }),

    validate() {
      console.log("Validating the input....");
      this.$refs.form.validate();
    },

    prepDataAndSubmit() {
      // Convert authors from a string to an array of strings
      const authorsArray = this.authors.split(",");

      // Switch the state to show the form has been subitted
      this.isFormSubmitted = true;

      // Set the message that will be displayed in the snackbar
      this.setSnackbarContent(
        `${this.title} was successfully added to your store`
      );
      // Dispatch book data to store to add to Db
      this.createBook({
        title: this.title,
        thumbnailUrl: this.thumbnailUrl,
        authors: authorsArray,
        price: this.price,
        shortDescription: this.shortDescription,
      });
    },
    // Empty all states holding information about a book
    resetFormFields() {
      this.isFormSubmitted = false;
      this.title = "";
      this.thumbnailUrl = "";
      this.authors = "";
      this.price = null;
      this.shortDescription = "";
    },
  },
};
</script>

<style scoped>
.book-details {
  width: 80%;
  margin: 10px auto 0px;
}
</style>
