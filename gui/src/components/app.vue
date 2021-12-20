<template>
    <div class="relative flex w-screen overflow-hidden h-screen">
        <sidebarLeft class="overflow-y-auto"  style="width: 300px;"></sidebarLeft>
        <div class="w-full overflow-y-auto px-32">
            <router-view ></router-view>
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
    }
</script>

<style scoped>
</style>