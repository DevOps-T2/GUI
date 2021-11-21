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
                <div>
                    <button @click="setTempData()" class="mr-4 leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-gray-500 hover:bg-gray-700 rounded-full px-10 py-3 ">                        
                        Placeholder 1
                    </button>
                    <button @click="getPovprasevanja()" class="mr-4 leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-green-600 hover:bg-green-700 rounded-full px-10 py-3 ">                        
                        Placeholder 2
                        <div class="inline">
                            <div class="bi bi-arrow-repeat animate-spin inline-block" :class="fetchingPovprasevanja ? '' : 'hidden'"></div>                            
                        </div>
                    </button>
                    <button @click="addNewProject()" class="leading-loose text-white font-semibold text-sm tracking-wide cursor-pointer outline-none focus:outline-none bg-green-600 hover:bg-green-700 rounded-full px-10 py-3 ">                        
                        Placeholder 3
                        <img class="inline ml-4 " src="/svgs/addProject.svg" />
                    </button>
                </div>
            </div>
            <div class="borderShadowProject rounded-sm tracking-wide">
                <div class="mt-4 flex flex-wrap text-center text-white text-tableCells font-medium  pl-16 py-3 bg-white marginBottom ">
                    <!-- <div class="flex-1 opacity-50">Št. projekta</div>
                    <div class="flex-1 -ml-8 opacity-50">Lokacija objekta</div>
                    <div class="flex-1 -ml-4 opacity-50">Število modulov</div>
                    <div class="flex-1 -ml-6 mr-24 opacity-50">Status</div> -->
                    <div class="flex-1 -ml-6 mr-24 text-black">Placeholder</div>
                    <!-- <div class="flex-1 opacity-50">Ustvarjen</div>
                    <div class="flex-1 opacity-50">Zadnja sprememba</div> -->
                </div>
                <projektData v-bind:povprasevanjeData="povprasevanjeData" v-for="(povprasevanjeData,index) in povprasevanjaData" :key="index"></projektData>
            </div>
            <!-- <div class="mt-8 float-right">
                <nav class="relative z-0 inline-flex rounded-md border-remGrayBorder text-black" aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center pl-6 pr-4 py-2 rounded-l-md border border-remGrayBorder  text-sm font-medium text-black hover:bg-gray-50">
                    <span class="">Nazaj</span>
                    </a>
                    Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-remGrayBorder  text-gray-500 hover:bg-gray-50"
                    <a href="#" aria-current="page" class="z-10 bg-remBlue text-white border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                    </a>
                    <a href="#" class="border-remGrayBorder  text-black hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                    </a>
                    <a href="#" class=" border-remGrayBorder  text-black hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                    3
                    </a>
                    <span class="relative inline-flex items-center px-4 py-2 border border-remGrayBorder  text-sm font-medium text-gray-700">
                    ...
                    </span>
                    <a href="#" class="border-remGrayBorder  text-black hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                    8
                    </a>
                    <a href="#" class="border-remGrayBorder  text-black hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    9
                    </a>
                    <a href="#" class="border-remGrayBorder  text-black hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    10
                    </a>
                    <a href="#" class="relative inline-flex items-center pr-6 pl-4 py-2 rounded-r-md border border-remGrayBorder  text-sm font-medium text-black hover:bg-gray-50">
                    <span class="">Naprej</span>
                    </a>
                </nav>
            </div> -->
        </div>
    </div>

    <div class="mt-4 col-span-2">
    </div>
</div>
</template>

<script>
/* import ProjektData from '@/components/Main/Projekti/ProjektData.vue'; */
import moment from 'moment'
moment.locale('sl');

export default {
    
    /* components: { ProjektData}, */

    data() {
        return {
            povprasevanjaData: this.$store.getters.getPovprasevanja,
            fetchingPovprasevanja: false
        };
    },

    mixins: [],

    created() {
        //this.getProjects();
    },

    methods: {
        async setTempData() {
        },
        async getPovprasevanja() {
            this.fetchingPovprasevanja = true;
            await this.$store.dispatch('fetchPovprasevanja');
            this.fetchingPovprasevanja = false;
            this.povprasevanjaData = await this.$store.getters.getPovprasevanja;
        },
        /* addNewProject(){
            let newID = 0;
            if(this.projectsData.length && this.projectsData[0].id > -1){
                newID = +this.projectsData[0].id + 1;
            }
            let newProjectData = {
                "id": newID,
                "name": "",
                "partner": "360ECM D.O.O.",
                "stProjekta": "",
                "status": "Ponudba v pripravi",
                "ustvarjen": "",
                "zadnjaSprememba": "",
                "lokacijaObjekta": {
                    "ulicaPostavitve": "",
                    "postnaStevilka": "",
                    "kraj": "",
                    "drzava": ""
                },
                "informacijeOObjektu": {
                    "sistemGradnje": "",
                    "steviloModulov": "",
                    "risbaProjekta": "",
                    "dodatnaPriponka": ""
                },
                "okvir": {
                    "sneznaObremenitev": "",
                    "vetrnaObremenitev": "",
                    "barvaOkvirja": "",
                    "vroceCinkanje": "",
                    "nalepkaNaOkvirju": "",
                    "odprtineZaVilicarja": ""
                },
                "pod": {
                    "tipIzolacije": "",
                    "nosilnaPlosca": "",
                    "nosilnostPoda": [{
                            "prostor": "",
                            "nosilnost": ""
                        },
                    ],
                    "talnaObloga": [{
                            "prostor": "",
                            "talnaObloga": ""
                        },
                    ],
                    "dodatneOpombe": "",
                    "nosilnaPloscaDrugo": ""
                },
                "zunanjeStene": {
                    "toplotnaPrevodnost": "",
                    "tipIzolacije": "",
                    "notranjeObdelaveSten": [{
                        "prostor": "",
                        "notranjaObdelava": "",
                        "notranjaObdelavaDrugo": ""
                    }],
                    "zunanjaBarvaFasadnihPanelov": "",
                    "sekundarnaFasada": "",
                    "sekundarnaFasadaText": "",
                    "pozarneZahteve": "",
                    "dodatneOpombe": ""
                },
                "predelneStene": {
                    "predelnaStena": [{
                        "prostor": "",
                        "debelina": "",
                        "obdelava": "",
                        "pozarneZahteve": ""
                    }],
                    "dodatneOpombe": ""
                },
                "strop": {
                    "toplotnaPrevodnost": "",
                    "tipIzolacije": "",
                    "notranjaObdelavaStropa": [{
                        "prostor": "",
                        "obdelava": "",
                        "pozarneZahteve": ""
                    }]
                },
                "streha": {
                    "atika": "",
                    "tipAtike": "",
                    "sekundarnaStreha": "",
                    "tipSekundarneStrehe": "",
                    "podkonstrukcijaSekundarneStrehe": "",
                    "nacrtStreheSPodkonstrukcijo": ""
                },
                "oknaInZasteklitve": {
                    "zunanjaVrata": [{
                        "tip": "",
                        "barvaZnotraj": "",
                        "barvaZunaj": "",
                        "oprema": "",
                        "kolicina": ""
                    }],
                    "notranjaVrata": [{
                        "tip": "",
                        "barvaZnotraj": "",
                        "barvaZunaj": "",
                        "oprema": "",
                        "kolicina": ""
                    }],
                    "okna": [{
                        "tip": "",
                        "barvaZnotraj": "",
                        "barvaZunaj": "",
                        "oprema": "",
                        "kolicina": ""
                    }],
                    "tipStekla": "",
                    "uVrednost": "",
                    "sencenje": "",
                    "tipSencenja": "",
                    "barvaSencil": "",
                    "pogonSencenja": "",
                    "oznacenaRisba": ""
                },
                "elektricneInstalacije": {
                    "standard": "",
                    "razporeditevElektricnihOmaric": "",
                    "svetila": [{
                        "prostor": "",
                        "tipSvetila": "",
                        "kolicina": ""
                    }],
                    "nacrtElektroInstalacij": "",
                    "dodatneOpombe": ""
                },
                "vodovodneInstalacije": {
                    "izvedba": "",
                    "tipSanitarnihElementov": [{
                        "tipSanitarnegaElementa": "",
                        "kolicina": ""
                    }],
                    "nacrtVodovodnihInstalacij": ""
                },
                "ogrevanjeInHlajenje": {
                    "tipPrezracevanja": "",
                    "tipOgrevanja": "",
                    "tipHlajenja": "",
                    "lokalnoHlajenje": "",
                    "nacrtStrojnihInstalacij": ""
                },
                "dodatno": {
                    "uradnaStatika": "",
                    "cetrifikatnaMapa": ""
                },
                "comments": []
            }
            this.$store.commit('addProject', newProjectData);
            this.$router.push({ path: 'povprasevanje/' + newProjectData.id });
        } */
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
