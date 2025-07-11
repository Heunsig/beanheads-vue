# beanheads-vue

Easily generate avatars for your Vue and Nuxt projects with Beanheads Vue.

> This project is a Vue version inspired by RobertBroersma's React project, [Beanheads](https://github.com/RobertBroersma/beanheads). We deeply respect and appreciate the original work.

## Getting Started

Install Beanheads Vue with your preferred package manager.

```bash
npm install beanheads-vue
```

then, in your app:

```vue
<script setup>
import { Beanhead } from 'beanheads-vue'
</script>

<template>
  <!-- With explicit width -->
  <Beanhead width="100"/>
  
  <!-- Without width - will fill parent container -->
  <div style="width: 100px;">
    <Beanhead/>
  </div>
</template>
```

## Props

| **Name**            | **Type**                                                                                                                                                                                                                                    | **Default**      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| **mask**            | `boolean`                                                                                                                                                                                                                                  | `false`          |
| **skin**            | `"light"`, `"yellow"`, `"brown"`, `"dark"`, `"red"`, `"black"`                                                                                                                                                                             | `"light"`        |
| **body**            | `"chest"`, `"breasts"`                                                                                                                                                                                                                     | `"chest"`        |
| **eye**             | `"content-eyes"`, `"dizzy-eyes"`, `"happy-eyes"`, `"heart-eyes"`, `"left-twitch-eyes"`, `"normal-eyes"`, `"simple-eyes"`, `"squint-eyes"`, `"wink"`                                                                                       | `"normal-eyes"`  |
| **with-lashes**     | `boolean`                                                                                                                                                                                                                                  | `false`          |
| **eyebrows**        | `"none"`, `"normal"`, `"serious"`, `"left-lowered"`, `"angry"`, `"concerned"`                                                                                                                                                              | `"none"`         |
| **mouth**           | `"grin"`, `"lips"`, `"sad"`, `"serious"`, `"open"`, `"tongue"`                                                                                                                                                                             | `"grin"`         |
| **lip-color**       | `"red"`, `"purple"`, `"pink"`, `"turquoise"`, `"green"`                                                                                                                                                                                    | `"red"`          |
| **facial-hair**     | `"none"`, `"stubble"`, `"medium-beard"`                                                                                                                                                                                                    | `"none"`         |
| **hair**            | `"none"`, `"afro"`, `"balding"`, `"bob"`, `"bun"`, `"buzz"`, `"long"`, `"pixie"`, `"short"`                                                                                                                                                 | `"none"`         |
| **hair-color**      | `"blonde"`, `"orange"`, `"black"`, `"white"`, `"brown"`, `"blue"`, `"pink"`, `"green"`, `"red"`, `"purple"`                                                                                                                                                                | `"white"`        |
| **clothing**        | `"none"`, `"naked"`, `"dress"`, `"dress-shirt"`, `"shirt"`, `"tank-top"`, `"v-neck"`                                                                                                                                                       | `"none"`         |
| **clothing-color**  | `"white"`, `"blue"`, `"black"`, `"green"`, `"red"`, `"pink"`                                                                                                                                                                                         | `"white"`        |
| **clothing-graphic**| `"none"`, `"vue"`, `"nuxt"`, `"redwood"`, `"react"`, `"gatsby"`, `"graphql"`                                                                                                                                                                         | `"none"`         |
| **hat**             | `"none"`, `"beanie"`, `"turban"`                                                                                                                                                                                                           | `"none"`         |
| **hat-color**       | `"white"`, `"blue"`, `"black"`, `"green"`, `"red"`, `"pink"`                                                                                                                                                                                         | `"white"`        |
| **accessory**       | `"none"`, `"round-glasses"`, `"tiny-glasses"`, `"shades"`                                                                                                                                                                                  | `"none"`         |
| **face-mask**       | `boolean`                                                                                                                                                                                                                                  | `false`          |
| **face-mask-color** | `"white"`, `"blue"`, `"black"`, `"green"`, `"red"`, `"pink"`                                                                                                                                                                                         | `"white"`        |


## License

This project is licensed under the [MIT License](https://opensource.org/license/MIT).
