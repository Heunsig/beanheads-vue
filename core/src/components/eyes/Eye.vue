<script setup lang="ts">
import { computed } from 'vue';
import ContentEyes from './ContentEyes.vue';
import DizzyEyes from './DizzyEyes.vue';
import HappyEyes from './HappyEyes.vue';
import HeartEyes from './HeartEyes.vue';
import LeftTwitchEyes from './LeftTwitchEyes.vue';
import NormalEyes from './NormalEyes.vue';
import SimpleEyes from './SimpleEyes.vue';
import SquintEyes from './SquintEyes.vue';
import Wink from './Wink.vue';
import Cyborg from './Cyborg.vue';

export type EyeType = 'content-eyes' | 'dizzy-eyes' | 'happy-eyes' | 'heart-eyes' | 'left-twitch-eyes' | 'normal-eyes' | 'simple-eyes' | 'squint-eyes' | 'wink' | 'cyborg';

const props = defineProps<{
  type: EyeType,
  withLashes: boolean,
}>()

const eyeComponent = computed(() => {
  return {
    'content-eyes': ContentEyes,
    'dizzy-eyes': DizzyEyes,
    'happy-eyes': HappyEyes,
    'heart-eyes': HeartEyes,
    'left-twitch-eyes': LeftTwitchEyes,
    'normal-eyes': NormalEyes,
    'simple-eyes': SimpleEyes,
    'squint-eyes': SquintEyes,
    'wink': Wink,
    'cyborg': Cyborg,
  }[props.type];
});
</script>

<template>
  <component 
    v-if="eyeComponent !== null"
    :is="eyeComponent" 
    :with-lashes="withLashes"
  />
</template>