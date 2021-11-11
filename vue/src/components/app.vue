<template>
    <div class=" main-grid-container grid grid-cols-3 lg:grid-cols-7">
        <sidebarLeft class="sidebarLeft min-w-full shadow-sideBarShadow"></sidebarLeft>
        <router-view :class="[user ? 'lg:col-span-5 bg-gray-100' : 'col-span-2 lg:col-span-7']" class="main-content" ></router-view>
        <div class="sidebarRight min-w-full bg-gray-100"></div>
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
    }
</script>

<style scoped>
</style>