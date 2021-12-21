<template>
<div>
    <h1 class="text-3xl mb-6 font-bold">Solutions</h1>
    <div v-if="solutions.length == 0">
        You currently have no solutions.
    </div>
    <div v-else>
         <div v-for="solution in solutions" :key=solution.fileUUID class="mt-2 flex justify-between border-2 border-gray-400 rounded-lg mx-20">
            <div class="flex m-2">
                <button @click="showFile(solution.fileUUID)" class="text-black rounded-lg mx-2 p-2">
                    File Name: {{solution.fileName}}
                </button>
                <div class="text-black rounded-lg mx-2 p-2">
                    Status: Finished
                </div>
            </div>
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
            solutions: []
        };
    },

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
        this.axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.jwt
        };
    },

    mounted() {
        this.refreshFiles();
    },

    watch: {

    },

    methods: {
        async refreshFiles() {
            this.axios.get('http://'+window.localStorage.getItem('ip')+'/api/minizinc/' + this.user.id)
            .then( response => {
                this.solutions = response.data.filter( file => file.fileName.includes(".txt"));
                console.log(this.solutions)

            });
        },
        async showComputation(computationId){
            let fileUrl = await(await fetch('http://'+window.localStorage.getItem('ip')+'/api/solutions/computations' + computationId, {
                headers: {
                    Authorization: "Bearer " + this.jwt
                }
            })).text();
            console.log(fileUrl);
            window.open(fileUrl.replace('"','').replace('"',''), '_blank');
        },
        async showFile(fileUUID) {
            let fileUrl = await(await fetch('http://'+window.localStorage.getItem('ip')+'/api/minizinc/' + this.user.id + '/' + fileUUID, {
                headers: {
                    Authorization: "Bearer " + this.jwt
                }
            })).text();
            window.open(fileUrl.replace('"','').replace('"',''), '_blank');
        }
    }
}
</script>
