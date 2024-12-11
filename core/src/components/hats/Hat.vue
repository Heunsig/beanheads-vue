
<script setup lang="ts">
import type { colors } from '@/constants/theme';
import Beanie from './Beanie.vue';
import Turban from './Turban.vue';
import { computed } from 'vue';
import type { HairType } from '../hairs/Hair.vue';
import PartyHat from './PartyHat.vue';

export type HatType = 'none' | 'beanie' | 'turban' |'party-hat';

const props = defineProps<{
  position: 'front' | 'back',
  type: HatType,
  color: keyof typeof colors.clothing,
  hairType: HairType
}>()

const hatComponent = computed(() => ({
  'none': null,
  'beanie': Beanie,
  'turban': Turban,
  'party-hat': PartyHat,
}[props.type]))
</script>

<template>
  <component
    v-if="hatComponent !== null"
    :is="hatComponent"
    :position="position"
    :color="color"
    :hair-type="hairType"
  />
</template>
