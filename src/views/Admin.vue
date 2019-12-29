<template>
  <div class="admin">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div>Welcome to admin page</div>
    <ul>
      <li>
        <a>Add Car</a>
      </li>
      <li>
        <a>Modify Car</a>
      </li>
      <li>
        <a>Delete Car</a>
      </li>
    </ul>
    <input type="text" v-model="email" placeholder="email" />
    <input type="button" @click="register" value="Click ME!"/>
  </div>
</template>

<script>
import Authentication from '@/services/AuthenticationService';

export default {
  data() {
    return {
      email: "abc"
    };
  },
  methods:{
      async register(){
          const response = await Authentication.register({
              email: this.email
          });
          console.log(response.data);
      }
  }
};
</script>