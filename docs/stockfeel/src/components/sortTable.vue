<template>
  <section id="sortTable">
    <ul class="table tableHead">
      <li v-for="(title, index) in tableTitle" :key="index">
        {{ title }}
      </li>
    </ul>
    <ul class="table tableBox" v-for="data in newAllData" :key="data.id">
      <li>
        {{ data.id }}
      </li>
      <li>
        {{ data.name }}
      </li>
      <li>
        {{ data.reward }}
      </li>
      <li>
        {{ data.specialStockText }}
      </li>
      <li>
        {{ data.closePrice }}
      </li>
    </ul>
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
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.table {
  text-align: center;
  display: flex;
  align-items: center;
}
.tableBox {
  line-height: 2;
}
.table li {
  flex: 0 0 15%;
  padding: 0 10px;
  box-sizing: border-box;
}
.table li:nth-child(2) {
  flex: auto;
}
.table li:nth-child(3), .table li:nth-child(5) {
  text-align: right;;
}
@media (max-width: 1023px) and (min-width: 667px) {
  .table li:not(:first-child) {
    flex: 0 0 18%;
  }
}
@media (max-width: 666px) and (min-width: 320px) {
  .table {
    line-height: 1.5;
    padding: 10px 0;
  }
  .table li:first-child {
    flex: auto;
  }
  .table li:not(:first-child) {
    flex: 0 0 23%;
  }
}
</style>
