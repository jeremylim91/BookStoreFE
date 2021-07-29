<template>
  <div>
      <PageHeader>
          <template v-slot:header-content>
              All Books
          </template>
          <template v-slot:subheader>
              View and manage all books in your bookstore
          </template>
      </PageHeader>
      <AllBooksTable/>
  </div>
</template>

<script>
import PageHeader from '../HOCs/PageHeader.vue'
import AllBooksTable from './AllBooks-table.vue'
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

</style>