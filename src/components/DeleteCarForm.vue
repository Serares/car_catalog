<template>
  <div class="delete_car_form">
    <div>masina selectata este {{this.selectedCarsData.brand ? this.selectedCarsData.brand + " " + this.selectedCarsData.model : "nimic selectat" }}</div>
    <b-form @submit.prevent="submitHandler">
      <b-form-group
        id="input-group-1"
        label="Adauga id-ul masinii pe care vrei sa o stergi:"
        label-for="input-1"
        description="Id-ul masinii"
      >
        <b-form-input
          id="input-1"
          v-model="form.idMasina"
          type="number"
          required
          placeholder="Id Masina"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    deleteCar: Function,
    selectedCarsData: Object
  },
  components: {
    // ItemsTable
  },
  data() {
    return {
      form: {
        idMasina:this.selectedCarsData.uID
      }
    };
  },
  watch: {
      selectedCarsData: function(newVal, oldVal){
          oldVal;
          this.form.idMasina = newVal.uID;
      }
  },
  methods: {
    submitHandler() {
      this.deleteCar(this.selectedCarsData);
      //clear input
      this.form.idMasina = "";
    }
  }
};
</script>
