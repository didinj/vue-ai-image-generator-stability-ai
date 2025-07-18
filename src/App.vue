<template>
  <div class="container">
    <ImageForm @imageGenerated="image = $event" />
    <div v-if="image">
      <h2>Generated Image</h2>
      <img :src="image" alt="AI Generated" />
    </div>
  </div>
</template>

<script setup>
import ImageForm from './components/ImageForm.vue';
import { ref } from 'vue';

const image = ref('');
</script>
