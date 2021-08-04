<template>
  <v-card outlined elevation="6" class="book-details">
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
                <slot name="header">
                  Insert card header
                </slot>
              </v-card-title>
              <v-card-text>
                <slot name="title">
                  Insert text field for title
                </slot>
                <slot name="thumbnailUrl">
                  Insert text field for thumbnail
                </slot>
                <slot name="authors">
                  Insert text field for authors
                </slot>
                <slot name="price">
                  Insert text field for price
                </slot>
                <slot name="shortDescription">
                  Insert text field for short description
                </slot>
              </v-card-text>
            </v-form>
          </v-card>
          <v-card-actions>
            <v-spacer />
            <slot name="cancelBtn">
              <v-btn text color="green darken-2" @click="resetValidation">
                Cancel
              </v-btn>
            </slot>
            <slot name="continue">
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
            </slot>
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
          </Card>
          <!-- Create buttons for second page of form -->
          <slot name="cardActions">
            <v-card-actions>
              <template v-if="!isFormSubmitted">
                <v-spacer />
                <slot name="backBtn">
                  <v-btn text color="green darken-2" @click="e1 = 1">
                    Back
                  </v-btn>
                </slot>
                <slot name="submitBtn">
                  <v-btn
                    color="green darken-2"
                    :disabled="!valid"
                    text
                    @click="prepDataAndSubmit()"
                  >
                    Create
                  </v-btn>
                </slot>
                <v-spacer />
              </template>
              <template v-else>
                <v-spacer />
                <slot name="completionBtn">
                  <v-btn text color="green darken-2" @click="resetForm">
                    Add another
                  </v-btn>
                </slot>
                <v-spacer />
              </template>
            </v-card-actions>
          </slot>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import Card from './Card.vue';
export default {
  components: {
    Card,
  },
  props: {
    isFormSubmitted: Boolean,
    // eslint-disable-next-line
    // validate: Function,
    // eslint-disable-next-line
    prepDataAndSubmit: Function,
    thumbnailUrl: String,
    // eslint-disable-next-line
    price: Number,
    // eslint-disable-next-line
    authors: [String, Array],
    // eslint-disable-next-line
    title: String,
    // eslint-disable-next-line
    shortDescription: String,
    resetFormFields: Function,
  },
  data() {
    return {
      // ===form flow====
      e1: 1,
      valid: false,
      // =====================
    };
  },
  methods: {
    validate() {
      console.log('Validating the input....');
      this.$refs.form.validate();
    },
    resetValidation() {
      this.resetFormFields();
      this.$refs.form.resetValidation();
    },

    resetForm() {
      console.log('Resetting the form...');
      this.$refs.form.reset();
      this.e1 = 1;
      this.resetFormFields();
    },
  },
};
</script>

<style></style>
