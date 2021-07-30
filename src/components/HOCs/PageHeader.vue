<template>
  <div class="page-header">
      <div class="container">
      <h1>
          <slot :class="headerContent" :name="headerContent" > This is the default header</slot>
      </h1>
        <v-subheader>
            <slot :class="subheader" :name="subheader" >This is the default subheader</slot>
        </v-subheader>
    </div>
  </div>
</template>

<script>
export default {
    name: "PageHeader",
    data(){
        return{
            headerContent:"header-content",
            subheader:"subheader"
        }
    }

}
</script>

<style scoped>

.page-header{
background-color: #808ea3;
color: whitesmoke;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.container{
    max-width: 500px;
    margin-left: 30px;
}
</style>