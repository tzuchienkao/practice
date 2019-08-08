<template>
  <section id="sortTable">
    <table>
      <tbody>
        <tr>
          <td v-for="(title, index) in tableTitle" :key="index">
            {{ title }}
          </td>
        </tr>
        <tr v-for="data in newAllData" :key="data.id">
          <td>
            {{ data.id }}
          </td>
          <td>
            {{ data.name }}
          </td>
          <td>
            {{ data.reward }}
          </td>
          <td>
            {{ data.specialStockText }}
          </td>
          <td>
            {{ data.closePrice }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'sortTable',
  props: ['isSpecial', 'sortType', 'sortCrease'],
  data () {
    return {
      tableTitle: [
        'ID',
        '名稱',
        '報酬率',
        '特選商品',
        '收盤價'
      ],
      originData: {},
      newAllData: {}
    }
  },
  watch: {
    isSpecial () {
      this.combineData();
    },
    sortType () {
      this.combineData();
    },
    sortCrease () {
      this.combineData();
    }
  },
  computed: {
    sortSpecial () {
      return this.isSpecial;
    },
    sortByType () {
      return this.sortType;
    },
    sortByCrease () {
      return this.sortCrease;
    }
  },
  methods: {
    async initData () {
      let res = await fetch('./data.json');
      this.originData = await res.json();
      this.combineData();
      return this.originData;
    },
    combineData () {
      this.newAllData = JSON.parse(JSON.stringify(this.originData));
      this.newAllData = this.newAllData.filter((ele) => {
        if (!ele.specialStock) {
          ele['specialStockText'] = '否'
        } else {
          ele['specialStockText'] = '是'
        }
        if (this.sortSpecial) {
          return ele.specialStock === true;
        } else {
          return ele;
        }
      });
      if (this.sortByType) {
        this.newAllData = this.newAllData.sort((a, b) => {
          let result = this.sortByCrease === 'decrease' ? b[this.sortType] - a[this.sortType] : a[this.sortType] - b[this.sortType]
          return result;
        })
      }
    }
  },
  mounted () {
    this.initData();
  }
}
</script>

<style scoped>
#sortTable td {

}
</style>
