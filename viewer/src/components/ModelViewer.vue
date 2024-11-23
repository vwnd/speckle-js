<template>
  <div class="h-full w-full items-center justify-center relative">
    <Loader2
      class="animate-spin absolute inset-0 m-auto z-10"
      v-if="isLoading"
    />
    <div id="viewer-container" ref="container" class="h-full w-full absolute" />
    <dir v-if="!isLoading">Model Area: {{ area.toLocaleString() }}</dir>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import {
  CameraController,
  DefaultViewerParams,
  SpeckleLoader,
  UrlHelper,
  Viewer,
} from "@speckle/viewer";
import { useToast } from "./ui/toast";

const props = defineProps<{
  model: string;
}>();

const emit = defineEmits(["failed"]);
const isLoading = ref(false);

const { toast } = useToast();

const container = ref<HTMLElement | null>(null);
const area = ref(0);

async function initViewer() {
  if (!container.value) return;

  const urls = await UrlHelper.getResourceUrls(
    props.model,
    import.meta.env.VITE_SPECKLE_TOKEN as string,
  );

  const viewer = new Viewer(container.value, DefaultViewerParams);
  await viewer.init();

  viewer.createExtension(CameraController);

  for (const url of urls) {
    const loader = new SpeckleLoader(
      viewer.getWorldTree(),
      url,
      import.meta.env.VITE_SPECKLE_TOKEN as string,
    );
    await viewer.loadObject(loader, true);
  }

  const rooms = viewer.getWorldTree().findAll((node) => {
    if (!node.model.raw.speckle_type) return;
    return node.model.raw.speckle_type.includes("Room");
  });

  area.value = rooms.reduce((acc, room) => {
    return acc + room.model.raw.area;
  }, 0);
}

onMounted(async () => {
  try {
    isLoading.value = true;
    await initViewer();
    toast({
      title: "Model loaded",
      description: "Model has been loaded successfully.",
    });
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    emit("failed");
    toast({
      title: "Error loading model",
      description: "Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  toast({
    title: "Viewer unmounted",
    description: "Viewer has been unmounted.",
  });
});
</script>

<style scoped></style>
