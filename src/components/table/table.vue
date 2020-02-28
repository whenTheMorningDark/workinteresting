<template>
  <table class="ka-table">
    <tr>
      <th v-for="col in columns"
          :key="col.title">
        {{col.title}}
      </th>
    </tr>
    <tbody>
      <tr v-for="(row,rowIndex) in data"
          :key="row.id">
        <td v-for="col in columns"
            :key="col.id">
          <template v-if="'slot' in col">
            <SlotScope :row="row"
                       :column="col"
                       :index="rowIndex"></SlotScope>
          </template>
          <template v-else>
            {{row[col.key]}}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import SlotScope from './slot.js';
export default {
  name: "ka-table",
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  provide () {
    return {
      tableRoot: this
    }
  },
  components: {
    SlotScope
  }
}
</script>
<style lang="scss" scoped>
.ka-table {
  width: 100%;
  // border: 1px solid #ddd;
  border-collapse: collapse;
  text-align: center;
  box-sizing: border-box;
  th {
    border: 1px solid #dddddd;
    height: 48px;
  }
  td {
    border: 1px solid #dddddd;
    height: 48px;
  }
}
</style>