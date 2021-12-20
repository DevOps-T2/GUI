<template>
<div>
    <!-- Main Body -->
    <div class="mt-4 mb-4 col-span-2">
        <!-- Main Content -->
        <div class="text-left w-full mt-36 ml-auto mr-auto">
            <div class="flex justify-between mb-9">
                <div class="text-3xl leading-loose font-medium mainHeading">
                    Dashboard
                </div>
                <div>
                    <button @click="refreshFiles()" class="mr-4 leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-gray-500 hover:bg-gray-700 rounded-full px-10 py-3 ">
                        Refresh Files
                    </button>
                    <button @click="refreshSolvers()" class="mr-4 leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-green-600 hover:bg-green-700 rounded-full px-10 py-3 ">
                        Refresh Solvers
                        <div class="inline">
                            <div class="bi bi-arrow-repeat animate-spin inline-block" :class="fetchingPovprasevanja ? '' : 'hidden'"></div>
                        </div>
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

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4">
                <div class="text-center p-6 text-xl">
                    MZN instances
                </div>
                <div v-for="(mznFile, index) of mznFiles" :key="mznFile.fileUUID" class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: {{index}}
                    </div>

                    <div style="min-width: 200px">
                        File: {{mznFile.fileName}}
                    </div>

                    <button @click="showFile(mznFile.fileUUID)" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                        Show
                    </button>

                    <input type="file" :id="'mznUpdate' + index" @change="uploadFile('mzn', 'mznUpdate' + index, mznFile.fileUUID)" class="hidden">
                    <label :for="'mznUpdate' + index" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Update</label>
                    
                    <button @click="deleteFile(mznFile.fileUUID)" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 pb-4 pt-6 justify-center border-t">
                    <input type="file" id="mznUpload" @change="uploadFile('mzn', 'mznUpload')" class="hidden">
                    <label for="mznUpload" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Upload</label>
                </div>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-4">
                <div class="text-center p-6 text-xl">
                    DZN instances
                </div>
                <div v-for="(dznFile, index) of dznFiles" :key="dznFile.fileUUID" class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: {{index}}
                    </div>

                    <div style="min-width: 200px">
                        File: {{dznFile.fileName}}
                    </div>

                    <button @click="showFile(dznFile.fileUUID)" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                        Show
                    </button>

                    <input type="file" :id="'dznUpdate' + index" @change="uploadFile('dzn', 'dznUpdate' + index, dznFile.fileUUID)" class="hidden">
                    <label :for="'dznUpdate' + index" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Update</label>
                    
                    <button @click="deleteFile(dznFile.fileUUID)" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 pb-4 pt-6 justify-center border-t">
                    <input type="file" id="dznUpload" @change="uploadFile('dzn', 'dznUpload')" class="hidden">
                    <label for="dznUpload" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Upload</label>
                </div>
            </div>

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
                <!-- <div class="px-20 pb-4">
                    <div class="flex items-center mb-4">
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
                </div> -->
                <div class="flex px-20 pb-4 justify-center">
                    <button @click="scheduleExecution" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full text-xl">
                        Execute
                    </button>
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
            solvers: [],
            mznFiles: [],
            dznFiles: [],
            quota: null,
            currentComputations: [{
                "id": 0,
                "solver_ids": [
                    "1"
                ],
                "mzn_file_id": "6ed4ef44-7a71-45aa-80ff-3f05dcb00b74",
                "vcpus": "1",
                "memory": "1",
                "user_id": "61c030ad2318c1069de49267",
                "dzn_file_id": "eab644de-cc32-4be0-9fd2-d5e3d54d327c"
            }],
            finishedComputations: [{
                "id": 0,
                "solver_ids": [
                    "1"
                ],
                "mzn_file_id": "6ed4ef44-7a71-45aa-80ff-3f05dcb00b74",
                "vcpus": "1",
                "memory": "1",
                "user_id": "61c030ad2318c1069de49267",
                "dzn_file_id": "eab644de-cc32-4be0-9fd2-d5e3d54d327c"
            }],
        };
    },

    mixins: [],

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
    },

    mounted(){
        this.fetchQuotas();
        this.refreshSolvers();
        this.refreshFiles();
    },

    methods: {
        async setTempData() {
        },

        async fetchQuotas() {
            this.quota = await (await fetch('http://34.140.9.12/api/quotas/quota/' + this.user.id, {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
        },

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
        async showFile(fileUUID){
            let fileUrl = await(await fetch('http://34.140.9.12/api/minizinc/' + this.user.id + '/' + fileUUID, {
                headers: {
                    Authorization: "Bearer " + this.jwt
                }
            })).text();
            console.log(fileUrl);
            window.open(fileUrl.replace('"','').replace('"',''), '_blank');
        },
        async uploadFile(type, id, fileUUID){
            let googleFileData;
            if(fileUUID){
                googleFileData = await (await fetch(`http://34.140.9.12/api/minizinc/upload?userID=${this.user.id}&fileUUID=${fileUUID}`, {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
            }
            else{
                googleFileData = await (await fetch('http://34.140.9.12/api/minizinc/upload', {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
            }
            let formData = new FormData();
            let file = document.querySelector('#' + id);
            if(!file.files[0]) {alert("No file"); return;}
            let filename = file.files[0].name;

            if(type === "mzn" && !file.files[0].name.includes(".mzn")){ alert("Not a mzn file"); return; }
            else if(type === "dzn" && !file.files[0].name.includes(".dzn")){ alert("Not a dzn file"); return; }

            formData.append(filename, file.files[0]);
            file.value = "";

            this.axios.put(googleFileData.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(axiosRes => {
                console.log("google storage response: ");
                console.log(axiosRes);

                this.axios.post('http://34.140.9.12/api/minizinc/upload', {userID: this.user.id, fileName: filename, fileUUID: googleFileData.fileUUID}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + this.jwt
                    }
                })
                .then(axiosRes => {
                    let axiosJson = axiosRes.data;
                    console.log(axiosJson);
                    this.refreshFiles();
                })
                .catch(axiosErr => {
                    console.log("Axios error: " + axiosErr);
                    alert("Axios error: " + axiosErr);
                });

            })
            .catch(axiosErr => {
                console.log("Axios error: " + axiosErr);
                alert("Axios error: " + axiosErr);
            });

        },
        async deleteFile(fileUUID){
            console.log(fileUUID);
            let response = await fetch('http://34.140.9.12/api/minizinc/' + this.user.id + '/' + fileUUID, {
                method: "DELETE",
                headers: {
                        'Authorization': "Bearer " + this.jwt
                    }
                });
            console.log(response);
            this.refreshFiles();
        },
        async scheduleExecution(){
            let mzn_id = document.querySelector("#mznSelect").value;
            let dzn_id = document.querySelector("#dznSelect").value || null;
            //let timeout = document.querySelector("#timeoutInput").value;
            let memory = document.querySelector("#memoryInput").value;
            let vcpus = document.querySelector("#vcpusInput").value;

            let solvers = Array.from(document.querySelectorAll(".solverOption")).filter(el => el.checked).map(el => el.value);
            //let solverConf = document.querySelector('input[name="solverConf"]:checked').value;

            if (solvers.length == 0) { alert("No solvers selected"); return;}

            let reqBody = {
                solver_ids: solvers, 
                mzn_file_id: mzn_id,
                vcpus: vcpus,
                memory: memory,
                //solver_options: [solverConf],
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
        getCurrentComputations(){
            this.axios.get('http://34.140.9.12/api/scheduler/computations/' + this.user.id, {
                headers: {
                    'Authorization': "Bearer " + this.jwt
                }
            })
            .then(axiosRes => {
                let axiosJson = axiosRes.data;
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
                this.finishedComputations = axiosJson;
            })
            .catch(axiosErr => {
                console.log("Axios error: " + axiosErr);
                alert("Axios error: " + axiosErr);
            });
        },
        getFinishedComputations(){
            this.axios.get('http://34.140.9.12/api/solutions/computations/' + this.user.id, {
                headers: {
                    'Authorization': "Bearer " + this.jwt
                }
            })
            .then(axiosRes => {
                let axiosJson = axiosRes.data;
                console.log(axiosJson);
                this.computations = axiosJson;
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
