<template>
  <div id="page">
    <orderTop @getItem="getItem" />
    <orderList :newItem="newItem" />
  </div>
</template>

<script>
import orderTop from './components/orderTop.vue'
import orderList from './components/orderList.vue'

export default {
  name: 'page',
  components: {
    orderTop,
    orderList
  },
  data () {
    return {
      newItem: ''
    }
  },
  methods: {
    getItem(val) {
      this.newItem = val;
    }
  }
}
</script>