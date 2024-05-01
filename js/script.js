const sendBtn = document.querySelector('#send-btn');

async function getForecast(cityName){
    const key = "1e88068dba9f4d54b34155723242904";
    const days = 3;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=${days}`;    
    const response = await fetch(url,{mode: 'cors'});    
    const obj = await response.json();
    const forecasts = obj.forecast.forecastday;    
    
    const sendBtn = document.querySelector('#send-btn');
    const cityForecastDiv = document.createElement("div");
    cityForecastDiv.textContent = cityName;
    cityForecastDiv.id = "city-name-div";    
    
    if(sendBtn.nextElementSibling.id === cityForecastDiv.id){
        sendBtn.nextElementSibling.remove();        
    }    

    sendBtn.after(cityForecastDiv);
    
    const dailyForecastDivs = document.querySelectorAll('.dailyForecast');

    if(dailyForecastDivs.length > 0){
        for(let i = 0; i < dailyForecastDivs.length; i++){
            dailyForecastDivs[i].remove();
        }
    }    

    let day = 1;
    for(const forecast of forecasts){
        const dailyForecast = forecast.day;
        const maxTemp = dailyForecast.maxtemp_c;
        const minTemp = dailyForecast.mintemp_c;
        const avgTemp = dailyForecast.avgtemp_c;                
        
        const dailyForecastDiv = document.createElement("div");
        dailyForecastDiv.classList.add('dailyForecast');
        dailyForecastDiv.textContent = `day: ${day} -> max: ${maxTemp} | min: ${minTemp} | avg: ${avgTemp}`;
        
        if(document.querySelectorAll('.dailyForecast').length == 0){
            cityForecastDiv.after(dailyForecastDiv);
        }
        else{            
            const dailyForecastDivs = document.querySelectorAll('.dailyForecast');
            const size = dailyForecastDivs.length;            
            dailyForecastDivs[size - 1].after(dailyForecastDiv);            
        }

        day++;
    }
}

sendBtn.addEventListener('click', function(){
    const cityName = document.querySelector('#city-name').value;
    getForecast(cityName);
});