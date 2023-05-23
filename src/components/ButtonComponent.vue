<template>

      <button v-if="!showConfirmation" @click="showConfirmation = true" class="bg-red-400">Unfriend</button>
      <button v-if="showConfirmation" @click="showConfirmation = false" class="bg-red-400">Confirm</button>

      {{ showConfirmation }}

  </template>
  
  <script>

  
  export default {
    name: 'ButtonComponent',

    data() {
      return {
        showConfirmation: false,
      }
    }
  }
  </script>
  