<template>
  <div class="form">
    <input v-model="prompt" placeholder="Enter image prompt..." />
    <button @click="generateImage" :disabled="loading">Generate</button>
    <div v-if="loading">Generating...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const prompt = ref('');
const loading = ref(false);

const emit = defineEmits(['imageGenerated']);

async function generateImage() {
  if (!prompt.value) return;
  loading.value = true;

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt.value }),
  });

  const data = await response.json();
  emit('imageGenerated', data.imageUrl);
  loading.value = false;
}
</script>
