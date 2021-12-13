<template>
  <div v-if="user" class="">
    <div class="ml-2 flex flex-col h-screen pb-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
      <div class="text-xl font-semibold text-left mt-6 mb-8 ml-6 text-green-600">PORTAL</div>

      <div class="flex mt-3 cursor-default ml-4">
        <img class="object-cover w-16 h-16 mr-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar">
        <div class="">
          <h4 class="mx-2 mb-2 font-medium text-sm dark:text-gray-200 hover:underline mainHeading">{{user.displayName}}</h4>
          <div class="mx-2 mt-1 text-xs font-medium text-remSideBarGray dark:text-gray-400 hover:underline">{{user.email}}</div>
        </div>
      </div>
      
      <div class="flex flex-col justify-between flex-1 mt-1">
        <nav class="">
          <!-- <router-link :to="{ name: 'MainDashboard' }" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <img class="inline mr-2" src="/svgs/dashboard.svg" />

            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Nadzorna plošča</span>
          </router-link> -->

          <!--
          <router-link :to="{ name: 'povprasevanje' }" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <span class="mx-4 font-medium">Povpraševanje</span>
          </router-link>

          -->

          <router-link :to="{ name: 'MainUserControls' }" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <img class="inline mr-2" src="/svgs/projekti.svg" />

            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Dashboard</span>
          </router-link>
          <router-link :to="{ name: 'AdminPanel' }" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700">
            <img class="inline mr-2" src="/svgs/projekti.svg" />

            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Admin panel</span>
          </router-link>

          <!-- <a class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <img class="inline mr-2" src="/svgs/dokumenti.svg" />

            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Dokumenti</span>
          </a> -->

          <a v-if="$store.getters.getJwt" v-on:click="logout()" class="flex items-center px-4 py-2  text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <img class="inline mr-2" src="/svgs/logout.svg" />

            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Logout</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMixins } from "@/mixins/fetchMixins";
import { toolsMixins } from "@/mixins/toolsMixins";

export default {
  data() {
    return {
      user: "",
    };
  },

  created() {
    this.user = this.$store.getters.getUser;
  },

  mixins: [toolsMixins, fetchMixins],

  methods: {
    logout() {
      this.$store.commit('setJwt', "");
      this.$store.commit('setUser', "");
      //this.$store.commit('setProjects', "");
      //this.$store.commit('setMfilesID', "");
      //console.log(this.$store.state);
      sessionStorage.clear();
      this.$router.push({ name: 'MainLogin' });
    },
  },
};
</script>

<style>
@media (max-width: 600px) {
  .nav-item {
    font-size: 2em;
    width: 50%;
    text-align: center;
  }

  body > .container {
    padding: 0;
  }

  ul.navbar-nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .navbar-toggler.hidden {
    visibility: hidden;
  }

  .navbar-toggler.hidden.collapsed {
    display: none;
  }
}
</style>
