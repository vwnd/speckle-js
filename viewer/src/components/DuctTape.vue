<template>
  <div class="duct-tape"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.duct-tape {
  width: 800px;
  height: 80px;
  background:
    linear-gradient(135deg, #a9a9a9 25%, transparent 25%) -10px 0,
    linear-gradient(225deg, #a9a9a9 25%, transparent 25%) -10px 0,
    linear-gradient(315deg, #a9a9a9 25%, transparent 25%),
    linear-gradient(45deg, #a9a9a9 25%, transparent 25%);
  background-size: 2px 2px;
  background-color: #808080;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-10deg);
  z-index: 20; /* Ensure it is in front of the model */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
