<template>
    <div v-if="quota != null">
    <ul class="list-disc">
        <li>
            {{ quota.memory }}M
        </li>
        <li>
             {{ quota.vCpu }}vCPU
        </li>
    </ul>
    </div>
</template>


<script>

export default {
    props: ['quota']
}

</script>