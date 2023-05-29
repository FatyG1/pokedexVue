import { ref } from "vue"

export const UseQrReader = () =>{
      
  
  let url='';
  const dataQR= ref(null);
  let nameQR = ref(null);
  let experienceQR = ref(null);
  let heightQR = ref(null);
  let  weightQR = ref(null);
  let nameS = false;
  
const QR = async()=>  {
   
    document.querySelector('.containerTxt').innerHTML =  ` 
    <canvas id="canvas" style="display: none;"></canvas>
    <div id="result"></div>
    ` 
  // Acceder al video de la cámara
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
   
      // Mostrar la vista previa de la cámara
     
      video.setAttribute("autoplay", true);
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
                
      // Configurar el escaneo continuo
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      var qrWorker = new Worker("jsqr.js");
      
      const scanVideoFrame = async()=> {
             
    
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          var code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          
          if (code) {
            // Se encontró un código QR
            
           url = code.data;
           
            const pokemonToFind = await fetch(`${url}`)       
            const pokemon = await pokemonToFind.json();
            const pokemonData = pokemon;
            document.querySelector('.containerImg').innerHTML =  ` 
            <img class="img" src='${pokemonData.sprites?.front_default} '>
            `    
            stream.getTracks()[0].stop(); // Detener la cámara      
           
          } else {
            requestAnimationFrame(scanVideoFrame);
          }
        } else {
          requestAnimationFrame(scanVideoFrame);
        }
      }          
      requestAnimationFrame(scanVideoFrame);
    })
    .catch(function(error) {
      console.error("Error al acceder a la cámara: ", error);
    }
    
    );
   
  }
 
  const info = async() =>{ 
    if(url == ''){
      alert('You must first look for a pokemon ')
    }else{
    try {   
    fetch(`${url}`)       
    .then(response=> response.json()) 
    .then(data => {
   
    nameQR = data.name
    experienceQR = data.base_experience;
    heightQR = data.height;
    weightQR = data.weight;
    document.querySelector('.containerTxt').innerHTML =  `
            <h1 class="text-center"> INFO </h1>
            <OL id="list">
                <LI>Name: ${nameQR}</LI> 
                <LI>Name: ${experienceQR}</LI> 
                <LI>Name: ${heightQR}</LI> 
                <LI>Name: ${weightQR}</LI>                          
            </OL>
             `
            })
      }        
    catch (error) {
      alert('You must first look for a pokemon ')
    }}
    
  }
 
    
 const abilities =   async() =>{
  if(url == ''){
    alert('You must first look for a pokemon ')
  }else{
  try{
  fetch(`${url}`)       
  .then(response=> response.json()) 
  .then(data => {
  nameQR = data.name
      let ab=[] 
     
      document.querySelector('.containerTxt').innerHTML =  ` 
                <h1 class="text-center"> ABILITIES </h1>
                <OL id="list"></OL>
                ` 
      for(let i = 0; i < data.abilities.length; i++){
        ab.push([data.abilities[i].ability.name])             

        const element = document.createElement("LI");
        const text = document.createTextNode("Name: " + ab[i]);
        element.appendChild(text);
        const list = document.getElementById("list");
        list.appendChild(element);
      } 
     })
    } catch (error) {
        alert('You must first look for a pokemon ')
      }    
  }
  }
   const stat = async()=>{
    if(url == ''){
      alert('You must first look for a pokemon ')
    }else{
    try {
    fetch(`${url}`)       
    .then(response=> response.json()) 
    .then(data => {
    nameQR = data.name
    let statName=[] 
    let statBasic=[]
    let statEffort=[]
    
      document.querySelector('.containerTxt').innerHTML =  `
            <h1 class="text-center"> STATS </h1>
            <OL id="list"></OL>
        `
            for(let i = 0; i < data.stats.length; i++){            
                statName.push([data.stats[i].stat.name])
                statBasic.push([data.stats[i].base_stat])
                statEffort.push([data.stats[i].effort])

                const element = document.createElement("LI");
                const text = document.createTextNode("Name: " + statName[i] + " Basic stat: " + statBasic[i] + " Effort: " + statEffort[i]);
                element.appendChild(text);
                const list = document.getElementById("list");
                list.appendChild(element);
}
             })  
    } catch (error) {
        alert('You must first look for a pokemon ')
      }
    }
  }
  return{
    QR,
    info,
    abilities,
    stat,
   
  };
}


  
    
    

