<script setup lang="ts">
import ModelInput from "@/components/ModelInput.vue";
import ModelViewer from "@/components/ModelViewer.vue";
import { Button } from "@/components/ui/button";
import { ref } from "vue";

const model = ref<string | null>(null);

const clearModel = () => {
  model.value = null;
};
</script>

<template>
  <main
    class="flex flex-col min-h-screen bg-background justify-center items-center"
  >
    <Button
      variant="outline"
      v-if="model"
      @click="model = null"
      class="absolute top-4 right-4 z-10"
      >X</Button
    >
    <ModelViewer
      v-if="model"
      :model="model"
      @failed="clearModel"
      class="flex-1"
    />
    <ModelInput
      v-else
      @load="
        (url) => {
          model = url;
        }
      "
    />
  </main>
</template>
