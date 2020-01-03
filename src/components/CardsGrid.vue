<template>
  <div>
    <div>
      <b-nav style="border-bottom:1px solid #efefef;">
        <b-nav-item disabled>Sorteaza</b-nav-item>
        <b-nav-item-dropdown text="Dupa:" toggle-class="nav-link-custom" right>
          <b-dropdown-item @click="sortCarDataItems('brand', 'asc')">Ascendent Brand</b-dropdown-item>
          <b-dropdown-item @click="sortCarDataItems('brand', 'des')">Descendent Brand</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Ascendent Cai Putere</b-dropdown-item>
          <b-dropdown-item>Descendent Cai Putere</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </div>
    <b-container v-if="!isLoading">
      <b-row class="d-flex justify-content-center mb-3">
        <b-col cols="12" sm="5" class="my-1" :key="index" v-for="(item, index) in paginatedItems">
          <b-card
            text-variant="black"
            :header="item.brand +' '+ item.model"
            class="text-center"
            :img-src="item.imagine"
            style="max-width:390px;"
          >
            <p class="card-text">CP:{{item.caiPutere}} CC:{{item.caiPutere}}</p>
            <p class="card-text">Culoare: {{item.culoare}} Caroserie: {{item.formaCaroserie}}</p>
            <!-- <p class="d-flex justify-content-center mb-3"><img style="display:block; max-width:190px; height:120px;" :src="item.imagine" /></p> -->
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination
            @change="onPageChanged"
            :total-rows="totalCards"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"
          />
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else>
      <div>
        <b-spinner style="width:3rem; height:3rem" class="m-5" :variant="'info'" label="Loading..."></b-spinner>
      </div>
    </b-container>
  </div>
</template>


<script>
import { fetchDataFromApi } from "../data/carsDataRequest";

export default {
  props: {
    sortedCarsData: Array,
    getSortedDataFromCards: Function
  },
  data() {
    return {
      //items: items,
      paginatedItems: [],
      perPage: 4,
      totalCards: null,
      currentPage: 1,
      carsData: [],
      isLoading: true
    };
  },
  methods: {
    fetchDataFromApi,
    paginate(page_size, page_number) {
      let itemsToParse = this.carsData;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    sortCarDataItems(type, dir) {
      this.isLoading = true;
      this.getSortedDataFromCards(type, dir);
    }
  },
  computed: {},
  watch: {
    sortedCarsData(newVal, oldVal) {
      oldVal;
      // trimit pe prima pagina cand se face sortarea in caz ca este pe o pagina superioara
      this.currentPage > 1 ? (this.currentPage = 1) : null;
      console.log("Updated sorted cars data");
      this.carsData = newVal;
      this.paginate(this.perPage, 0);
      this.isLoading = false;
    }
  },
  mounted: function() {
    this.fetchDataFromApi()
      .then(res => {
        this.carsData = res;
        this.totalCards = this.carsData.length;
        this.paginate(this.perPage, 0);
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.br-row .col {
  background-color: red;
}
</style>
