<template>
<div>
    <div class="mt-4 mr-10 text-right font-semibold text-sm mainHeading">
        <svg class="inline" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0711 2.92891C15.1823 1.0402 12.6711 0 10 0C7.32891 0 4.81769 1.0402 2.92891 2.92891C1.0402 4.81766 0 7.32891 0 10C0 12.6711 1.0402 15.1823 2.92891 17.0711C4.81769 18.9598 7.32891 20 10 20C12.6711 20 15.1823 18.9598 17.0711 17.0711C18.9598 15.1823 20 12.6711 20 10C20 7.32891 18.9598 4.81766 17.0711 2.92891ZM8.10348 1.37766C7.76805 1.70394 7.40551 2.09277 7.04277 2.54535C6.41551 3.32805 5.8932 4.17046 5.48469 5.05637H2.68937C3.93792 3.21594 5.86262 1.87015 8.10348 1.37766ZM2.01934 6.22825H5.02008C4.67855 7.2484 4.47988 8.31546 4.42802 9.41406H1.1918C1.26644 8.28089 1.55558 7.20555 2.01934 6.22825ZM1.1918 10.5859H4.42802C4.47988 11.6845 4.67852 12.7516 5.02008 13.7718H2.01934C1.55558 12.7944 1.26644 11.7191 1.1918 10.5859ZM2.68937 14.9436H5.48469C5.8932 15.8295 6.41551 16.672 7.04277 17.4546C7.40546 17.9072 7.76802 18.296 8.10348 18.6223C5.86262 18.1298 3.93792 16.784 2.68937 14.9436ZM9.41406 18.2346C8.99675 17.8748 8.47789 17.3715 7.95723 16.7218C7.50188 16.1535 7.11191 15.5603 6.78703 14.9436H9.41406V18.2346ZM9.41406 13.7718H6.25852C5.87762 12.763 5.65825 11.699 5.60137 10.5859H9.41406V13.7718ZM9.41406 9.41406H5.60137C5.65828 8.30117 5.87792 7.23723 6.25898 6.22825H9.41406V9.41406ZM9.41406 5.05637H6.78703C7.10523 4.45238 7.48602 3.87078 7.92934 3.31312C8.45665 2.64988 8.98777 2.13454 9.41406 1.76703V5.05637ZM18.8082 9.41406H15.572C15.5202 8.31546 15.3215 7.2484 14.9799 6.22825H17.9806C18.4445 7.20555 18.7335 8.28089 18.8082 9.41406ZM17.3106 5.05637H14.5153C14.1068 4.17051 13.5845 3.32805 12.9572 2.54535C12.5945 2.09277 12.232 1.70394 11.8965 1.37766C14.1374 1.87015 16.0622 3.21594 17.3106 5.05637ZM10.5859 1.76538C11.0032 2.1252 11.5221 2.62852 12.0428 3.2782C12.4981 3.8464 12.8881 4.43972 13.213 5.05637H10.5859V1.76538ZM10.5859 6.22825H13.7415C14.1224 7.23703 14.3418 8.30102 14.3986 9.41406H10.5859V6.22825ZM10.5859 10.5859H14.3986C14.3417 11.6988 14.122 12.7628 13.741 13.7718H10.5859V10.5859ZM10.5859 18.2329V14.9436H13.213C12.8948 15.5477 12.514 16.1292 12.0707 16.6868C11.5434 17.3502 11.0123 17.8654 10.5859 18.2329ZM11.8966 18.6223C12.232 18.296 12.5945 17.9072 12.9573 17.4546C13.5845 16.672 14.1068 15.8295 14.5154 14.9436H17.3106C16.0622 16.784 14.1374 18.1298 11.8966 18.6223ZM17.9806 13.7718H14.9799C15.3214 12.7516 15.5202 11.6845 15.572 10.5859H18.8082C18.7335 11.7191 18.4445 12.7944 17.9806 13.7718Z" fill="#123E67" />
        </svg>
        Slovenščina
    </div>
    <div class="container text-center mx-auto mt-36">
        <form class="form-group w-1/3 m-auto flex-col" id="loginForm" action="#" onsubmit="return false">
        <!-- <div class="text-center mb-16">
            <img class="mx-auto" src="/images/logo_rem_login.png" alt="REM d.o.o.">
        </div> -->
        <h2 class="form-signin-heading text-3xl font-bold mb-2 mainHeading">Prijava v Medle portal</h2>
        <!-- <div class="form-signin-heading text-sxl mb-10">Portal za oddajo povpraševanj, spremljanje<br>projektov in komunikacija s podjetjem Senči d.o.o.</div> -->
            <div class="mt-4 border border-gray-200 rounded-md emailWrapper">
                <input type="email" id="inputEmail" name="email" placeholder="E-mail" @change="removeErrorBorder()" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required autofocus>
            </div>
            <div class="mt-4 border border-gray-200 rounded-md passwordWrapper">
                <input type="password" id="inputPassword" name="password" placeholder="Geslo" @change="removeErrorBorder()" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required>
            </div>
            <button @click="login()" class="flex justify-center w-full outline-none focus:outline-none bg-green-600 hover:bg-green-700 text-sm text-white font-semibold tracking-wide py-5 mt-4 mb-4 rounded-full">
                Prijavi se v portal
            </button>
            <button class="text-xs outline-none focus:outline-none underline text-remLostPass">
                Pozabljeno geslo
            </button>
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

            this.axios.post(`${process.env.VUE_APP_BASE_PROTOCOL}://${process.env.VUE_APP_BASE_URL}/api/` + 'login', loginParameters)
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
