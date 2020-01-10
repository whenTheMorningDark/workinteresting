<template>
  <div class="home">
    <Table :columns="columns"
           :data="data">
      <template slot-scope="{row,index}"
                slot="action">
        <Button @click="handClick(row,index)">操作</Button>
      </template>
    </Table>

  </div>
</template>
<script>
export default {
  name: "home",
  components: {

  },
  data () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '出生日期',
          key: 'birthday'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          slot: "action"
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
      ]
    }
  },
  methods: {
    handClick (row, index) {
      console.log(row, index)
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 500px;
  overflow: hidden;
  // height: 500px;
  padding: 10px;
  border: 1px solid #ddd;
  // padding: 20px;
  margin: 0 auto;
}
</style>
