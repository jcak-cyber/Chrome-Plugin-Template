<template>
  <n-message-provider>
    <div class="options-box">options</div>
  </n-message-provider>
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
</script>

<style lang="scss" scoped>
.options-box {
  width: 600px;
  padding: 12px;
  div {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
