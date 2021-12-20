<template>
<div>
    <!-- Main Body -->
    <div class="mt-4 mb-4 col-span-2">
        <!-- Main Content -->
        <div class="text-left w-full pl-40 mt-36 ml-auto mr-auto">
            <div class="flex justify-between mb-9">
                <div class="text-3xl leading-loose font-medium mainHeading">
                    Dashboard
                </div>
            </div>

        <h2 class="text-2xl mb-4">Mange for</h2>
        <div class="w-full bg-white rounded-sm mx-auto">
            
        </div>
            <div class="mb-4">
                <user-dropdown v-model="user"></user-dropdown>
            </div>
            <div>
                <h3 class="text-xl mb-4">Resources</h3>
                <update-user-resource-limits :user="user"></update-user-resource-limits>
            </div>
        </div>
    </div>

    <div class="mt-4 col-span-2">

    
    </div>
</div>
</template>

<script>
/* import ProjektData from '@/components/Main/Projekti/ProjektData.vue'; */

import UserDropdown from '@/components/Users/UserDropdown.vue'
import UpdateUserResourceLimits from '@/components/Quotas/UpdateUserResourceLimits.vue'
import moment from 'moment'
moment.locale('sl');

export default {
    

    components: {
        UserDropdown,
        UpdateUserResourceLimits
    },
    data() {
        return {
            user: null,
        };
    },

    watch: {
        user() {
            this.update();
        }
    },

    methods: {
        update() {
            
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
