<script setup lang="ts">
import { computed } from 'vue';
import RoundGlasses from './RoundGlasses.vue';
import TinyGlasses from './TinyGlasses.vue';
import Shades from './Shades.vue';

export type AccessoryType = 'none' | 'round-glasses' | 'tiny-glasses' | 'shades';

const props = defineProps<{
  type: AccessoryType;
}>();

const accessoryComponent = computed(() => {
  return {
    'none': null,
    'round-glasses': RoundGlasses,
    'tiny-glasses': TinyGlasses,
    'shades': Shades,
  }[props.type];
});
</script>

<template>
  <component 
    v-if="accessoryComponent !== null"
    :is="accessoryComponent"
  />
</template>
