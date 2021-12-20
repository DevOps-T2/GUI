<template>
<div>

            <div class="flex justify-between mb-9">
                <div class="text-3xl leading-loose font-medium mainHeading">
                    Dashboard
                </div>
                <div>
                    <button @click="getCurrentComputations();getFinishedComputations();" class="mr-4 leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-green-600 hover:bg-green-700 rounded-full px-10 py-3 ">
                        Refresh Computations
                    </button>
                </div>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mb-8">
                <div class="text-center p-6 text-xl">
                    Resource Limits
                </div>
                <div class="flex px-20 py-4 justify-between border-t">
                    <user-resource-limit :quota="quota"></user-resource-limit> 
                </div>
            </div>



            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-8 pb-10">
                <div class="text-center p-6 text-2xl font-bold">
                    Current Computations
                </div>
                <div v-for="computation in currentComputations" :key=computation.id class="mt-2 flex justify-between border-2 border-gray-400 rounded-lg mx-20">
                    <div class="flex m-2">
                        <div class="text-black mx-2 p-2">
                            MZN ID: {{computation.mzn_file_id}}
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            DZN ID: {{computation.dzn_file_id}}
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            Status: Executing
                        </div>
                    </div>
                    <div>
                        <button @click="terminateComputation(computation.id)" class="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-full m-2">
                            Terminate
                        </button>
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

import UserResourceLimit from '@/components/Quotas/UserResourceLimit.vue'

export default {
    
    components: {
        UserResourceLimit
    },

    data() {
        return {
            povprasevanjaData: this.$store.getters.getPovprasevanja,
            fetchingPovprasevanja: false,
            quota: null,
            currentComputations: [],
        };
    },

    mixins: [],

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
    },

    mounted(){
        this.fetchQuotas();
        this.getCurrentComputations();
    },

    methods: {
        async fetchQuotas() {
            this.quota = await (await fetch('http://34.140.9.12/api/quotas/quota/' + this.user.id, {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
        },

     
        getCurrentComputations(){
            this.axios.get('http://34.140.9.12/api/scheduler/computations/' + this.user.id, {
                headers: {
                    'Authorization': "Bearer " + this.jwt
                }
            })
            .then(axiosRes => {
                let axiosJson = axiosRes.data;
                console.log("Current computations: ");
                console.log(axiosJson);
                this.currentComputations = axiosJson;
            })
            .catch(axiosErr => {
                console.log("Axios error: " + axiosErr);
                alert("Axios error: " + axiosErr);
            });
        },
        terminateComputation(computationId){
            this.axios.delete('http://34.140.9.12/api/scheduler/computation/' + computationId, {
                headers: {
                    'Authorization': "Bearer " + this.jwt
                }
            })
            .then(axiosRes => {
                let axiosJson = axiosRes.data;
                console.log(axiosJson);
            })
            .catch(axiosErr => {
                console.log("Axios error: " + axiosErr);
                alert("Axios error: " + axiosErr);
            });
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
