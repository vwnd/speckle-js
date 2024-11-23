<template>
  <Button
    variant="outline"
    size="icon"
    @click="captureScreenshot"
    class="absolute top-4 right-16 z-10 screenshot-hide"
    ><CameraIcon class="w-4 h-4"
  /></Button>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { CameraIcon } from "lucide-vue-next";

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

<style scoped></style>
