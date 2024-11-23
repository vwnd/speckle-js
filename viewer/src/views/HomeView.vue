<script setup lang="ts">
import ModelInput from "@/components/ModelInput.vue";
import ModelViewer from "@/components/ModelViewer.vue";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-vue-next";
import { ref } from "vue";
import html2canvas from "html2canvas";

const model = ref<string | null>(null);

const clearModel = () => {
  model.value = null;
};

const captureScreenshot = async () => {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".screenshot-hide");
  buttons.forEach((button) => (button.style.display = "none"));

  const element = document.querySelector("main");
  if (!element) return;

  const canvas = await html2canvas(element);
  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "screenshot.png";
  link.click();

  buttons.forEach((button) => (button.style.display = ""));
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
      class="absolute top-4 right-4 z-10 screenshot-hide"
      >X</Button
    >
    <Button
      variant="outline"
      v-if="model"
      @click="captureScreenshot"
      class="absolute top-4 right-16 z-10 screenshot-hide"
      ><CameraIcon
    /></Button>

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
