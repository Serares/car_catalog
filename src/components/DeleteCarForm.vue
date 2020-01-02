<template>
  <div class="delete_car_form">
    <b-form @submit.prevent="submitHandler">
      <b-form-group
        id="input-group-1"
        label="Brand:"
        label-for="input-1"
        description="Brandul masinii"
      >
        <b-form-input id="input-1" v-model="form.brand" type="text" required placeholder="Brand"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Model:" label-for="input-2">
        <b-form-input id="input-2" type="text" v-model="form.model" required placeholder="Model"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Forma caroserie:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.formaCaroserie"
          :options="formaCaroserie"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-4" label="Capacitatea cilindrica:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.capacitateCilindrica"
          type="number"
          step="any"
          required
          placeholder="Capacitatea cilindrica"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Cai putere:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.caiPutere"
          type="number"
          required
          placeholder="Caii putere"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6" label="Culoare:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.culoare"
          type="text"
          required
          placeholder="Culoarea"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-7" label="Imagine:" label-for="input-7">
        <b-form-input
          id="input-7"
          v-model="form.imagine"
          type="text"
          required
          placeholder="Url-ul imaginii:"
        ></b-form-input>
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
  props: {},
  components: {
    ItemsTable
  },
  data() {
    return {
      formaCaroserie: ["sedan", "coupe", "cabriolet", "duba"],
      form: {
        brand: "",
        model: "",
        formaCaroserie: "",
        capacitateCilindrica: "",
        caiPutere: "",
        culoare: "",
        imagine: ""
      }
    };
  },
  methods: {
    submitHandler() {}
  }
};
</script>
