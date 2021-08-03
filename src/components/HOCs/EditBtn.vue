<template>
  <v-btn
    class="mx-auto my-3"
    block
    color="primary"
    elevation="3"
    dark
    @click="openDialog"
  >
    <v-icon left>
      mdi-pencil
    </v-icon>
    Edit
  </v-btn>
</template>

<script>
export default {
  props: ["openDialog"],
};
</script>

<style></style>
