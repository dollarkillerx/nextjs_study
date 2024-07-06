<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

const count = ref(0);

const setProxy = () => {
  chrome.proxy.settings.set({
    value: {
      mode: "fixed_servers",
      rules: {
        proxyForHttp: {
          scheme: "http",
          host: "127.0.0.1",
          port: 10809
        },
        proxyForHttps: {
          scheme: "http",
          host: "127.0.0.1",
          port: 10809
        }
      }
    },
    scope: "regular"
  }, () => {
    console.log("Proxy settings applied");
  });
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="setProxy">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the WXT and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
