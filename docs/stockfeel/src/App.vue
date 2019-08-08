<template>
  <div id="app">
    <header>
      <img alt="logo main" src="./assets/images/logo-main.svg" />
      <img alt="lemon bear" src="./assets/images/lemon-bear.png" />
    </header>
    <nav>
      排序：
      <select v-model="sortType">
        <option value="reward">報酬率</option>
        <option value="closePrice">收盤價</option>
      </select>
      <select v-model="sortCrease">
        <option value="decrease">高至低</option>
        <option value="increase">低至高</option>
      </select>
      <input id="is-special" type="checkbox" v-model="isSpecial">
      <label for="is-special">只顯示特選商品</label>
    </nav>
    <sortTable :isSpecial="isSpecial" :sortType="sortType" :sortCrease="sortCrease" />
  </div>
</template>

<script>
import sortTable from './components/sortTable.vue'

export default {
  name: 'app',
  data () {
    return {
      isSpecial: false,
      sortType: 'reward',
      sortCrease: 'decrease'
    }
  },
  components: {
    sortTable
  }
}
</script>

<style>
header img {
  max-height: 40px;
}
</style>
