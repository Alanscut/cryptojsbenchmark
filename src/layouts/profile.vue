<template>
  <router-view />
  <div class="logo-box-flex">
    <img
      alt="Origin.js logo"
      src="../assets/originjs.png"
      class="logo logo-small"
    />
    <h4>Origin.js</h4>
  </div>
  <h4>This is a JavaScript vs WebAssembly(WASM) benchmark.</h4>
  <h4>The WASM files are written in rust.</h4>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Profile',
  setup() {
    const sourceOpitons = reactive([
      {
        title: 'github',
        link: 'https://github.com/originjs/origin.js',
      },
      {
        title: 'docs',
        link: 'https://originjs.github.io/docs/',
      },
    ])

    const router = useRouter()
    const { currentRoute } = router

    return { currentRoute, sourceOpitons }
  }
}
</script>
