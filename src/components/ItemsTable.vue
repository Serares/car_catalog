<template>
  <!-- table where all items will be displayed for delete car and modify car forms -->
  <div class="tabel-car-items" v-if="carsArray.length > 0">
    <b-table responsive="sm" striped hover :items="carsArray" :fields="fields">
      <template v-slot:cell(imagine)="data">
        <span v-html="data.value" class="table-images"></span>
      </template>
      <template v-slot:cell(brand)="data">
        <a :href="'#'" @click.prevent="selectRow(data)" class="brand-name">{{data.value}}</a>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["brand", "imagine", "formaCaroserie", "culoare", "model", "caiPutere", "capacitateCilindrica"],
      carsArray: []
    };
  },
  props: {
    fetchDataFromApi: Function,
    getRowDataForTableItems:Function
  },
  methods: {
    selectRow(data) {
    //   console.log({...data.item});
      this.getRowDataForTableItems(data.item);
    }
  },
  computed: {},
  mounted: function() {
    // console.log("ItemsTable mounted");
    this.fetchDataFromApi()
      .then(carsData => {
        this.carsArray = carsData;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.table-images {
  display: block;
}
</style>