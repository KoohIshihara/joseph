<template>
  <v-app>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
@import "./plugins/meltline.css";

html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
/*
main {
  position: relative;
  display: block;
  width: 100%;
  min-height: 100vh;
}
*/
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
