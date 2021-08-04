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
    <AllBooksTable
      :open-dialog="openDialog"
      :update-selected-book="updateSelectedBook"
    />
    <!-- <v-layout row justify-center> -->
    <v-dialog v-model="showDialog" persistent max-width="70%">
      <template v-slot:activator="{ on }">
        <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      </template>
      <MultiStepForm
        ref="multiStepForm"
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
        <template v-slot:cancelBtn>
          <v-btn text color="green darken-2" @click="closeDialog">
            Close
          </v-btn>
        </template>
        <template v-slot:submitBtn>
          <v-btn color="green darken-2" text @click="prepDataAndSubmit()">
            Update details
          </v-btn>
        </template>
        <template v-slot:completionBtn>
          <v-btn text color="green darken-2" @click="closeDialog">
            Close
          </v-btn>
        </template>
      </MultiStepForm>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      Book has been modified
      <template v-slot:action="{ attrs }">
        <!-- eslint-disable-next-line -->
        <v-btn color="blue" text v-bind="attrs" @click="closeSnackBar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- </v-layout> -->
  </div>
  <!-- <v-overlay :value="overlay"></v-overlay> -->
</template>

<script>
import PageHeader from '../HOCs/PageHeader.vue';
import AllBooksTable from './AllBooksTable.vue';
import MultiStepForm from '../HOCs/MultiStepForm.vue';
import { mapActions } from 'vuex';

// import { mapActions, mapGetters } from "vuex";
// import Card from "../HOCs/Card.vue";
export default {
  components: {
    PageHeader,
    AllBooksTable,
    MultiStepForm,
  },
  data() {
    return {
      // ====Snack bar=====
      snackbar: false,
      timeout: 5000,
      // =====================
      valid: false,
      showOverlay: false,
      showDialog: false,
      // =====Form inputs=====
      authors: '',
      price: 0,
      shortDescription: '',
      title: '',
      thumbnailUrl: '',
      isFormSubmitted: false,
      id: '',
      // =====================
      // ==Validation rules===
      textRules: [
        (v) => !!v || 'This is a required field',
        (v) => v.length <= 50 || 'Max 25 characters',
      ],
      descriptionRules: [
        (v) => !!v || 'This is a required field',
        (v) => v.length <= 500 || 'Max 500 characters',
      ],
      numRules: [
        (v) => !isNaN(v) || 'Please enter a valid integer',
        (v) => v !== '' || 'Please enter a valid integer',
      ],
    };
  },
  methods: {
    // ...mapActions("moduleCreateBook", ["verifyUrl"]),

    // checkUrl(v) {
    //   this.verifyUrl(v);
    //   return this.isUrlValid;
    // },
    ...mapActions('moduleUpdateBook', {
      updateBook: 'updateBook',
    }),
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      // Trigger the reset form method in the HOC
      this.$refs.multiStepForm.resetForm();
      // toggle isFormSubmitted so that when the card is opened next, it will display the cancel/submit instead of the post-submit btn
      this.isFormSubmitted = false;
      // Close the dialog
      this.showDialog = false;
    },
    validate() {
      this.$refs.form.validate();
      this.createPreview();
    },
    // validateFormInput() {
    //   console.log(this.$refs.form.valdiate());
    //   this.createPreview();
    // },
    updateSelectedBook(selectedBook) {
      this.title = selectedBook.title;
      this.authors = selectedBook.authors;
      this.shortDescription = selectedBook.shortDescription;
      this.price = selectedBook.price;
      this.thumbnailUrl = selectedBook.thumbnailUrl;
      this.id = selectedBook.id;
    },
    prepDataAndSubmit() {
      // Check if authors is an array, else convert from a string to an array of strings
      let authorsArray = this.authors;
      if (!Array.isArray(authorsArray)) {
        authorsArray = authorsArray.split(',');
      }

      // Switch the state to show the form has been subitted
      this.isFormSubmitted = true;

      this.updateBook({
        title: this.title,
        thumbnailUrl: this.thumbnailUrl,
        authors: authorsArray,
        price: this.price,
        shortDescription: this.shortDescription,
        id: this.id,
      });
      this.snackbar = true;
    },
    resetFormFields() {
      this.isFormSubmitted = false;
      this.title = '';
      this.thumbnailUrl = '';
      this.authors = '';
      this.price = null;
      this.shortDescription = '';
    },
    closeSnackBar() {
      this.snackbar = false;
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
