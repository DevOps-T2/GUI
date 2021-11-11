<template>
    <div class="container text-center">
        <form class="form-group w-50 m-auto" id="registerForm" action="#" onsubmit="return false">
            <h1 id="errorMessage" class="my-2"></h1>
            <h2 class="form-signin-heading" >Register</h2>
            <input type="email" id="inputEmail" name="email" class="form-control w-100 my-2 username-field input-lg" placeholder="test@test.com" required autofocus>
            <input type="password" id="inputPassword" name="password" class="form-control w-100 mb-2" placeholder="Password" required>
            <input type="text" id="inputDisplayName" name="displayname" class="form-control w-100 mb-2" placeholder="Display name" required>
            <input type="number" id="inputMfilesID" name="mfilesID" class="form-control w-100 mb-2" placeholder="Mfiles ID" required>
            <button class="btn btn-lg btn-primary btn-block" v-on:click="register()">Register</button>
            <router-link class="btn btn-lg btn-primary btn-block" :to="{ name: 'MainLogin' }">Login</router-link>
        </form>
        
    </div>
</template>

<script>
 
import { toolsMixins } from '@/mixins/toolsMixins' 
import { fetchMixins } from '@/mixins/fetchMixins' 

    export default {
        data() {
            return {
            }
        },

        mixins: [toolsMixins, fetchMixins],

        created(){
            this.checkIfLoggedIn(true);
        },

        methods: {
            async register() {
                let inputEmail  = document.querySelector('#inputEmail').value;
                let inputPassword  = document.querySelector('#inputPassword').value;
                let inputDisplayName  = document.querySelector('#inputDisplayName').value;
                let inputMfilesID  = document.querySelector('#inputMfilesID').value;

                let registerParameters = {
                    'email': inputEmail,
                    'password': inputPassword,
                    'displayName': inputDisplayName,
                    'mfilesID': inputMfilesID
                }

                if(!inputEmail || !inputPassword || !inputDisplayName || !inputMfilesID) return;

                this.axios.post('http://' + process.env.VUE_APP_BASE_URL + '/api/' + 'register', registerParameters)
                .then(axiosRes => {
                    if (axiosRes.data.message == 'Registration successful') {
                        //document.cookie = "jwt=" + loginResponse.jwt + ";path=/";
                        console.log("Login success");

                        this.$store.commit('setJwt', axiosRes.data.data.jwt);
                        this.$store.commit('setUser', axiosRes.data.data.user);
                        this.$store.commit('setPovprasevanja', []);
                        this.$router.push({
                            name: 'MainProjekti'
                        });
                    }
                    else{
                        this.addErrorBorder();
                    }
                })
                .catch(axiosErr => {
                    console.log("Axios error: " + axiosErr);
                    alert("Axios error: " + axiosErr);
                });
            },
        }
    }

</script>
