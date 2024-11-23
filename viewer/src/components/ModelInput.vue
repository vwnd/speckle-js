<template>
  <div>
    <div class="flex w-full max-w-sm items-center gap-1.5">
      <Input
        id="model"
        type="text"
        placeholder="Model URL"
        v-model="model"
        class="w-[400px]"
      />
      <Button type="submit" @click="handleLoadModel"> Load </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ref } from "vue";

const model = ref<string>(
  "https://app.speckle.systems/projects/9ff253b70b/models/f09b6887fc",
);
const { toast } = useToast();

const emit = defineEmits<{
  load: [value: string];
}>();

function handleLoadModel() {
  emit("load", model.value);
  toast({
    title: "Loading model",
    description: "Please wait while we load the model.",
  });
}
</script>
