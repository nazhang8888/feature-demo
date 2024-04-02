<template>
  <div class="q-px-md q-pb-none" style="max-width: 350px">
    <q-list bordered>
      <q-item class="justify-start">
        <q-item-label class="item-center self-center col-grow">
          {{ todo.title }}
        </q-item-label>
        <div class="row">
          <q-item-section avatar class="q-pr-none q-pl-md items-center">
            <q-icon :color="props.color" name="favorite" />
            Favorite
          </q-item-section>
          <q-item-section avatar class="q-pr-none q-pl-md items-center">
            <q-icon :color="props.color" name="done" />
            Done
          </q-item-section>
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
defineOptions({
  name: "TodoCard",
});

const props = defineProps({
  todo: Object,
  color: String,
});
</script>
