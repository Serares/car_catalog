<template>
  <!-- table where all items will be displayed for delete car and modify car forms -->
    <div class="tabel-car-items" v-if="carsArray.length > 0">
      <b-table responsive="sm" striped hover :items="carsArray">
        <template :v-slot:cell(imagine)="carsArray">
          <span v-html="carsArray.value"></span>
        </template>
      </b-table>
    </div>
</template>

<script>
import RequestURL from "../services/requestUrl";

export default {
  data() {
    return {
      carsArray: []
    };
  },
  props: {
    carsData: Object
  },
  methods: {
    fetchDataFromApi: function() {
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.open("GET", RequestURL.reqUrl() + "/getItems/masini/");
      xhr.send();
      xhr.onloadstart = function() {
        console.log("XHR Started");
      };
      xhr.onload = function() {
        let response = JSON.parse(xhr.response);
        console.log(response);
        for (let item in response) {
          _this.carsArray.push({
            ...response[item]
          });
        }
      };
    }
  },
  computed: {},
  mounted: function() {
    console.log("ItemsTable mounted");
    this.fetchDataFromApi();
  }
};
</script>