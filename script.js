document.querySelector("button").addEventListener("click", async (event) => {
    event.preventDefault();
    let input = document.querySelector("input").value;
        
    if(input !== "") {

        showWarning("Carregando..."); 

        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metrics&appid=d06cdb298fafc83c520d5ab677fc477e&lang=pt_br`);
        let data = await result.json();
        console.log(data)
        if(data.cod === 200 && data) {

            showInfo({
                name: data.name,
                country: data.sys.country,
                temp: data.main.temp.toFixed(1),
                tempIcon: data.weather[0].icon,
                description: data.weather[0].description,
                windSpeed: data.wind.speed,
                windDeg: data.wind.deg
            }); 
    
        } else {
            clearInfo();
            showWarning("Não encontramos esta localização.");
        }
    }
});

function showInfo(data) {

        showWarning("");

        document.querySelector(".titulo").innerHTML = `${data.name}, ${data.country}`;
        document.querySelector(".tempInfo").innerHTML = `${data.temp} <sup>ºC</sup>`;
        document.querySelector(".ventoInfo").innerHTML = `${data.windSpeed} <span>km/h</span>`;
        document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${data.tempIcon}.png`);
        document.querySelector(".tempDescricao").innerHTML = `${data.description}`
        document.querySelector(".ventoPonto").style.transform = `rotate(${(data.windDeg) -90}deg)`;
        document.querySelector(".temp img").style.width = "60%"
        document.querySelector(".resultado").style.display = "block";    
}

function showWarning(msg){
    document.querySelector(".aviso").innerHTML = msg;
}

function clearInfo() {
    showWarning("");
    document.querySelector(".resultado").style.dislay = "none"; 
}

