<script setup lang="ts">
// Vue core
import { computed, watch, reactive, provide, readonly, toRef } from 'vue';

// Theme
import type { Theme } from "@/types/theme";
import { colors } from '@/constants/theme';

// Base components
import Base from './Base.vue'
import Mask from './Mask.vue';
import BgCircle from './BgCircle.vue';
import FaceMask from './FaceMask.vue';

// Feature components
import Accessory, { type AccessoryType } from './accessories/Accessory.vue';
import Body, { type BodyType } from './bodies/Body.vue';
import Clothing, { type ClothingType } from './clothings/Clothing.vue';
import ClothingGraphic, { type ClothingGraphicType } from './clothingGraphics/ClothingGraphic.vue';
import Eye, { type EyeType } from './eyes/Eye.vue';
import Eyebrows, { type EyebrowsType } from './eyebrows/Eyebrows.vue';
import FacialHair, { type FacialHairType } from './facialHairs/FacialHair.vue';
import Hair, { type HairType } from './hairs/Hair.vue';
import Hat, { type HatType } from './hats/Hat.vue';
import Mouth, { type MouthType } from './mouths/Mouth.vue';

const props = withDefaults(defineProps<{
  // Layout
  mask?: boolean,

  // Body
  skin?: keyof typeof colors.skin,
  body?: BodyType,
  braStraps?: boolean,

  // Head/Face
  eye?: EyeType,
  withLashes?: boolean,
  eyebrows?: EyebrowsType,
  mouth?: MouthType,
  lipColor?: keyof typeof colors.lipColors,
  facialHair?: FacialHairType,

  // Hair
  hair?: HairType,
  hairColor?: keyof typeof colors.hair,

  // Clothing
  clothing?: ClothingType,
  clothingColor?: keyof typeof colors.clothing,
  clothingGraphic?: ClothingGraphicType,

  // Accessories
  accessory?: AccessoryType,
  hat?: HatType,
  hatColor?: keyof typeof colors.clothing,
  faceMask?: boolean,
  faceMaskColor?: keyof typeof colors.clothing,
}>(), {
  // Layout
  mask: false,

  // Body
  skin: 'light',
  body: 'chest',
  braStraps: true,

  // Head/Face
  eye: 'normal-eyes',
  withLashes: false,
  eyebrows: 'none',
  mouth: 'grin',
  lipColor: 'red',
  facialHair: 'none',

  // Hair
  hair: 'none',
  hairColor: 'white',

  // Clothing
  clothing: 'none',
  clothingColor: 'white',
  clothingGraphic: 'none',

  // Accessories
  accessory: 'none',
  hat: 'none',
  hatColor: 'white',
  faceMask: false,
  faceMaskColor: 'white',
})

const clothingVisibility = computed(() => ({
  'none': {
    front: false,
    back: false,
  },
  'naked': {
    front: false,
    back: false,
  },
  'dress': {
    front: true,
    back: true,
  },
  'shirt': {
    front: false,
    back: true,
  },
  'dress-shirt': {
    front: false,
    back: true,
  },
  'tank-top': {
    front: false,
    back: true,
  },
  'v-neck': {
    front: false,
    back: true,
  },
})[props.clothing])

const theme = reactive({
  skin: props.skin ? colors.skin[props.skin] : colors.skin.light
});

watch(() => props.skin, (skin) => {
  theme.skin = colors.skin[skin]
})

provide('theme', {
  skin: readonly(toRef(theme, 'skin'))
} as Theme);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 990 990"
  >
    <Mask v-if="mask" id="mask" />
    <g
      :mask="mask ? 'url(#mask)' : undefined"
    >
      <BgCircle v-if="mask" />
      
      <Hat 
        position="back" 
        :type="hat" 
        :color="hatColor"
        :hairType="hair"
      />

      <Hair
        position="back" 
        :type="hair" 
        :color="hairColor" 
        :hasHat="hat !== 'none'"
      />

      <Base/>

      <Body
        :type="body"
        :color="clothingColor"
        position="back"
        :bra-straps="braStraps"
      />

      <Clothing 
        position="back" 
        :type="clothing"
        :color="clothingColor"
      >
        <template #graphic>
          <ClothingGraphic 
            :type="clothingGraphic" 
          />
        </template>
      </Clothing>

      <Body
        v-if="clothingVisibility.front || clothingVisibility.back"
        position="front"
        :type="body"
        :color="clothing === 'dress-shirt' ? 'white' : clothingColor"
        :bra-straps="braStraps"
      />

      <Clothing
        v-if="clothingVisibility.front"
        position="front"
        :type="clothing"
        :color="clothingColor"
      />

      <FacialHair 
        v-if="!faceMask"
        :type="facialHair" 
        :color="hairColor" 
      />

      <Eye 
        :type="eye" 
        :with-lashes="withLashes" 
      />

      <Mouth
        :type="mouth" 
        :color="lipColor" 
      />

      <FaceMask 
        v-if="faceMask" 
        :color="faceMaskColor" 
      />

      <Hair
        position="front"
        :type="hair"
        :color="hairColor"
        :hasHat="hat !== 'none'"
      />

      <Eyebrows :type="eyebrows" />

      <Hat 
        position="front" 
        :type="hat" 
        :color="hatColor" 
        :hairType="hair"
      />

      <Accessory 
        :type="accessory"
      />
    </g>
  </svg>
</template>