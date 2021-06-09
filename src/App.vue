<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
    >
      <div class="d-flex align-center">
      <span class="mr-1">Лogach</span>
      </div>
      <v-btn
        href='http://localhost:8080/'
        text
        >
        <span class="mr-2">Главная</span>
      </v-btn>
      <v-btn
        href='http://localhost:8080/theory'
        text
        >
        <span class="mr-2">Теория</span>
      </v-btn>
      <v-btn
        href='http://localhost:8080/practice'
        text
        >
        <span class="mr-2">Практика</span>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href='http://localhost:8080/log'
        target="_blank"
        text
      >
        <span class="mr-2">Войти</span>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view />
      <!-- <HelloWorld/> -->
    </v-main>
    <!-- <v-main>
      <Login/>
      <Register/>
    </v-main> -->
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Login from '@/views/login';
// import Register from '@/views/register';

export default {
  name: 'App',

  // components: {
  //   HelloWorld,
  //   Login,
  //   Register
  // },

  data: () => ({
    //
  }),
};
</script>
