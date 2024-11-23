<script setup lang="ts">
import ModelInput from "@/components/ModelInput.vue";
import ModelViewer from "@/components/ModelViewer.vue";
import { ref } from "vue";
import ScreenshotButton from "@/components/model/ScreenshotButton.vue";
import ExitButton from "@/components/model/ExitButton.vue";

const model = ref<string | null>(null);

const clearModel = () => {
  model.value = null;
};
</script>

<template>
  <main
    class="flex flex-col min-h-screen bg-background justify-center items-center"
  >
    <ExitButton v-if="model" @click="clearModel" />
    <ScreenshotButton v-if="model" />

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
