import type { Ref } from 'vue';

export interface Theme {
  skin: Ref<{ base: string; shadow: string }>
}
