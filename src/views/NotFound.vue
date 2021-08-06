<template>
  <div>
    <PageHeader class="test-header">
      <template v-slot:headerContent>
        Error
      </template>
      <template v-slot:subheader>
        You've done it again haven't ya
      </template>
    </PageHeader>
    <div class="body">
      <h1>Not Found!</h1>
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        class="not-found-image"
      />
      <p>
        <a href="/">Go home?</a>
      </p>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/HOCs/PageHeader.vue";
export default {
  name: "NotFound",
  components: {
    PageHeader,
  },
};
</script>

<style scoped>
center {
  margin: 15vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}
.not-found-image {
  /* position: absolute; */
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
