
        var arr = [];

    function renderButtons(){
        $("#cityHistory").empty();

        for(var i = 0; i<arr.length;i++){
            var a = $("<li>");
            a.addClass("bg-light text-dark mr-3 list-group-item")
            a.attr("")
            a.text(arr[i]);
            $("#cityHistory").prepend(a); 
           
        }
        
        localStorage.setItem("City", arr);
        }
    
    $("#cityForm").submit(function(event){
    event.preventDefault()
    var cityName = $("#cityName").val()
    $("#cityName").val("")
    arr.push(cityName);
    renderButtons();
    
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName + '&units=imperial&appid=1960cae10c6020e11ee642aeb10161f8'
    $.get(url, function(results){
    
        var main = $("#mainContent")
        var forecastCard = $("<div class=' bg-dark forecastCard card mt-1 mb-2'>")
        var city = $("<h2 class= 'text-light'>")
        var icon = $("<img = 'text-light' >")
        icon.attr("src", "http://openweathermap.org/img/wn/" + results.weather[0].icon+".png")
        city.text(cityName +" ("+ moment().format('l')+")")
        city.append(icon)

        var temp = $("<p class = 'text-light ml-1'>")
        var humidity = $("<p class = 'text-light ml-1'>")
        var windSpeed = $("<p class = 'text-light ml-1'>")
        humidity.text("Humidity: " + results.main.humidity + " %")
        temp.text("Current Temp: "+ results.main.temp)
        windSpeed.text("Wind Speed: " + results.wind.speed)
        
        var lat = results.coord.lat;
        var lon = results.coord.lon;

        forecastCard.append(city)
        forecastCard.append(temp)
        forecastCard.append(humidity)
        forecastCard.append(windSpeed)
        

        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon=" +lon+"&appid=1960cae10c6020e11ee642aeb10161f8";
        $.get(uvUrl, function(response){
            
            var textEl = $("<p class='text-light ml-1'>")
            textEl.text("UV Index: "+ response.value)
            forecastCard.append(textEl);
        })
       main.prepend(forecastCard)
    }) 

 ;
        
       
});
        