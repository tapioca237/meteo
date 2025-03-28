$(document).ready(function () {
    $("#searchBtn").click(function () {
        let city = $("#cityInput").val().trim();
        if (city === "") {
            alert("Veuillez entrer une ville !");
            return;
        }

        let apiKey = "feefe15292b5fb20bbc6bdcdc820009f"; 
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

        $(".weather-info").hide().css({ opacity: 0, transform: "translateY(-20px)" });
        $(".loader").show(); 

        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (response) {
                $(".loader").hide(); 

                $("#cityName").text(response.name);
                $("#temperature").text(Math.round(response.main.temp) + "°C");
                $("#description").text(response.weather[0].description);
                $("#weatherIcon").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

                $(".weather-info").show().css({ opacity: 1, transform: "translateY(0)" });
            },
            error: function (xhr) {
                $(".loader").hide();
                alert(xhr.status === 404 ? "Ville introuvable." : "Problème avec l'API.");
            }
        });
    });
    
});