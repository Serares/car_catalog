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
      <div v-else-if="selectedAction === 2">Sterge</div>
      <div v-else>
        Selecteaza o actiune
        <!-- aici sa fie un tabel cu toate masinile din baza de date -->
      </div>
    </b-container>
  </div>
</template>

<script>
// import Authentication from "@/services/AuthenticationService";
import RequestHandler from "@/services/requestHandlers.js";
import AddCarForm from "@/components/AddCarForm";

export default {
  components: {
    AddCarForm
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
      fetch(RequestHandler.reqUrl()+"/addCar", {
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
        .catch(err =>{
          console.log(err);
        });
    }
  },
  mounted: () => {
    console.log(RequestHandler.reqUrl());
  }
};
</script>