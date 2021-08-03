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

    <template v-if="showForm">
      <v-card outlined elevation="6" class="book-details">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" :step="1" editable>
              Input details
            </v-stepper-step>
            <v-divider></v-divider>
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
                      :rules="textRules"
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
                      :rules="textRules"
                      counter="25"
                      hint="This field uses counter prop"
                      label="Description"
                    ></v-text-field>
                  </v-card-text>
                </v-form>
                <!-- <v-card-actions>
                  <v-spacer></v-spacer> -->
                <!-- Handle cancellation -->
                <!-- <v-btn color="green darken-1" plain @click="reset"
                  >Cancel</v-btn
                > -->
                <!-- Trigger the preview to display -->
                <!-- <v-btn
                    color="green darken-1"
                    :disabled="!valid"
                    @click="validate"
                    plain
                    >Preview</v-btn
                  >
                </v-card-actions> -->
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="green darken-2">
                  Cancel
                </v-btn>
                <v-btn
                  color="green darken-2"
                  :disabled="!valid"
                  @click="
                    () => {
                      e1 = 2;
                      validate();
                    }
                  "
                  text
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
            <v-stepper-content :step="2">
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
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </template>
  </div>
</template>

<script>
import PageHeader from "../HOCs/PageHeader.vue";
import Card from "../HOCs/Card.vue";
export default {
  components: {
    PageHeader,
    Card,
  },
  data() {
    return {
      e1: 1,
      valid: false,
      // showOverlay: false,
      showForm: true,
      // showPreview: false,
      authors: "",
      price: 0,
      shortDescription: "",
      title: "",
      thumbnailUrl: "",
      textRules: [
        (v) => !!v || "This is a required field",
        (v) => v.length <= 25 || "Max 25 characters",
      ],
      numRules: [(v) => !isNaN(v) || "Please enter a valid integer"],
      // urlRules: [(v) => this.checkUrl(v) || "URL invalid"],
    };
  },
  createPreview() {
    this.showPreview = true;
  },
  validate() {
    console.log("Validating the input....");
    console.log("this.$ref.form.valdiate() is:");
    this.$refs.form.validate();
    this.createPreview();
  },
};
</script>

<style scoped>
.book-details {
  width: 80%;
  margin: 10px auto 0px;
}
</style>
