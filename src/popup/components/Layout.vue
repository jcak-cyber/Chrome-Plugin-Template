<template>
  <div class="layout">
    <n-message-provider>
      layout
    </n-message-provider>
    <Loading />
  </div>
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import Loading from "../../hooks/useLoading";

</script>

<style lang="scss" scoped>
.layout {
  width: 450px;
  padding: 16px;
}
</style>
