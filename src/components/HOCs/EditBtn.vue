<template>
  <v-btn
    class="mx-auto my-3"
    block
    color="primary"
    elevation="3"
    dark
    @click="handleBtnClick"
  >
    <v-icon left>
      mdi-pencil
    </v-icon>
    Edit
  </v-btn>
</template>

<script>
export default {
  props: ['handleBtnClick'],
  // methods: {
  //   handleBtnClick() {
  //     this.openDialog();
  //     this.updateSelectedBook();
  //   },
  // },
};
</script>

<style></style>
