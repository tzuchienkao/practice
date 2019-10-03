<template>
  <header>
    <h1>午茶時光
      <i class="fa fa-cookie-bite"></i></h1>
    <p class="order-place">
      <i class="fa fa-coffee"></i>我想要點...
      <input type="text" v-model="newOrder" @keydown.enter="addOrder()">
    </p>
  </header>
</template>

<script>
export default {
  name: 'top',
  data() {
    return {
      newOrder: ''
    }
  },
  methods: {
    addOrder () {
      let item = this.newOrder && this.newOrder.trim();
      if(!item) return;
      this.$emit('getItem', this.newOrder);
      this.newOrder = '';
    }
  },
  directives :{
      inputFocus :{ //自訂標籤名稱
          inserted: function(el){
              el.focus();
          }
      }
  }
}
</script>
