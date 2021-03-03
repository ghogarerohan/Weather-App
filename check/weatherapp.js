// get langitude and longitude from our location ,
//const Skycons = require('./skycons.js')
//import './Skycons';
//import { Skycons } from './skycons.js'

import Skycons from './skycons.js'

var weatherapp = /** @class */ (function () {
    function weatherapp() {
        var _this = this;
        window.addEventListener('load', function () {
            var long;
            var lat;
            _this.temperatureDescription = document.querySelector('.temperature-description');
            _this.temperaturedegree = document.querySelector('.temperature-degree');
            _this.locationTimeZone = document.querySelector('.Location-TimeZone');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (showPosition) {
                    //console.log(showPosition);
                    long = showPosition.coords.longitude;
                    lat = showPosition.coords.latitude;
                    var proxy = "https://cors-anywhere.herokuapp.com/";
                    var api = proxy + "https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/" + lat + "," + long;
                    fetch(api)
                        .then(function (response) {
                        return response.json(); // converting to json
                    })
                        .then(function (data) {
                        console.log(data);
                        var _a = data.currently, temperature = _a.temperature, summary = _a.summary, icon = _a.icon;
                        //setting DOM elements from API
                        _this.temperaturedegree.textContent = temperature;
                        _this.temperatureDescription.textContent = summary;
                        _this.locationTimeZone.textContent = data.timezone;
                        // invoking setIcon function             
                        _this.setIcon(icon, document.querySelector('.icon'));
                    });
                });
            }
            else {
                _this.locationTimeZone.innerHTML = "Geolocation can not be fetched.";
            }
        });
    }
    weatherapp.prototype.setIcon = function (icon, iconID) {
        var skycons = new Skycons({"color": "pink"});
        var currentIcon = icon.replace(/-/g, '_').toUpperCase;
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    };
    return weatherapp;
}());
var weather = new weatherapp();
