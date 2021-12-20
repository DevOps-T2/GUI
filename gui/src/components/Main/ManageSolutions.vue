<template>
            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-8 pb-10">
                <div class="text-center p-6 text-2xl font-bold">
                    Finished Computations
                </div>
                <div v-for="computation in finishedComputations" :key=computation.id class="mt-2 flex justify-between border-2 border-gray-400 rounded-lg mx-20">
                    <div class="flex m-2">
                        <div class="text-black mx-2 p-2">
                            MZN ID: {{computation.mzn_file_id}}
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            DZN ID: {{computation.dzn_file_id}}
                        </div>
                        <div class="text-black rounded-lg mx-2 p-2">
                            Status: Finished
                        </div>
                    </div>
                    <div>
                        <button @click="showComputation(computation.id)" class="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-full m-2">
                            Show
                        </button>
                    </div>
                </div>
            </div>
</template>

<script>

export default {
    

    components: {

    },
    data() {
        return {
            finishedComputations: [],
            user: null,
            jwt: null,
        };
    },

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
    },

    mounted() {
        this.getFinishedComputations();
    },

    watch: {

    },

    methods: {
        getFinishedComputations(){
            this.axios.get('http://34.140.9.12/api/solutions/user/' + this.user.id, {
                headers: {
                    'Authorization': "Bearer " + this.jwt
                }
            })
            .then(axiosRes => {
                let axiosJson = axiosRes.data;
                console.log("Finished computations: ");
                console.log(axiosJson.computation_ids);
                this.finishedComputations = axiosJson.computation_ids;
            })
            .catch(axiosErr => {
                console.log("Axios error: " + axiosErr);
                alert("Axios error: " + axiosErr);
            });
        },
        async showComputation(computationId){
            let fileUrl = await(await fetch('http://34.140.9.12/api/solutions/computations' + computationId, {
                headers: {
                    Authorization: "Bearer " + this.jwt
                }
            })).text();
            console.log(fileUrl);
            window.open(fileUrl.replace('"','').replace('"',''), '_blank');
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
