const apiKey = '8ee633956bad6ae1965b557a94ecfcba';
let classIcon,colorIcon;
city();
function city(){
    city_list=document.querySelectorAll(".city");
    city_list.forEach(element => {
        fetchWeather(element.id);
    });
}
function fetchWeather(cityName){
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=he&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const feltTemperature = data.main.feels_like;
            if (feltTemperature <= 20) {
                classIcon="fa-solid fa-bolt "
                 colorIcon= " #2352a4";
            } else if (feltTemperature <= 30) {
                   classIcon="fa-solid fa-cloud "
                   colorIcon= "#25b4d0";
            } else {
                classIcon="fa-solid fa-sun "
                colorIcon=" #fee14d";
            }
            const city = document.getElementById(cityName);
            city.innerHTML = `
                <h2>${data.name} <i class="${classIcon}" style="color:${colorIcon};"></i></h2>
                <p class="description  text-end" style="color:grey">${data.weather[0].description}</p>
                <p class="temp text-center">:טמפרטורה נמדדת <br>
                <span class="h5">${Number((data.main.temp)).toFixed(0)}°C</span></p>
                <p class="feels_like text-center">:טמפרטורה מורגשת<br>
                <span class="h5">${Number(data.main.feels_like).toFixed(0)}°C</span></p>
                <p class="humidity text-center">:לחות <br>
                <span class="h5"> ${data.main.humidity}%</span></p>
            `;
        })
        .catch(error => console.error(error));
}
