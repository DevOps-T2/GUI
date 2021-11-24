<template>
<div>
    <div class="container text-center mx-auto mt-36">
        <form class="form-group w-1/3 m-auto flex-col" id="loginForm" action="#" onsubmit="return false">
        <h2 class="form-signin-heading text-3xl font-bold mb-2 mainHeading">Register a user</h2>
            <div class="mt-4 border border-gray-200 rounded-md emailWrapper">
                <input type="email" id="inputEmail" name="email" placeholder="E-mail" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required autofocus>
            </div>
            <div class="mt-4 border border-gray-200 rounded-md passwordWrapper">
                <input type="password" id="inputPassword" name="password" placeholder="Password" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required>
            </div>
            <div class="mt-4 border border-gray-200 rounded-md passwordWrapper">
                <input type="text" id="inputName" name="name" placeholder="Name" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required>
            </div>
            <div class="mt-4 border border-gray-200 rounded-md passwordWrapper">
                <input type="text" id="inputRole" name="role" placeholder="Role" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm w-full" required>
            </div>
            <button @click="register()" class="flex justify-center w-full outline-none focus:outline-none bg-green-600 hover:bg-green-700 text-sm text-white font-semibold tracking-wide py-5 mt-4 mb-4 rounded-full">
                Register
            </button>
            <router-link :to="{ name: 'MainLogin' }" class="text-xs outline-none focus:outline-none underline text-remLostPass">
                Login
            </router-link>
        </form>

    </div>
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
                let inputName  = document.querySelector('#inputName').value;
                let inputRole  = document.querySelector('#inputRole').value;

                let registerParameters = {
                    'email': inputEmail,
                    'password': inputPassword,
                    'displayName': inputName,
                    'role': inputRole
                }

                if(!inputEmail || !inputPassword || !inputRole || !inputName) {
                    this.addErrorBorder();
                    return;
                }

                if(process.env.NODE_ENV == "development"){
                    this.axios.post('http://localhost/api/' + 'register', registerParameters)
                    .then(axiosRes => {
                        if (axiosRes.data.message == 'Registration successful') {
                            console.log("Register success");
                            this.$router.push({
                                name: 'MainLogin'
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
                }

                this.axios.post('/api/' + 'register', registerParameters)
                .then(axiosRes => {
                    if (axiosRes.data.message == 'Registration successful') {
                        console.log("Register success");
                        this.$router.push({
                            name: 'MainLogin'
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
