<template>
  <Card>
    <CardContent class="pt-6">
      <div class="flex items-center justify-between pb-2">
        <h3 class="tracking-tight text-sm font-medium">Total Area</h3>
        <BoxIcon class="w-4 h-4 text-muted-foreground" />
      </div>
      <div class="text-2xl font-bold">
        {{ area.toLocaleString() }} {{ units }}
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { BoxIcon } from "lucide-vue-next";

defineProps<{
  area: number;
  units: string;
}>();
</script>
