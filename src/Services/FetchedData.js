
const BaseUrl = "https://api.openweathermap.org/data/2.5/weather";
const APIKEY = "834841dd1580f8d7ec8ef21ccd0f1741";


const getWeatherData = async (queryparams) => {
    const URL = BaseUrl + `?q=${queryparams}&appid=${APIKEY}&units=metric`;
    const fetchedData = await fetch(URL);
    const rawdata = await fetchedData.json();
    return rawdata;
}

// exporting getWeatherData
export default getWeatherData