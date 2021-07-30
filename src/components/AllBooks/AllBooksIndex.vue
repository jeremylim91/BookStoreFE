<template>
  <div>
      <PageHeader class="test-header">
          <template v-slot:header-content>
              All Books
          </template>
          <template v-slot:subheader>
              View and manage all books in your store
          </template>
      </PageHeader>
      <AllBooksTable/>
  </div>
</template>

<script>
import PageHeader from '../HOCs/PageHeader.vue'
import AllBooksTable from './AllBooksTable.vue'
export default {
    components:{
        PageHeader,
        AllBooksTable
    },
    data(){
        return {

        }
    }, 

}
</script>

<style>
.test-header{
    /* position: absolute; */
    position: sticky;
    top:0;
    z-index: 1;
    width: 100%;
}
@media only screen and (max-width: 960px) {
    .test-header{
        display: none;
    }
}
</style>