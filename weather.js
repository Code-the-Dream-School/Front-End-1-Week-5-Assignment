/*
Author:  Irene Sanchez
Course:  CTD Catalina 
Assignment: Lesson 08 
Purpose: Using APIs to get information from OpenWeather
*/

const api = "5c883a0f98ddd80da8325f4f82795a27"
let lat;
let lon;

// Get user input
let userInput = document.getElementById('city');
let button = document.getElementById('search');

// add event listener to button
button.addEventListener('click', () => {
    let city = userInput.value
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
            .then(response => { 
                if (response.status === 404){
                    alert('CITY NOT FOUND');
                } else {
                response.json().then(data => {
                lat = data.coord.lat;
                lon = data.coord.lon;
                document.getElementById('info').innerHTML = `<b>City:</b> ${data.name} <br> 
                 <b>Country:</b> ${data.sys.country} <br> <b>Current Weather:</b> ${data.weather[0].description}`
                console.log(data);
                // console.log(lat);
                // console.log(lon);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}&units=imperial`)
                .then(response => response.json())
                .then(data => {
                    cityInfo = data;
                    let table = document.getElementById('table');
                    let tableHtml = `<table class= "table table-dark"><thead><tr><th>day</th><th>min</th><th>max</th><th>weather</th></tr></thead>`;
                    tableHtml += `<tbody>`;
                    for (let i = 0; i <cityInfo.daily.length; i++){
                        let date = new Date(cityInfo.daily[i].dt * 1000);  // convertion Unix timestap to current date
                        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        let day = date.toLocaleDateString("en-US",options);
                        tableHtml += `<tr><td>${day}</td><td>${cityInfo.daily[i].temp.min}\u00B0F</td><td>${cityInfo.daily[i].temp.max}\u00B0F</td><td><img src="http://openweathermap.org/img/wn/${cityInfo.daily[i].weather[0].icon}@2x.png"></img></td></tr>`;
                    }
                     tableHtml += `</tbody></table>`;
                    table.innerHTML = tableHtml;
                    console.log(cityInfo);
                })
                })
                }
            }) .catch(error => alert(error))
    
         
}); // end of click event


// function convert (temp) {
//     return Math.round((temp - 273.15) * 9/5 + 32)

