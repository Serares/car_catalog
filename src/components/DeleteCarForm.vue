<template>
  <div class="delete_car_form">
    <b-form @submit.prevent="submitHandler">
      <b-form-group
        id="input-group-1"
        label="ID:"
        label-for="input-1"
        description="Id-ul masinii"
      >
        <b-form-input id="input-1" v-model="form.idMasina" type="number" required placeholder="Id Masina"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <ItemsTable />
  </div>
  
</template>
<script>
import ItemsTable from "../components/ItemsTable";

export default {
  props: {
      deleteCar: Function
  },
  components: {
    ItemsTable
  },
  data() {
    return {
      form: {
        idMasina:""
      }
    };
  },
  methods: {
    submitHandler() {
        this.deleteCar(this.form.idMasina);
    }
  }
};
</script>
