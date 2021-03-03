// get langitude and longitude from our location ,

//const Skycons = require('./skycons.js')

//import { Skycons } from "./skycons.js";

// import Skycons from './skycons.js';

class weatherapp {
    temperatureDescription: HTMLElement;
    temperaturedegree: HTMLElement;
    locationTimeZone:HTMLElement
    temperatureSection : HTMLElement;
    temperatureSpan: HTMLElement
    celcius: any

    

        constructor(){
            window.addEventListener('load',()=>{

                let long;
                let lat;
            
                this.temperatureDescription = document.querySelector('.temperature-description') as HTMLElement;
                this.temperaturedegree  = document.querySelector('temperature-degree')! as HTMLElement;  
                this.locationTimeZone  = document.querySelector('.Location-TimeZone')! as HTMLElement; 
                this.temperatureSection = document.querySelector('.temperature')! as HTMLElement;
                this.temperatureSpan = document.getElementById("mySpan")! as HTMLElement;
                //this.celcius = 
                
            
             
            
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition => {
                        //console.log(showPosition);
                        long = showPosition.coords.longitude;
                        lat = showPosition.coords.latitude;
                        const proxy = `https://cors-anywhere.herokuapp.com/`;
                        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
                        fetch(api)
                            .then(response => {
                                return response.json();  // converting to json
                            })
                            .then(data=> {
                                console.log(data);
                                const {temperature, summary, icon} = data.currently; 
            
                                //setting DOM elements from API
            
                                this.temperaturedegree.textContent = temperature;
                                this.temperatureDescription.textContent = summary;
                                this.locationTimeZone.textContent = data.timezone;

                                // change tempearture to celcius/Farenheit 
                                //Formulae for Conversion 
                                this.celcius = (this.temperaturedegree -32)*(5/9) 

                                this.temperatureSection.addEventListener('click', () =>{
                                    if(this.temperatureSpan.textContent === 'F'){
                                        this.temperatureSpan.textContent='C';
                                        this.temperaturedegree.textContent = Math.floor(this.celcius);

                                    }else {
                                        this.temperatureSpan.textContent='F';
                                        this.temperaturedegree.textContent =temperature
                                    }
                                })



                                // invoking setIcon function             
                                this.setIcon(icon,document.querySelector('.icon')! as HTMLElement );

                                




                            })
                    });
                   
                  } else { 
                    this.locationTimeZone.innerHTML = "Geolocation can not be fetched.";
                  }
        })
        
    }


setIcon(icon:any,iconID:HTMLElement ){
    
     const skycons  = new Skycons({color:'white'});
     const currentIcon = icon.replace(/-/g,'_').toUpperCase;
     skycons.play();
     return skycons.set(iconID, skycons[currentIcon]);

 }

}
const weather = new weatherapp();



