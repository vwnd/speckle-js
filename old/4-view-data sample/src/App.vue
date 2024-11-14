<script setup lang="ts">
import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
} from "@speckle/viewer";
import { onMounted, useTemplateRef } from "vue";

const container = useTemplateRef("viewer-container");

onMounted(async () => {
  if (!container.value) return;

  /** Configure the viewer params */
  const params = DefaultViewerParams;
  params.showStats = false;
  params.verbose = false;

  /** Create Viewer instance */
  const viewer = new Viewer(container.value, params);

  /** Initialize the Viewer */
  await viewer.init();

  /** Add extensions */
  viewer.createExtension(CameraController);
  viewer.createExtension(SelectionExtension);

  /** Create loader */
  const urls = await UrlHelper.getResourceUrls(
    "https://app.speckle.systems/projects/09c17a606e/models/c205848608"
  );

  for (const url of urls) {
    const loader = new SpeckleLoader(
      viewer.getWorldTree(),
      url,
      import.meta.env.VITE_SPECKLE_TOKEN
    );
    await viewer.loadObject(loader, true);
  }
});
</script>

<template>
  <div class="p-6 flex flex-col min-h-screen bg-gray-50 gap-4">
    <h1 class="text-3xl font-bold">View Data Sample</h1>
    <div ref="viewer-container" class="bg-blue-100 flex-1 rounded-3xl"></div>
  </div>
</template>

<style scoped></style>
