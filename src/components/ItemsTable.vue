<template>
  <div>
    <!-- table where all items will be displayed for delete car and modify car forms -->
    <div class="tabel-car-items" v-if="!isLoading">
      <b-table responsive="sm" striped hover :items="carsArray" :fields="fields">
        <template v-slot:cell(imagine)="data">
          <img class='car-images' style='display:block; max-width:120px;' :src='data.value' />
        </template>
        <template v-slot:cell(brand)="data">
          <a :href="'#'" @click.prevent="selectRow(data)" class="brand-name">{{data.value}}</a>
        </template>
      </b-table>
    </div>
    <div v-else>
      <div>
        <b-spinner style="width:3rem; height:3rem" class="m-5" :variant="'info'" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "brand",
        "imagine",
        "formaCaroserie",
        "culoare",
        "model",
        "caiPutere",
        "capacitateCilindrica"
      ],
      carsArray: [],
      isLoading: true
    };
  },
  props: {
    fetchDataFromApi: Function,
    getRowDataForTableItems: Function
  },
  methods: {
    selectRow(data) {
      //   console.log({...data.item});
      this.getRowDataForTableItems(data.item);
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    // console.log("ItemsTable mounted");
    this.fetchDataFromApi()
      .then(carsData => {
        this.carsArray = carsData;
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.car-images {
  display: block;
}
</style>