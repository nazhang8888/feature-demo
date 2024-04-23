<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';

defineOptions({
  name: 'TablePage',
  components: { DataTable },
});
</script>

<template>
  <q-page class="flex flex-center">
    <DataTable />
  </q-page>
</template>
