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
      <div v-else-if="selectedAction === 1">
        <ModifyCarForm :selectedCarsData="selectedCarsData" :modifyCar="modifyCar">
          <ItemsTable
            :getRowDataForTableItems="getRowDataForTableItems"
            :fetchDataFromApi="fetchDataFromApi"
          />
        </ModifyCarForm>
      </div>
      <div v-else-if="selectedAction === 2">
        <DeleteCarForm :selectedCarsData="selectedCarsData" :deleteCar="deleteCar">
          <ItemsTable
            :getRowDataForTableItems="getRowDataForTableItems"
            :fetchDataFromApi="fetchDataFromApi"
          />
        </DeleteCarForm>
      </div>
      <div v-else>
        Selecteaza o actiune
        <!-- aici sa fie un tabel cu toate masinile din baza de date -->
        <div>
          <ItemsTable
            :getRowDataForTableItems="getRowDataForTableItems"
            :fetchDataFromApi="fetchDataFromApi"
          />
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
import ModifyCarForm from "@/components/ModifyCarForm";
import ItemsTable from "../components/ItemsTable";

export default {
  components: {
    AddCarForm,
    DeleteCarForm,
    ModifyCarForm,
    ItemsTable
  },
  data() {
    return {
      selectedAction: null,
      navItems: [
        { value: "Adauga" },
        { value: "Modifica" },
        { value: "Sterge" }
      ],
      selectedCarsData: {}
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
    getRowDataForTableItems: function(rowData) {
      //  console.log("Date", rowData);
      this.selectedCarsData = { ...rowData };
    },
    fetchDataFromApi: function() {
      let carsArray = [];
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", RequestURL.reqUrl() + "/getItems/masini/");
        //response type json so it's automatically JSON.parse();
        xhr.responseType = "json";
        xhr.onerror = function() {
          reject(xhr.statustext);
        };
        xhr.onloadstart = function() {
          // console.log("XHR Started");
        };
        xhr.onload = function() {
          let response = xhr.response;
          // console.log("Datele din xhr", response);
          for (let item in response) {
            carsArray.push({
              ...response[item],
              imagine: `<img class='car-images' style='display:block; max-width:120px;' src='${response[item].imagine}' />`
            });
          }
          resolve(carsArray);
        };
        xhr.send();
      });
    },
    selectAction(itemIndex) {
      // console.log("Added events");
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
          data;
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCar(carsData) {
      // console.log("Delete car", carsData);
      fetch(RequestURL.reqUrl() + "/deleteItems", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(carsData)
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          data;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    modifyCar(payload) {
      fetch(RequestURL.reqUrl() + "/updateItem", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
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