<template>
  <section>
    <ul class="flex-box tabs">
      <li @click="sortBy('all')">
        <a :class="{ active: sort === 'all' }" href="javascript:void(0)">所有訂單 ({{ totalSum }})</a>
      </li>
      <li @click="sortBy('nodo')">
        <a :class="{ 'active color-red': sort === 'nodo' }" href="javascript:void(0)">未完成 ({{ nodoSum }})</a>
      </li>
      <li @click="sortBy('done')">
        <a :class="{ 'active color-green': sort === 'done' }" href="javascript:void(0)">已完成 ({{ doneSum }})</a>
      </li>
    </ul>
    <ul class="order-list">
      <li class="flex-box flex-h-align" v-for="(item, index) in list" :key="'item-' + index">
          <template v-if="item === editItem">
            <input type="text" v-model="item.item" @keydown.enter="doneEdit(item)" @keydown.esc="cancelEdit(item)" @blur="cancelEdit(item)" v-input-focus>
          </template>
          <template v-else>
            <div class="flex-box flex-h-align flex-v-align order-item">
              <dt class="item-status">
                <input type="checkbox" :id="'item-' + index" v-model="item.done" />
                <label :for="'item-' + index">
                  <i :class="['fa', item.done ? 'fa-bell-slash color-green': 'fa-bell color-red']"></i>
                </label>
                <p class="item-name" @dblclick="doEdit(item)">
                  {{ item.item }}
                </p>
              </dt>
              <dd class="order-date">{{ orderDate(item.time) }}</dd>
            </div>
            <div class="btn-group">
              <button @click="doEdit(item)">修改</button>
              <button @click="removeOrder(item)">結單</button>
            </div>
          </template>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      sort: 'nodo',
      orderData: [{
        item: '烏龍綠茶',
        done: true,
        time: 1567609941820
      }, {
        item: '紅茶',
        done: true,
        time: 1567609966596
      }, {
        item: '綠茶',
        done: false,
        time: 1567609982215
      }],
      isEdit: false,
      editItem: null
    }
  },
  props: ['newItem'],
  computed: {
    list () {
      let type = this.sort;
      switch (type) {
        case 'all':
          return this.orderData;
        case 'nodo':
          return this.orderData.filter(v => {
            return !v.done;
          });
        case 'done':
          return this.orderData.filter(v => {
            return v.done;
          });
      }
    },
    newOrder () {
      this.$nextTick(() => {
      });
      return this.newItem;
    },
    totalSum () {
      return this.orderData.length;
    },
    nodoSum () {
      let nodo = this.orderData.filter(v => {
        return !v.done;
      });
      return nodo.length;
    },
    doneSum () {
      let done = this.orderData.filter(v => {
        return v.done;
      });
      return done.length;
    }
  },
  watch: {
    newOrder (val) {
      this.orderData.push({ item: val, done: false, time: Date.now() });
    }
  },
  methods: {
    sortBy (type) {
      this.sort = type;
    },
    orderDate (time) {
      let date = new Date(time);
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      if (h.toString().length < 2) {
        h = `0${h}`
      }
      if (m.toString().length < 2) {
        m = `0${m}`
      }
      if (s.toString().length < 2) {
        s = `0${s}`
      }
      return `${h} : ${m} : ${s}`
    },
    doEdit (item) {
      this.editItem = item;
      this.beforeEditCache = item.item;
    },
    cancelEdit (item) {
      if (!this.isEdit) {
        this.editItem = null;
        item.item = this.beforeEditCache;
      }
      this.isEdit = false;
    },
    doneEdit (item) {
      if(!this.editItem) return;
      this.editItem = null;
      item.item = item.item.trim();
      if(!item.item){
          this.removeOrder(item)
      }
      this.isEdit = true;
    },
    removeOrder (item) {
      let delItem = this.orderData.indexOf(item);
      this.orderData.splice(delItem, 1);
    }
  },
  directives :{
      inputFocus :{
          inserted: function(el){
              el.focus();
          }
      }
  }
}
</script>
