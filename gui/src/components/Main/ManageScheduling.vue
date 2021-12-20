<template>
            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-8">
                <div class="text-center p-6 text-2xl font-bold">
                    Schedule execution
                </div>
                <div class="flex px-20 py-4 justify-between border-t">
                    <select id="mznSelect" style="text-transform: capitalize" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option v-for="(mznFile, index) of mznFiles" :key="mznFile.fileUUID" :value="mznFile.fileUUID" style="text-transform: capitalize">ID: {{index}} {{mznFile.fileName}}</option>
                    </select>

                    <select id="dznSelect" style="text-transform: capitalize" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">None</option>
                        <option v-for="(dznFile, index) of dznFiles" :value="dznFile.fileUUID" :key="dznFile.fileUUID" style="text-transform: capitalize">ID: {{index}} {{dznFile.fileName}}</option>
                    </select>
                </div>
                <div class="px-20 pb-4">
                    Solvers:
                    <div v-for="(solver, index) of solvers" :key="solver.id" class="flex items-center mb-4 mt-2">
                        <input :id="'solver-option-' + index" type="checkbox" name="solver" :value="solver.id" class="solverOption h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solver-option" aria-describedby="solver-option">
                        <label :for="'solver-option-' + index" class="solverOption text-sm font-medium text-gray-900 ml-2 block" style="text-transform: capitalize">
                            {{solver.name}}
                        </label>
                    </div>
                </div>
                <div class="px-20 pb-4">
                    <div class="flex mb-4 mt-2">
                        <div class="pl-2">Timeout (in seconds)</div>
                        <div class="pl-20">Memory limit (in Megabytes)</div>
                        <div class="pl-4">vCPUs</div>
                    </div>
                    <div class="flex mb-4 mt-2">
                        <input id="timeoutInput" value="60" type="number" placeholder="Timeout in seconds" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                        <input id="memoryInput" value="300" type="number" placeholder="Memory limit in MB" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                        <input id="vcpusInput" value="1" type="number" placeholder="No. of vCPUs" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                    </div>
                </div>
                <div class="px-20 pb-4">
                    Solver options:
                    <div class="flex items-center mb-4 mt-4">
                        <input id="solverConf-option-1" type="radio" name="solverConf" value="Free search" class="solverConfOption h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solverConf-option-1" aria-describedby="solverConf-option-1" checked>
                        <label for="solverConf-option-1" class="text-sm font-medium text-gray-900 ml-2 block">
                            Free search
                        </label>
                    </div>

                    <div class="flex items-center mb-4">
                        <input id="solverConf-option-2" type="radio" name="solverConf" value="Return all solutions" class="solverConfOption h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solverConf-option-2" aria-describedby="solverConf-option-2">
                        <label for="solverConf-option-2" class="text-sm font-medium text-gray-900 ml-2 block">
                            Return all solutions
                        </label>
                    </div>
                </div>
                <div class="flex px-20 pb-4 justify-center">
                    <button @click="scheduleExecution" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full text-xl">
                        Execute
                    </button>
                </div>
            </div>
</template>

<script>

export default {
    

    components: {

    },
    data() {
        return {
            solvers: [],
            mznFiles: [],
            dznFiles: [],
            user: null,
            jwt: null,
        };
    },

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
    },

    mounted() {
        this.refreshSolvers();
        this.refreshFiles();
    },

    watch: {

    },

    methods: {
        async refreshSolvers() {
            this.solvers = await (await fetch('http://34.140.9.12/api/solvers/Solvers', {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
        },
        async refreshFiles() {
            let files = await (await fetch('http://34.140.9.12/api/minizinc/' + this.user.id, {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
            this.mznFiles = [];
            this.dznFiles = [];
            for(let file of files){
                if (file.fileName.includes(".mzn"))         this.mznFiles.push(file);
                else if (file.fileName.includes(".dzn"))    this.dznFiles.push(file);
            }
        },
        async scheduleExecution(){
            let mzn_id = document.querySelector("#mznSelect").value;
            let dzn_id = document.querySelector("#dznSelect").value || null;
            let timeout = document.querySelector("#timeoutInput").value;
            let memory = document.querySelector("#memoryInput").value;
            let vcpus = document.querySelector("#vcpusInput").value;

            let solvers = Array.from(document.querySelectorAll(".solverOption")).filter(el => el.checked).map(el => el.value);
            let solverConf = document.querySelector('input[name="solverConf"]:checked').value;

            if (solvers.length == 0) { alert("No solvers selected"); return;}

            let reqBody = {
                solver_ids: solvers, 
                mzn_file_id: mzn_id,
                vcpus: vcpus,
                memory: memory,
                timeout_seconds: timeout,
                solver_options: solverConf,
                user_id: this.user.id
            }

            if (dzn_id) reqBody["dzn_file_id"] = dzn_id;

            console.log(reqBody);


            this.axios.post('http://34.140.9.12/api/scheduler/computation', reqBody, {
                headers: {
                    'Content-Type': 'application/json',
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
