<template>
  <v-card class="mx-auto card" max-width="344">
    <slot class="image" name="image">
      <v-img
        src="https://www.metisgl.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
        alt="No image found"
      ></v-img>
    </slot>

    <v-card-text>
      <v-card-title class="title">
        <slot name="title">
          Default title
        </slot>
      </v-card-title>

      <v-card-subtitle class="subtitle">
        <slot name="subheader">
          Default authors
        </slot>
      </v-card-subtitle>
      <div class="details">
        <v-card-actions>
          <v-btn text color="teal accent-4" @click="reveal = !reveal">
            Learn More
          </v-btn>
        </v-card-actions>
        <div class="price-container">
          <span class="price">
            Price: $
            <slot name="price">
              NA
            </slot>
          </span>
        </div>
      </div>
    </v-card-text>

    <v-expand-transition class="transition">
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal v-card v-sheet theme--light"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Description
          </p>
          <p>
            <slot name="description"> This is the default description</slot>
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="teal accent-4" @click="reveal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    reveal: false,
  }),
};
</script>

<style>
.details {
  display: flex;
  justify-content: space-between;
}

.price-container {
  display: flex;
  align-items: center;
  max-width: 35%;
}

span {
  width: 100%;
  text-overflow: ellipsis;
  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
}
.card {
  height: 100%;
}
.v-card--reveal {
  overflow-y: auto;
  scrollbar-color: light;
  scrollbar-width: 2px;
}
/* .transition {
  overflow-y: scroll;
} */
/* .image {
  background-color: aliceblue;
} */

.title {
  white-space: break-spaces;
  word-break: normal !important;
}
</style>
