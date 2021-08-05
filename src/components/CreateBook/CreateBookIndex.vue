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

    <!-- <v-card outlined elevation="6" class="book-details">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" :step="1" editable>
            Input details
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="e1 > 2" :step="2" :editable="valid">
            Preview
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content :step="1">
            <v-card class="mb-12">
              <v-form ref="form" v-model="valid" class="form">
                <v-card-title>
                  Create a new book entry
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="title"
                    :rules="textRules"
                    counter="50"
                    label="Book title"
                  />
                  <v-text-field
                    v-model="thumbnailUrl"
                    hint="Please enter a valid URL"
                    label="URL to book image"
                  />

                  <v-text-field
                    v-model="authors"
                    :rules="textRules"
                    counter="50"
                    label="Authors"
                  />
                  <v-text-field
                    v-model="price"
                    :rules="numRules"
                    counter="25"
                    hint="Please enter a valid integer"
                    label="Price (SGD)"
                  />
                  <v-text-field
                    v-model="shortDescription"
                    :rules="descriptionRules"
                    counter="500"
                    label="Description"
                  />
                </v-card-text>
              </v-form>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn text color="green darken-2">
                Cancel
              </v-btn>
              <v-btn
                color="green darken-2"
                :disabled="!valid"
                text
                @click="
                  () => {
                    e1 = 2;
                    validate();
                  }
                "
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-stepper-content>
          <v-stepper-content :step="2">
            <Card class="preview-card my-5">
              <template v-slot:image>
                <v-img
                  v-if="thumbnailUrl"
                  :aspect-ratio="16 / 9"
                  contain
                  :src="thumbnailUrl"
                  class="imageClass"
                />
                <v-img
                  v-else
                  contain
                  src="https://www.metisgl.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
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
            </Card> -->
    <!-- Create buttons for second page of form -->
    <!-- <v-card-actions>
              <template v-if="!isFormSubmitted">
                <v-spacer />
                <v-btn text color="green darken-2" @click="e1 = 1">
                  Back
                </v-btn>
                <v-btn
                  color="green darken-2"
                  :disabled="!valid"
                  text
                  @click="prepDataAndSubmit()"
                >
                  Create
                </v-btn>
                <v-spacer />
              </template>
              <template v-else>
                <v-spacer />
                <v-btn text color="green darken-2" @click="resetForm">
                  Add another
                </v-btn>
                <v-spacer />
              </template>
            </v-card-actions>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card> -->
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
    <!-- eslint-disable-next-line -->
    <v-snackbar v-model="snackbarFromStore" :timeout="timeout">
      {{ getSnackbarContent }}
      <template v-slot:action="{ attrs }">
        <!-- eslint-disable-next-line -->
        <v-btn color="blue" text v-bind="attrs" @click="closeSnackBar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import PageHeader from "../HOCs/PageHeader.vue";
// import Card from '../HOCs/Card.vue';
import { mapActions, mapGetters } from "vuex";
import MultiStepForm from "../HOCs/MultiStepForm.vue";

export default {
  components: {
    PageHeader,
    MultiStepForm,
    // Card,
  },
  data() {
    return {
      // ====Snack bar=====
      timeout: 5000,
      // =====================
      // ===multistep form====
      // e1: 1,
      // valid: false,
      // =====================
      // =====Form inputs=====
      authors: "",
      price: 0,
      shortDescription: "",
      title: "",
      thumbnailUrl: "",
      // =====================
      // ==Validation rules===
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
      // urlRules: [(v) => this.checkUrl(v) || "URL invalid"],
      // ======================
      // ==Determine which button to show
      isFormSubmitted: false,
      // ======================
    };
  },
  computed: {
    ...mapGetters("moduleCreateBook", { isBookAdded: "getIsBookAdded" }),
    ...mapGetters("moduleSnackbar", {
      getSnackbarContent: "getSnackbarContent",
    }),
    snackbarFromStore: {
      get() {
        return this.$store.state.moduleSnackbar.snackbar;
      },
      set(value) {
        this.$store.dispatch("moduleSnackbar/setSnackbar", value);
      },
    },
    // snackbar() {
    //   return this.isBookAdded;
    // },
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
      console.log("authorsArray is:");
      console.log(authorsArray);

      // Switch the state to show the form has been subitted
      this.isFormSubmitted = true;

      // Set the message that will be displayed in the snackbar
      this.setSnackbarContent(
        `${this.title} was successfully added to your store`
      );

      this.createBook({
        title: this.title,
        thumbnailUrl: this.thumbnailUrl,
        authors: authorsArray,
        price: this.price,
        shortDescription: this.shortDescription,
      });
    },
    resetFormFields() {
      this.isFormSubmitted = false;
      this.title = "";
      this.thumbnailUrl = "";
      this.authors = "";
      this.price = null;
      this.shortDescription = "";

      // // Reset form fields
      // this.$refs.form.reset();
      // // Update the state of the form
      // this.isFormSubmitted = false;
      // // Update which portion of the multistep form should be displayed
      // this.e1 = 1;
    },
    closeSnackBar() {
      this.snackbar = false;
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
