<script setup>
import {} from './composables/jsQR'
import {UseQrReader} from '../src/composables/QRReades'
let { QR, info, abilities, stat} = UseQrReader();

</script>

<template>
  <body>
   <div class = "container-fluid containerCircle">
        <div class="row">
            <div class="camera" >              
              <div id="scannerContainer">
            <video id="video" ></video>          
  </div>
            </div>
            <div class="circleGreen">

            </div>
            <div class="circleYellow">
                
            </div>
        </div>
</div>

<div class = "container-fluid">

  <div class ="row">
    <div class="col -12 containerImg">
   
   </div>

  </div>
  </div>
  <div class = "container-fluid ">
    <div class ="row">
    <div class="col -12 containerTxt" >   
    <canvas id="canvas" style="display: none;"></canvas>
    <div id="result"></div>
    
     
    </div>
  </div>
</div>
<div class= "containerButtons">
    <button v-if="nameS"
      type="button" 
      class="btn btn-warning bt " 
      id="btInfo" 
      @click="infoPokemon"
     >
      INFO
    </button>
 
    <button v-else
      type="button" 
      class="btn btn-warning bt " 
      id="btInfo" 
      @click="info"
     >
      INFO
    </button>
  
    <button v-if="nameS"
      type="button " 
      class="btn btn-warning bt "  
      id="btStats" 
      @click="statPokemon">
      STATS
    </button>
    <button v-else
      type="button" 
      class="btn btn-warning bt " 
      id="btInfo" 
      @click="stat"
     >
      STATS
    </button>
    <button  v-if="nameS"
      type="button" 
      class="btn btn-warning bt"
      id="btAbilities"      
      @click="abilitiesPokemon">
      ABILITIES
    </button>
    <button v-else
      type="button" 
      class="btn btn-warning bt " 
      id="btInfo" 
      @click="abilities"
     >
     ABILITIES
    </button>
</div>

<div class = " container-fluid cs">
  <div class ="row">
    <button 
      type="button" 
      class="btn btn-primary bt w-50 p-3 d-inline-block  " 
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal" 
      id="btSearch"> 
    </button>  
    <button 
      type="button" 
      class="btn btn-primary bt w-50 p-3 d-inline-block bi bi-qr-code"     
      id="btQr"
      v-on:click="nameS=false"
      @click='QR'>
      
    </button>   
  </div>
</div>

  <!-- Modal -->
  <div class="modal fade "
    id="exampleModal" 
    tabindex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true">
    <div class="modal-dialog fixed-bottom">
      <div class="modal-content containerModal">
        <div class="modal-header">
            <label> Search Pokemon:  </label>
          <button 
            type="button" 
            class="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
            <input
              type="text" 
              id='namePokemon' 
              placeholder="Pikachu" 
            v-model="pokemonId"/>
        </div>
        <div class="modal-footer">          
          <button 
            type="button" 
            class="btn btn-warning bt" 
            id="btModalSearch" 
            @click="searchPokemon">
            Search
          </button>
          <button 
            type="button" 
            class="btn btn-warning bt " 
            data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div class = "containerModal1">
   
  </div>


</body>

</template>

<script>

export default {
  name: 'App',
  
  data: () => ({
    
      pokemonData : {},
      pokemonId: ``,
      ab:'',
      statName:'', 
      statBasic:'',
      statEffort:'', 
      name:'',
      experience:'',
      height:'',
      weight:'',
      nameS :  '',
 }), 
  methods: {
 async n(){
  nameS = false;
 },
  async clean(){
    document.querySelector('.containerTxt').innerHTML =  ``
 
    },
    async searchPokemon() {(``)
    this.nameS = true;
     
      try {
        this.clean();
        const pokemonToFind = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`)       
        const pokemon = await pokemonToFind.json();
        this.pokemonData = pokemon;
        
       
        document.querySelector('.containerImg').innerHTML =  ` 
        <img class="img-fluid" src="${this.pokemonData.sprites.front_default}" alt="pokemonData.name">
                ` 
      } catch (error) {
        alert('Pokemon not found')
      }
     
    },
    async abilitiesPokemon(){(``)
      let name = this.pokemonData.name; 
      let ab=[] 
     try{
      if (name != null){
      document.querySelector('.containerTxt').innerHTML =  ` 
                <h1 class="text-center"> ABILITIES </h1>
                <OL id="list"></OL>
                ` 
      for(let i = 0; i < this.pokemonData.abilities.length; i++){+
        ab.push([this.pokemonData.abilities[i].ability.name])             

        const element = document.createElement("LI");
        const text = document.createTextNode("Name: " + ab[i]);
        element.appendChild(text);
        const list = document.getElementById("list");
        list.appendChild(element);
      }}
      else{
        alert('busca pokemon')
      } 
    } catch (error) {
        alert('You must first look for a pokemon ')
      }    
  },
  async statPokemon(){(``)
    let name = this.pokemonData.name;
    let statName=[] 
    let statBasic=[]
    let statEffort=[]
    try {
      if(name == null){
        alert('You must first look for a pokemon ')
      }else{
      document.querySelector('.containerTxt').innerHTML =  `
            <h1 class="text-center"> STATS </h1>
            <OL id="list"></OL>
        `
            for(let i = 0; i < this.pokemonData.stats.length; i++){            
                statName.push([this.pokemonData.stats[i].stat.name])
                statBasic.push([this.pokemonData.stats[i].base_stat])
                statEffort.push([this.pokemonData.stats[i].effort])

                const element = document.createElement("LI");
                const text = document.createTextNode("Name: " + statName[i] + " Basic stat: " + statBasic[i] + " Effort: " + statEffort[i]);
                element.appendChild(text);
                const list = document.getElementById("list");
                list.appendChild(element);
}
            }    
    } catch (error) {
        alert('You must first look for a pokemon ')
      }
    
  },
  async infoPokemon(){(``)
   let name = this.pokemonData.name;
    let experience = this.pokemonData.base_experience;
    let height = this.pokemonData.height;
    let weight = this.pokemonData.weight;
    
    try{
   if(name != null){
      document.querySelector('.containerTxt').innerHTML =  `
            <h1 class="text-center"> INFO </h1>
            <OL id="list">
                <LI>Name: ${name}</LI> 
                <LI>Experience: ${experience}</LI>    
                <LI>Height: ${height}</LI>
                <LI>Weiht: ${weight}</LI>            
            </OL>
             `
         }else{
          alert('You must first look for a pokemon ')
         }
        }
    catch (error) {
      alert(error)
    }
  }
}
}

</script>
<style scoped>
  @import "/src/assets/main.css";
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");
 </style>