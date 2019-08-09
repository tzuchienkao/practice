<template>
  <div id="app">
    <HelloWorld v-if="!displayPage" @getAns="getAns" />
    <MainPage v-if="displayPage" :mainPos="mainPos" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MainPage from './components/MainPage.vue'

export default {
  name: 'app',
  data() {
    return {
      mainPos: Array,
      displayPage: false
    }
  },
  components: {
    HelloWorld,
    MainPage
  },
  methods: {
    getAns (val) {
      if (val && val.length > 0) {
        this.mainPos = val
        this.displayPage = true
      }
    }
  }
}
</script>
