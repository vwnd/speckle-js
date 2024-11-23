<template>
  <div class="h-full w-full items-center justify-center relative">
    <Loader2
      class="animate-spin absolute inset-0 m-auto z-10"
      v-if="isLoading"
    />
    <ModelInfoCard
      v-if="!isLoading"
      :area="computedArea"
      units="ft²"
      class="fixed top-4 left-4 z-10"
    />
    <div id="viewer-container" ref="container" class="h-full w-full absolute" />
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
  ViewerEvent,
  type SelectionEvent,
} from "@speckle/viewer";
import { useToast } from "./ui/toast";
import ModelInfoCard from "./model/ModelInfoCard.vue";

const props = defineProps<{
  model: string;
}>();

const emit = defineEmits(["failed"]);
const isLoading = ref(false);
const selected = ref<string[]>([]);

const { toast } = useToast();

const container = ref<HTMLElement | null>(null);
const area = ref(0);
const viewerRef = ref<Viewer | null>(null);

const computedArea = computed(() => {
  if (selected.value.length === 0) {
    return area.value;
  } else {
    let selectedArea = 0;
    if (viewerRef.value) {
      const selectedNodes = viewerRef.value.getWorldTree().findAll((node) => {
        return selected.value.includes(node.model.id);
      });

      selectedArea = selectedNodes.reduce((acc, node) => {
        return acc + node.model.raw.area;
      }, 0);
    }

    if (selectedArea === 0) {
      return area.value;
    }
    return selectedArea;
  }
});

async function initViewer() {
  if (!container.value) return;

  const urls = await UrlHelper.getResourceUrls(
    props.model,
    import.meta.env.VITE_SPECKLE_TOKEN as string,
  );

  const viewer = new Viewer(container.value, DefaultViewerParams);
  viewerRef.value = viewer;

  viewer.createExtension(CameraController);

  const selection = viewer.createExtension(SelectionExtension);
  selection.options.selectionMaterialData = {
    color: 0x0d9488,
    opacity: 1,
    roughness: 1,
    metalness: 0,
    vertexColors: false,
    emissive: 0x0d9488,
    id: "selectionMaterial",
    lineWeight: 1,
  };

  viewer.on(ViewerEvent.ObjectClicked, (event: SelectionEvent | null) => {
    if (event) {
      selected.value = [event.hits[0].node.model.id];
    } else {
      selected.value = [];
    }
  });

  await viewer.init();

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

  for (const room of rooms) {
    const nodeId = room.model.id;
    const renderTree = viewer.getWorldTree().getRenderTree(nodeId)!;
    const rvs = renderTree.getRenderViewsForNode(room);

    const materialData = {
      color: 0x808080,
      opacity: 1,
      roughness: 1,
      metalness: 0,
      vertexColors: false,
    };

    viewer.speckleRenderer.setMaterial(rvs, materialData);
  }

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
  viewerRef.value?.dispose();
  viewerRef.value = null;
});
</script>

<style scoped></style>
