<template>
  <div class="admin">
    <b-container>
      <div>Welcome to admin page</div>
      <div>
        <b-nav pills align="center">
          <b-nav-item
            v-for="(item, index) in navItems"
            :key="index"
            @click="selectAction(index)"
            :active="selectedAction === index"
          >{{item.value}}</b-nav-item>
        </b-nav>
      </div>
      <!-- formulare pentru respectivele actiuni de mai sus -->
      <div v-if="selectedAction === 0">
        <AddCarForm :addCar="addCar" />
      </div>
      <div v-else-if="selectedAction === 1">Modifica</div>
      <div v-else-if="selectedAction === 2">
        <DeleteCarForm :deleteCar="deleteCar" />
      </div>
      <div v-else>
        Selecteaza o actiune
        <!-- aici sa fie un tabel cu toate masinile din baza de date -->
        <div>
          <ItemsTable />
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
// import Authentication from "@/services/AuthenticationService";
import RequestURL from "@/services/requestUrl";
import AddCarForm from "@/components/AddCarForm";
import DeleteCarForm from "@/components/DeleteCarForm";
import ItemsTable from "../components/ItemsTable";

export default {
  components: {
    AddCarForm,
    DeleteCarForm,
    ItemsTable
  },
  data() {
    return {
      selectedAction: null,
      navItems: [
        { value: "Adauga" },
        { value: "Modifica" },
        { value: "Sterge" }
      ]
    };
  },
  computed: {},
  methods: {
    /*
    async register() {
      const response = await Authentication.register({
        email: this.email
      });
      console.log(response.data);
    },
    */
    selectAction(itemIndex) {
      console.log("Added events");
      this.selectedAction = itemIndex;
    },
    addCar(jsonForm) {
      fetch(RequestURL.reqUrl() + "/addCar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonForm)
      })
        .then(res => {
          // res.json() returneaza un promise
          return res.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCar(carID) {
      console.log("Delete car", carID);
      fetch(RequestURL.reqUrl() + "/deleteItems", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ carID: carID })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
        });
    }
  },
  mounted: function() {
    console.log(RequestURL.reqUrl());
    /*
    let payload = {
      data: {},
      collection: ""
    };
    carsData
      .then((response)=>{
        payload.data = {...response};
        payload.collection = "masini";
        console.log(payload);
        this.getData(payload);
        this.updateStateWithCarsData(payload);
      })
      .catch(err => {
        console.log("error carsdata ", err);
      });
    */
  }
};
</script>