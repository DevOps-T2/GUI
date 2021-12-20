<template>
<div>

            <div v-if="message" class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-4" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>{{ message }}</p>
            </div>

            <div class="mb-6">
                <div class="flex justify-between mb-4">
                        <div class="text-3xl leading-loose font-medium mainHeading">
                            User Management
                        </div>
                    </div>
            
                    <div class="w-full bg-white rounded-sm mx-auto">
                        <div class="mb-4">
                            <user-dropdown v-model="user"></user-dropdown>
                        </div>
                    </div>
            </div>
  
        
            <div v-if="user != null">
                <div>
                    <h3 class="text-xl mb-4">Resources</h3>
                    <update-user-resource-limits :user="user"></update-user-resource-limits>
                </div>
                <div>
                    <h3 class="text-xl mb-4">Danger Zone</h3>
                    <delete-user @deleted="onUserDelete" v-model="user"></delete-user>
                </div>
            </div>



</div>
</template>

<script>
/* import ProjektData from '@/components/Main/Projekti/ProjektData.vue'; */

import UserDropdown from '@/components/Users/UserDropdown.vue'
import UpdateUserResourceLimits from '@/components/Quotas/UpdateUserResourceLimits.vue'
import DeleteUser from '@/components/Users/DeleteUser.vue'
import moment from 'moment'
moment.locale('sl');

export default {
    

    components: {
        UserDropdown,
        UpdateUserResourceLimits,
        DeleteUser
    },
    data() {
        return {
            user: null,
            message: null
        };
    },

    watch: {
        user() {
            this.update();
        }
    },

    methods: {
        update() {
            if(this.user != null) {
                this.message = null
            }
        },
        onUserDelete() {
            this.message = "User was deleted!"
        }
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
