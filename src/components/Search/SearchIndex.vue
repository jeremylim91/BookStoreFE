<template>
  <div>
       <PageHeader class="test-header">
          <template v-slot:header-content>
              Search
          </template>
          <template v-slot:subheader>
              Find books by title or content
          </template>
      </PageHeader>
    <SearchBar/>
      
  </div>
</template>

<script>
import PageHeader from '../HOCs/PageHeader.vue'
import SearchBar from './SearchBar.vue'
export default {
    components:{
        PageHeader,
        SearchBar,
    },
    data(){
        return {

        }
    }, 

}
</script>

<style>

</style>