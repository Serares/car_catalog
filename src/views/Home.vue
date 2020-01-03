<template>
  <div class="home">
    <!-- aici se vor afisa toate masinile sub forma de casete cu imagine si descriere -->
    <div class="container-cards">
      <CardsGrid :getSortedDataFromCards="getSortedDataFromCards" :sortedCarsData="sortedCarsData" />
    </div>
  </div>
</template>

<script>
import CardsGrid from "@/components/CardsGrid";
import {getSortedData} from "@/data/carsDataRequest";


export default {
  name: "home",
  data(){
    return{
      sortedCarsData:[]
    }
  },
  components: {
    CardsGrid
  },
  methods:{
    getSortedDataFromCards(type, dir){
      getSortedData(type,dir)
      .then(res=>{
        this.sortedCarsData = res;
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  mounted: () => {
    console.log("Component mounted");
  }
};
</script>
