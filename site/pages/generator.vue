<script setup lang="ts">
import { Beanhead } from 'beanheads-vue'
import { colors } from '../../core/src/constants/theme'
import { type AccessoryType } from '../../core/src/components/accessories/Accessory.vue';
import { type BodyType } from '../../core/src/components/bodies/Body.vue';
import { type ClothingType } from '../../core/src/components/clothings/Clothing.vue';
import { type ClothingGraphicType } from '../../core/src/components/clothingGraphics/ClothingGraphic.vue';
import { type EyeType } from '../../core/src/components/eyes/Eye.vue';
import { type EyebrowsType } from '../../core/src/components/eyebrows/Eyebrows.vue';
import { type FacialHairType } from '../../core/src/components/facialHairs/FacialHair.vue';
import { type HairType } from '../../core/src/components/hairs/Hair.vue';
import { type HatType } from '../../core/src/components/hats/Hat.vue';
import { type MouthType } from '../../core/src/components/mouths/Mouth.vue';
import { randomizeOptions } from '~/utils/random';

const MIN_SIZE = 8;
const MAX_SIZE = 800;

const toast = useToast()

type BeanheadOptions = {
  mask: string
  faceMask: string
  faceMaskColor: keyof typeof colors.clothing
  skin: keyof typeof colors.skin
  body: BodyType
  eye: EyeType
  withLashes: string
  eyebrows: EyebrowsType
  mouth: MouthType
  lipColor: keyof typeof colors.lipColors
  facialHair: FacialHairType
  hair: HairType
  hairColor: keyof typeof colors.hair
  clothing: ClothingType
  clothingColor: keyof typeof colors.clothing
  clothingGraphic: ClothingGraphicType
  hat: HatType
  hatColor: keyof typeof colors.clothing
  accessory: AccessoryType
}

const initialOptions: BeanheadOptions = {
  // Layout
  mask: 'false',

  // Body
  skin: 'light',
  body: 'chest',

  // Face
  eye: 'normal-eyes',
  withLashes: 'false',
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
  faceMask: 'false',
  faceMaskColor: 'white', 
}

const options = useUrlSearchParams('history', {
  initialValue: {
    size: '300',
    ...structuredClone(initialOptions),
  }
})

function randomizeAvatar() {
  const randomOptions = randomizeOptions()
  Object.assign(options, randomOptions)
}

function resetAvatar() {
  Object.assign(options, structuredClone(initialOptions))
}

const highlighter = await getShikiHighlighter()
const isOpen = ref(false)
const code = computed(() => (`<Beanhead
  width="${options.size}"
  height="${options.size}"
  :mask="${options.mask === 'true'}"
  skin="${options.skin}"
  body="${options.body}"
  eye="${options.eye}"
  :with-lashes="${options.withLashes === 'true'}"
  eyebrows="${options.eyebrows}"
  mouth="${options.mouth}"
  lip-color="${options.lipColor}"
  facial-hair="${options.facialHair}"
  hair="${options.hair}"
  hair-color="${options.hairColor}"
  clothing="${options.clothing}"
  clothing-color="${options.clothingColor}"
  clothing-graphic="${options.clothingGraphic}"
  hat="${options.hat}"
  hat-color="${options.hatColor}"
  accessory="${options.accessory}"
  :face-mask="${options.faceMask === 'true'}"
  face-mask-color="${options.faceMaskColor}"
/>`))

const html = ref(highlighter.highlight(code.value, { lang: 'vue', theme: 'github-light-default' })) 
watch(isOpen, () => {
  if (isOpen.value) {
    html.value = highlighter.highlight(code.value, { lang: 'vue', theme: 'github-light-default' })
  }
})



function copyCode() {
  navigator.clipboard.writeText(code.value)
  toast.add({
    title: 'Code copied!',
    description: 'The Beanhead component code has been copied to your clipboard',
  })
}

const avatarWrapper = ref<HTMLElement | null>(null)
function downloadSVG() {
  const svg = avatarWrapper.value?.innerHTML
  if (!svg) return
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'beanhead.svg'
  a.click()
}

const tempSize = ref('250')
const { pause, resume} = syncRefs(() => options.size, tempSize)

function applySize() {
  if (Number(tempSize.value) < MIN_SIZE) {
    tempSize.value = MIN_SIZE.toString()
  }
  if (Number(tempSize.value) > MAX_SIZE) {
    tempSize.value = MAX_SIZE.toString()
  }

  pause()
  options.size = tempSize.value
  resume()
}
</script>
<template>
  <!-- 
    Using ClientOnly component due to hydration mismatch error caused by useUrlSearchParams
    SSR is not strictly necessary since this is an avatar generation page
  -->
  <ClientOnly>
    <main 
      class="flex flex-col gap-3 h-screen md:flex-row"
    >
      <div class="h-12 flex flex-wrap items-center p-2 md:fixed md:top-0 md:left-0 md:w-[calc(100%-20rem)]">
        <NuxtLink to="/">
          <UButton
            type="button"
            icon="i-heroicons-outline:chevron-left"
            size="sm"
            color="gray"
            square
            variant="ghost"
          />
        </NuxtLink>
        <div class="flex flex-wrap items-baseline gap-x-2">
          <h1 class="text-lg font-bold text-gray-800 dark:text-gray-200">Beanheads Vue</h1>
          <small class="text-sm text-gray-500">v1.0.0</small>
        </div>
        <div class="ml-auto flex-shrink-0 flex justify-end gap-2">
          <a 
            href="https://github.com/Heunsig/beanheads-vue"
            title="GitHub"
            target="_blank"
          >
            <UButton 
              icon="i-mdi:github"
              color="gray" 
              variant="ghost"
            ></UButton>
          </a>

          <UButton
            icon="i-heroicons-outline:download"
            size="sm"
            color="gray"
            square
            variant="ghost"
            class="flex-shrink-0"
            title="Download SVG"
            @click="() => downloadSVG()"
          />
          <UButton
            icon="i-heroicons:code-bracket-16-solid"
            size="sm"
            color="gray"
            square
            variant="ghost"
            class="flex-shrink-0"
            title="Code"
            @click="() => isOpen = true"
          />
        </div>
      </div>
      <div class="flex-grow flex flex-col overflow-auto md:flex-row">
        <div class="
          flex 
          justify-center 
          items-center
          min-h-[15.625rem]
          max-h-[18.75rem]
          flex-shrink-0
          overflow-auto
          md:min-h-none
          md:max-h-none
          md:flex-grow
        ">
          <div 
            ref="avatarWrapper"
            class="max-h-full"
          >
            <Beanhead
              :width="options.size"
              :height="options.size"
              :mask="options.mask === 'true'"
              :skin="options.skin"
              :body="options.body"
              :eye="options.eye"
              :with-lashes="options.withLashes === 'true'"
              :eyebrows="options.eyebrows"
              :mouth="options.mouth"
              :lip-color="options.lipColor"
              :facial-hair="options.facialHair"
              :hair="options.hair"
              :hair-color="options.hairColor"
              :clothing="options.clothing"
              :clothing-color="options.clothingColor"
              :clothing-graphic="options.clothingGraphic"
              :hat="options.hat"
              :hat-color="options.hatColor"
              :accessory="options.accessory"
              :face-mask="options.faceMask === 'true'"
              :face-mask-color="options.faceMaskColor"
            />
          </div>
        </div>
        <div 
          class="
            flex-grow 
            p-5 
            rounded-t-2xl 
            border-t 
            border-gray-300 
            shadow-[0_0px_2px_0px_rgba(0,0,0,0.1)] 
            overflow-auto
            md:rounded-none 
            md:shadow-none
            md:relative
            md:top-0
            md:right-0
            md:w-[20rem]
            md:max-w-[20rem]
            md:h-screen
            md:border-t-0
            md:border-l
            md:border-gray-300
            dark:border-gray-700
          "
        >
          <div class="flex flex-col gap-6">
            <div>
              <h3 class="text-base font-semibold mb-1">Size</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2 leading-4">
                Size controls the width and height of the SVG avatar in pixels. ({{ MIN_SIZE }}px - {{ MAX_SIZE }}px)
              </p>
              <div class="flex gap-2 items-center">
                <URange 
                  :model-value="Number(options.size)"
                  @update:model-value="options.size = $event.toString()"
                  :min="MIN_SIZE"
                  :max="MAX_SIZE"
                  class="flex-grow"
                />
                <UInput 
                  type="number"
                  v-model="tempSize"
                  @change="() => applySize()"
                  class="w-24 flex-shrink-0"
                >
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
                  </template>
                </UInput>
              </div>
            </div>
            <div class="flex gap-2 justify-end items-center">
              <UCheckbox 
                label="Use mask" 
                :model-value="options.mask === 'true'"
                @update:model-value="options.mask = $event ? 'true' : 'false'"
                class="mr-auto"
              />
              <!-- Reset Avatar -->
              <UButton 
                type="button" 
                variant="outline"
                @click="() => resetAvatar()"
              >
                Reset
              </UButton>
              <!-- Randomize Avatar -->
              <UButton 
                type="button" 
                @click="() => randomizeAvatar()"
              >
                Randomize
              </UButton>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Skin</h3>
              <div>
                <USelectMenu
                  v-model="options.skin" 
                  :options="[
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'Yellow', value: 'yellow' },
                    { label: 'Brown', value: 'brown' },
                    { label: 'Red', value: 'red' },
                    { label: 'Black', value: 'black' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Body</h3>
              <div>
                <USelectMenu
                  v-model="options.body" 
                  :options="[
                    { label: 'Chest', value: 'chest' },
                    { label: 'Breasts', value: 'breasts' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Eye</h3>
              <div>
                <USelectMenu
                  v-model="options.eye" 
                  :options="[
                    { label: 'Normal Eyes', value: 'normal-eyes' },
                    { label: 'Content Eyes', value: 'content-eyes' },
                    { label: 'Dizzy Eyes', value: 'dizzy-eyes' },
                    { label: 'Happy Eyes', value: 'happy-eyes' },
                    { label: 'Heart Eyes', value: 'heart-eyes' },
                    { label: 'Left Twitch Eyes', value: 'left-twitch-eyes' },
                  ]" 
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">With Lashes</h3>
              <div>
                <UToggle 
                  :model-value="options.withLashes === 'true'"
                  @update:model-value="options.withLashes = $event ? 'true' : 'false'"
                  size="xl"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Eyebrows</h3>
              <div>
                <USelectMenu
                  v-model="options.eyebrows" 
                  :options="[
                    { label: 'None', value: 'none' },
                    { label: 'Normal', value: 'normal' },
                    { label: 'Serious', value: 'serious' },
                    { label: 'Left Lowered', value: 'left-lowered' },
                    { label: 'Angry', value: 'angry' },
                    { label: 'Concerned', value: 'concerned' },
                  ]" 
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Mouth</h3>
              <div>
                <USelectMenu
                  v-model="options.mouth" 
                  :options="[
                    { label: 'Grin', value: 'grin' },
                    { label: 'Lips', value: 'lips' },
                    { label: 'Sad', value: 'sad' },
                    { label: 'Serious', value: 'serious' },
                    { label: 'Open', value: 'open' },
                    { label: 'Tongue', value: 'tongue' },
                  ]" 
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Lip Color</h3>
              <div>
                <USelectMenu
                  v-model="options.lipColor" 
                  :options="[
                    { label: 'Red', value: 'red' },
                    { label: 'Purple', value: 'purple' },
                    { label: 'Pink', value: 'pink' },
                    { label: 'Turquoise', value: 'turquoise' },
                    { label: 'Green', value: 'green' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Facial Hair</h3>
              <div>
                <USelectMenu
                  v-model="options.facialHair" 
                  :options="[
                    { label: 'None', value: 'none' },
                    { label: 'Stubble', value: 'stubble' },
                    { label: 'Medium Beard', value: 'medium-beard' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Hair</h3>
              <div>
                <USelectMenu
                  v-model="options.hair" 
                  :options="[
                    { label: 'None', value: 'none' },
                    { label: 'Afro', value: 'afro' },
                    { label: 'Balding', value: 'balding' },
                    { label: 'Bob', value: 'bob' },
                    { label: 'Bun', value: 'bun' },
                    { label: 'Buzz', value: 'buzz' },
                    { label: 'Long', value: 'long' },
                    { label: 'Pixie', value: 'pixie' },
                    { label: 'Short', value: 'short' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Hair Color</h3>
              <div class="flex gap-2 flex-wrap">
                <label>
                  <input type="radio" value="blonde" v-model="options.hairColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#FEDC58] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="orange" v-model="options.hairColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#D96E27] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="black" v-model="options.hairColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#592d3d] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="white" v-model="options.hairColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#ffffff] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="brown" v-model="options.hairColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#A56941] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="blue" v-model="options.hairColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#85c5e5] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="pink" v-model="options.hairColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#D69AC7] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Clothing</h3>
              <div>
                <USelectMenu
                  v-model="options.clothing" 
                  :options="[
                    { label: 'Naked', value: 'none' },
                    { label: 'Dress', value: 'dress' },
                    { label: 'Dress Shirt', value: 'dress-shirt' },
                    { label: 'Shirt', value: 'shirt' },
                    { label: 'Tank Top', value: 'tank-top' },
                    { label: 'V-Neck', value: 'v-neck' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Clothing Color</h3>
              <div class="flex gap-2 flex-wrap">
                <label>
                  <input type="radio" value="white" v-model="options.clothingColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-white border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="blue" v-model="options.clothingColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#85c5e5] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="black" v-model="options.clothingColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#633749] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="green" v-model="options.clothingColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#89d86f] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="red" v-model="options.clothingColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#d67070] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Clothing Graphic</h3>
              <div>
                <USelectMenu
                  v-model="options.clothingGraphic" 
                  :options="[
                    { label: 'None', value: 'none' },
                    { label: 'Vue', value: 'vue' },
                    { label: 'Nuxt', value: 'nuxt' },
                    { label: 'Redwood', value: 'redwood' },
                    { label: 'React', value: 'react' },
                    { label: 'Gatsby', value: 'gatsby' },
                    { label: 'GraphQL', value: 'graphql' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Accessory</h3>
              <div>
                <USelectMenu
                  v-model="options.accessory" 
                  :options="[
                    { label: 'None', value: 'none' },
                    { label: 'Round Glasses', value: 'round-glasses' },
                    { label: 'Tiny Glasses', value: 'tiny-glasses' },
                    { label: 'Shades', value: 'shades' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Hat</h3>
              <div>
                <USelectMenu
                  v-model="options.hat" 
                  :options="[
                    { label: 'None', value: 'none' },
                    { label: 'Beanie', value: 'beanie' },
                    { label: 'Turban', value: 'turban' },
                  ]"
                  value-attribute="value"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Hat Color</h3>
              <div class="flex gap-2 flex-wrap">
                <label>
                  <input type="radio" value="white" v-model="options.hatColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-white border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="blue" v-model="options.hatColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#85c5e5] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="black" v-model="options.hatColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#633749] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="green" v-model="options.hatColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#89d86f] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="red" v-model="options.hatColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-[#d67070] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Face Mask</h3>
              <div>
                <UToggle 
                  :model-value="options.faceMask === 'true'"
                  @update:model-value="options.faceMask = $event ? 'true' : 'false'"
                  size="xl"
                />
              </div>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2">Face Mask Color</h3>
              <div class="flex gap-2 flex-wrap">
                <label>
                  <input type="radio" value="white" v-model="options.faceMaskColor" class="hidden"/>
                  <div class="w-8 h-8 rounded-full bg-white border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="blue" v-model="options.faceMaskColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#85c5e5] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="black" v-model="options.faceMaskColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#633749] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="green" v-model="options.faceMaskColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#89d86f] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
                <label>
                  <input type="radio" value="red" v-model="options.faceMaskColor" class="hidden" />
                  <div class="w-8 h-8 rounded-full bg-[#d67070] border-2 border-gray-600 dark:border-gray-100"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <UModal v-model="isOpen">
      <UButton 
        icon="i-heroicons-outline:clipboard-copy"
        size="sm"
        color="primary"
        square
        variant="ghost"
        class="flex-shrink-0 absolute top-3 right-3"
        @click="() => copyCode()"
      />
      <div class="min-h-24 p-4" v-html="html"/>
    </UModal>
  </ClientOnly>
</template>
<style scoped>
input[type="radio"]:checked + div {
  position: relative;
}

input[type="radio"]:checked + div::before {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: bold;
  color: var(--color);
  z-index: 1
}

input[type="radio"][value="white"]:checked + div::before {
  --color: #000;
}

input[type="radio"]:not([value="white"]):checked + div::before {
  --color: #fff;
}
</style>
