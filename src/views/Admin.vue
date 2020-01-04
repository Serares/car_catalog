<template>
  <div class="admin">
    <b-container>
      <div>
        <b-modal hide-footer ref="my-modal" id="modal-1" title="Date trimise success">
          <p class="b-block text-center">Date trimise</p>
          <p>{{resSuccessMessage}}</p>
        </b-modal>
      </div>
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
            :shouldItemsTableFetch="shouldItemsTableFetch"
            :getRowDataForTableItems="getRowDataForTableItems"
            :fetchDataFromApi="fetchDataFromApi"
          />
        </ModifyCarForm>
      </div>
      <div v-else-if="selectedAction === 2">
        <DeleteCarForm :selectedCarsData="selectedCarsData" :deleteCar="deleteCar">
          <ItemsTable
            :shouldItemsTableFetch="shouldItemsTableFetch"
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
            :shouldItemsTableFetch="shouldItemsTableFetch"
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
import { fetchDataFromApi } from "../data/carsDataRequest";

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
      selectedCarsData: {},
      resSuccessMessage: "",
      shouldItemsTableFetch: false
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
    itemsTableFetch() {
      // un flag care indica faptul ca trebuie facut fetch din nou la tabel
      this.shouldItemsTableFetch = true;
      setTimeout(() => {
        this.shouldItemsTableFetch = false;
      }, 1000);
    },
    sentDataSuccess(res) {
      // flag pentru modal
      this.resSuccessMessage = res.mesaj;
      this.$refs["my-modal"].show();
      setTimeout(() => {
        this.resSuccessMessage = "";
        this.$refs["my-modal"].hide();
      }, 2500);
    },
    getRowDataForTableItems(rowData) {
      // click pe numele unui brand selecteaza datele despre masina si le adauga in selectedCarsData
      //  console.log("Date", rowData);
      this.selectedCarsData = { ...rowData };
    },
    fetchDataFromApi: fetchDataFromApi,
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
          // la success se apeleaza functiile 
          this.sentDataSuccess(data);
          this.itemsTableFetch();
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
          this.sentDataSuccess(data);
          this.itemsTableFetch();
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
          this.sentDataSuccess(data);
          this.itemsTableFetch();
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