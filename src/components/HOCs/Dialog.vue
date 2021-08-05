<template>
  <v-dialog v-model="openDialog" max-width="70%">
    <slot name="dialogbody">
      <v-card>
        <v-card-title>
          <slot name="dialogTitle"> This is the defaul card title</slot>
        </v-card-title>
        <v-card-text>
          <slot name="dialogMessage"> This is the default card text</slot>
        </v-card-text>
      </v-card>
    </slot>
  </v-dialog>
</template>

<script>
export default {
  props: ["openDialog", "closeDialog"],
};
</script>

<style></style>
