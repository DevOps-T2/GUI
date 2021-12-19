<template>
<div>
    <!-- Main Body -->
    <div class="mt-4 mb-4 col-span-2">
        <!-- Main Content -->
        <div class="text-left w-full pl-40 mt-36 ml-auto mr-auto">
            <div class="flex justify-between mb-9">
                <div class="text-3xl leading-loose font-medium mainHeading">
                    Dashboard
                </div>
                <div>
                    <button @click="setTempData()" class="mr-4 leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-gray-500 hover:bg-gray-700 rounded-full px-10 py-3 ">
                        Placeholder 1
                    </button>
                    <button @click="getPovprasevanja()" class="mr-4 leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-green-600 hover:bg-green-700 rounded-full px-10 py-3 ">
                        Placeholder 2
                        <div class="inline">
                            <div class="bi bi-arrow-repeat animate-spin inline-block" :class="fetchingPovprasevanja ? '' : 'hidden'"></div>
                        </div>
                    </button>
                    <button @click="addNewProject()" class="leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-green-600 hover:bg-green-700 rounded-full px-10 py-3 ">
                        Placeholder 3
                        <img class="inline ml-4 " src="/svgs/addProject.svg" />
                    </button>
                </div>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4">
                <div class="text-center p-6 text-xl">
                    MZN instances
                </div>
                <div class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: 1
                    </div>
                    <div style="min-width: 200px">
                        File: instance.mzn
                    </div>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Download
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Update
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: 2
                    </div>
                    <div style="min-width: 200px">
                        File: instance2.mzn
                    </div>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Download
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Update
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 pb-4 pt-6 justify-center border-t">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Upload
                    </button>
                </div>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-4">
                <div class="text-center p-6 text-xl">
                    DZN instances
                </div>
                <div class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: 1
                    </div>
                    <div style="min-width: 200px">
                        File: instance.dzn
                    </div>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Download
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Update
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: 2
                    </div>
                    <div style="min-width: 200px">
                        File: instance2.dzn
                    </div>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Download
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Update
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 pb-4 pt-6 justify-center border-t">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Upload
                    </button>
                </div>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-8">
                <div class="text-center p-6 text-2xl font-bold">
                    Execute
                </div>
                <div class="flex px-20 py-4 justify-between border-t">
                    <input type="text" placeholder="MZN ID" class="border-2 text-black border-gray-900 rounded-lg mx-2">
                    <input type="text" placeholder="DZN ID" class="border-2 text-black border-gray-900 rounded-lg mx-2">
                    <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>Solver 1</option>
                        <option>Solver 2</option>
                        <option>Solver 3</option>
                    </select>
                </div>
                <div class="flex px-20 pb-4">
                    <input type="number" placeholder="Timeout in seconds" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                    <input type="number" placeholder="Memory limit in MB" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                    <input type="number" placeholder="No. of vCPUs" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                </div>
                <div class="px-20 pb-4">
                    <div class="flex items-center mb-4">
                        <input id="solverConf-option-1" type="radio" name="solverConf" value="Free search" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solverConf-option-1" aria-describedby="solverConf-option-1" checked>
                        <label for="solverConf-option-1" class="text-sm font-medium text-gray-900 ml-2 block">
                            Free search
                        </label>
                    </div>

                    <div class="flex items-center mb-4">
                        <input id="solverConf-option-2" type="radio" name="solverConf" value="Return all solutions" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solverConf-option-2" aria-describedby="solverConf-option-2">
                        <label for="solverConf-option-2" class="text-sm font-medium text-gray-900 ml-2 block">
                            Return all solutions
                        </label>
                    </div>
                </div>
                <div class="flex px-20 pb-4 justify-center">
                    <button class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full text-xl">
                        Execute
                    </button>
                </div>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-8 pb-10">
                <div class="text-center p-6 text-2xl font-bold">
                    Solver status
                </div>
                <div class="flex justify-between border-2 border-gray-400 rounded-lg mx-20">
                    <div class="flex m-2">
                        <div class="text-black mx-2 p-2">
                            MZN ID: 1
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            DZN ID: 1
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            Status: Executing
                        </div>
                    </div>
                    <div>
                        <button class="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-full m-2">
                            Terminate
                        </button>
                    </div>
                </div>
                <div class="flex justify-between border-2 border-gray-400 rounded-lg mx-20 mt-3">
                    <div class="flex m-2">
                        <div class="text-black mx-2 p-2">
                            MZN ID: 1
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            DZN ID: 2
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            Status: Finished
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="mt-4 col-span-2">
    </div>
</div>
</template>

<script>
/* import ProjektData from '@/components/Main/Projekti/ProjektData.vue'; */
import moment from 'moment'
moment.locale('sl');

export default {
    
    /* components: { ProjektData}, */

    data() {
        return {
            povprasevanjaData: this.$store.getters.getPovprasevanja,
            fetchingPovprasevanja: false
        };
    },

    mixins: [],

    created() {
        //this.getProjects();
    },

    methods: {
        async setTempData() {
        },
        async getPovprasevanja() {
            this.fetchingPovprasevanja = true;
            await this.$store.dispatch('fetchPovprasevanja');
            this.fetchingPovprasevanja = false;
            this.povprasevanjaData = await this.$store.getters.getPovprasevanja;
        },
    }
}
</script>

<style scoped>
.borderShadowProject{
    filter: drop-shadow(0px 6px 18px rgba(0, 0, 0, 0.06));
}
.marginBottom{
    margin-bottom:1px;
}

textarea{
    padding: 1rem;
}

input[type=text]{
    padding: 0.5rem;
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
