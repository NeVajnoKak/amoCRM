<template>
  <div>
    <Table></Table>
  </div>
</template>

<script lang="ts">
import 'bootstrap'
import { defineComponent } from 'vue';
import Table from './components/Table/Table.vue';
export default defineComponent({
  name: 'App',
  components: {
    Table
  }
});
</script>

<style>

</style>
