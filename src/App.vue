<template>
  <div id="app" class="h-screen w-screen bg-gray-900 overflow-hidden">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "App",
  components: {
    HeaderComponent,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
