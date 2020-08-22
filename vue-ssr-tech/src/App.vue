<template>
  <div id="app">
    {{text}}
    <Header></Header>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Header from '../src/views/todo/header.vue'
export default {
  data() {
    return {
      text: "hello vue"
    }
  },
  components: {
    Header
  }
}
</script>
<style>
</style>