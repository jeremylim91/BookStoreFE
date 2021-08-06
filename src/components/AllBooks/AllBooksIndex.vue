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
      :openDialog="openDialog"
      :updateSelectedBook="updateSelectedBook"
      :closeDialog="closeDialog"
      :isLoading="isLoading"
    />
    <v-dialog v-model="showEditDialog" persistent max-width="70%">
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
          <v-btn text color="green darken-2" @click="closeDialog('edit')">
            Close
          </v-btn>
        </template>
        <template v-slot:submitBtn>
          <v-btn color="green darken-2" text @click="prepDataAndSubmit()">
            Update details
          </v-btn>
        </template>
        <template v-slot:completionBtn>
          <v-btn text color="green darken-2" @click="closeDialog('edit')">
            Close
          </v-btn>
        </template>
      </MultiStepForm>
    </v-dialog>
    <Snackbar />

    <v-dialog v-model="showDeleteDialog" max-width="70%">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title>
          <v-spacer />
          Are you sure you want to delete '{{ title }}'?
          <v-spacer />
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="green darken-2" @click="closeDialog('delete')">
            Cancel
          </v-btn>
          <v-btn color="green darken-2" text @click="handleBookDeletion()">
            Delete
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PageHeader from "../HOCs/PageHeader.vue";
import AllBooksTable from "./AllBooksTable.vue";
import MultiStepForm from "../HOCs/MultiStepForm.vue";
import { mapActions, mapGetters } from "vuex";
import Snackbar from "../HOCs/Snackbar.vue";

export default {
  components: {
    PageHeader,
    AllBooksTable,
    MultiStepForm,
    Snackbar,
  },
  data() {
    return {
      // ====Table=====
      isLoading: false,
      // ====Dialogs=====
      showDeleteDialog: false,
      showEditDialog: false,

      // =====Form inputs=====
      authors: "",
      price: 0,
      shortDescription: "",
      title: "",
      thumbnailUrl: "",
      isFormSubmitted: false,
      id: "",
      // =====================
      // ==Validation rules===
      valid: false,
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
    };
  },
  computed: {
    // ...mapGetters("moduleSnackbar", { snackbarFromStore: "getSnackbar" }),
    snackbarFromStore: {
      get() {
        return this.$store.state.moduleSnackbar.snackbar;
      },
      set(value) {
        this.$store.dispatch("moduleSnackbar/setSnackbar", value);
      },
    },
    ...mapGetters("moduleSnackbar", {
      getSnackbarContent: "getSnackbarContent",
    }),
  },
  methods: {
    // Currently not working; intent was to check if book url is valid, else show "img not found" on card
    // checkUrl(v) {
    //   this.verifyUrl(v);
    //   return this.isUrlValid;
    // },
    ...mapActions("moduleUpdateBook", {
      updateBook: "updateBook",
    }),
    ...mapActions("moduleAllBooks", {
      deleteBook: "deleteBook",
    }),
    ...mapActions("moduleSnackbar", {
      setSnackbarContent: "setSnackbarContent",
    }),

    handleBookDeletion() {
      console.log(`this.id is:`);
      console.log(this.id);
      this.deleteBook(this.id);
      this.closeDialog("delete");

      // Trigger the snackbar
      // Set the snackbar content
      this.setSnackbarContent(`"${this.title}" was deleted`);
      // Trigger the snackbar
      // this.snackbar = true;
    },
    /**
     * @param {String} selectedDialog should signal whether the user is intending to trigger the dialog for the "edit" button or the "delete" button
     */
    openDialog(selectedDialog) {
      if (selectedDialog === "edit") {
        this.showEditDialog = true;
      } else if (selectedDialog === "delete") {
        this.showDeleteDialog = true;
      }
    },

    /**
     * @param {String} selectedDialog should signal whether the user is intending to close the dialog for the "edit" button or the "delete" button
     */
    closeDialog(selectedDialog) {
      if (selectedDialog === "edit") {
        // Trigger the reset form method in the HOC
        this.$refs.multiStepForm.resetForm();
        // toggle isFormSubmitted so that when the card is opened next, it will display the cancel/submit instead of the post-submit btn
        this.isFormSubmitted = false;
        // Close the dialog
        this.showEditDialog = false;
      } else if (selectedDialog === "delete") {
        this.showDeleteDialog = false;
      }
    },

    // validateFormInput() {
    //   this.$refs.form.valdiate();
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
        authorsArray = authorsArray.split(",");
      }

      // Set the snackbar content tha will fire if the DB query is successful
      this.setSnackbarContent("Book has been modified");
      // Switch the state to show the form has been subitted
      this.isFormSubmitted = true;
      // execute the updateBook method from the store
      this.updateBook({
        title: this.title,
        thumbnailUrl: this.thumbnailUrl,
        authors: authorsArray,
        price: this.price,
        shortDescription: this.shortDescription,
        id: this.id,
      });
    },
    resetFormFields() {
      this.isFormSubmitted = false;
      this.title = "";
      this.thumbnailUrl = "";
      this.authors = "";
      this.price = null;
      this.shortDescription = "";
    },
    closeSnackBar() {
      console.log("trying to close snackbar:");
      this.snackbarFromStore = false;
    },
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<style>
.test-header {
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
}
</style>
