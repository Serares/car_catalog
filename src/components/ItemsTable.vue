<template>
  <!-- table where all items will be displayed for delete car and modify car forms -->
  <div class="tabel-car-items">
    <b-table striped hover :items="items" :fields="['nume']"></b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
        items:{nume:"Prenume"}
    };
  },
  computed: {
    ...mapState(["carsData"])
  }
};
</script>