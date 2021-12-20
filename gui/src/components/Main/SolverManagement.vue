<template>
<div>
    Hello!
</div>
</template>

<script>

export default {
    

    components: {

    },
    data() {
        return {
            mznFiles: [],
            dznFiles: [],
        };
    },

    mounted() {
    },

    watch: {

    },


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
