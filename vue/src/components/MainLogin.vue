<template>
<div>
    <div class="container text-center mx-auto mt-36">
        <form class="form-group w-1/3 m-auto flex-col" id="loginForm" action="#" onsubmit="return false">
        <!-- <div class="text-center mb-16">
            <img class="mx-auto" src="/images/logo_rem_login.png" alt="REM d.o.o.">
        </div> -->
        <h2 class="form-signin-heading text-3xl font-bold mb-2 mainHeading">Login into the portal</h2>
        <!-- <div class="form-signin-heading text-sxl mb-10">Portal za oddajo povpraševanj, spremljanje<br>projektov in komunikacija s podjetjem Senči d.o.o.</div> -->
            <div class="mt-4 border border-gray-200 rounded-md emailWrapper">
                <input type="email" id="inputEmail" name="email" placeholder="E-mail" @change="removeErrorBorder()" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required autofocus>
            </div>
            <div class="mt-4 border border-gray-200 rounded-md passwordWrapper">
                <input type="password" id="inputPassword" name="password" placeholder="Password" @change="removeErrorBorder()" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required>
            </div>
            <button @click="login()" class="flex justify-center w-full outline-none focus:outline-none bg-green-600 hover:bg-green-700 text-sm text-white font-semibold tracking-wide py-5 mt-4 mb-4 rounded-full">
                Login
            </button>
            <router-link :to="{ name: 'MainRegister' }" class="text-xs outline-none focus:outline-none underline text-remLostPass">
                Register
            </router-link>
        </form>

    </div>
</div>
</template>

<script>
import {toolsMixins} from '@/mixins/toolsMixins'
import {fetchMixins} from '@/mixins/fetchMixins'

export default {
    data() {
        return {}
    },

    mixins: [toolsMixins, fetchMixins],

    created() {
        this.checkIfLoggedIn(true);
    },

    methods: {
        async login() {
            let inputEmail = document.querySelector('#inputEmail').value;
            let inputPassword = document.querySelector('#inputPassword').value;

            let loginParameters = {
                'email': inputEmail,
                'password': inputPassword
            }

            if (!inputEmail || !inputPassword) {
                this.addErrorBorder();
                return;
            }

            this.axios.post(`/api/` + 'login', loginParameters)
            .then(async axiosRes => {
                if (axiosRes.data.message == 'Login successful') {
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

            /* const loginResponse = await (await this.doApiRequest("login", "POST", loginParameters, true)).json();
            if (loginResponse.message == 'Login successful') {
                //document.cookie = "jwt=" + loginResponse.jwt + ";path=/";
                console.log("Login success");

                this.$store.commit('setJwt', loginResponse.data.jwt);
                this.$store.commit('setUser', loginResponse.data.user);
                this.$store.commit('setProjects', []);
                this.$router.push({
                    name: 'MainProjekti'
                });
            }
            else{
                this.addErrorBorder();
            } */
        },
        addErrorBorder(){
            window.document.querySelector('.passwordWrapper').classList.add('border-red-500');
            window.document.querySelector('.emailWrapper').classList.add('border-red-500');
        },
        removeErrorBorder(){
            window.document.querySelector('.passwordWrapper').classList.remove('border-red-500');
            window.document.querySelector('.emailWrapper').classList.remove('border-red-500');
        }
    }
}
</script>
