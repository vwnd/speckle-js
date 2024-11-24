<template>
  <Card class="w-[300px]">
    <CardContent class="pt-6">
      <!-- Total Area -->
      <div class="flex items-center justify-between pb-2">
        <h3 class="tracking-tight text-sm font-medium">Total Area</h3>
        <BoxIcon class="w-4 h-4 text-muted-foreground" />
      </div>
      <div class="text-2xl font-bold">
        {{ area.toLocaleString() }} {{ units }}
      </div>

      <!-- Levels -->
      <section v-if="levels.length > 0">
        <Separator class="my-4" />
        <div class="flex items-center justify-between pb-2">
          <h3 class="tracking-tight text-sm font-medium">Area by Levels</h3>
          <ChartBarIncreasingIcon class="w-4 h-4 text-muted-foreground" />
        </div>
        <div>LevelSelector</div>
      </section>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { BoxIcon, ChartBarIncreasingIcon } from "lucide-vue-next";
import Separator from "../ui/separator/Separator.vue";
import type { Level } from "@/lib/viewer/get-levels";

defineProps<{
  area: number;
  units: string;
  levels: Level[];
}>();
</script>
