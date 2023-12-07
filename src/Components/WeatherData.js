import React, { useEffect, useState } from 'react'
import Search from "../Assets/Search.png"
import FeelsLike from "../Assets/FeelsLike.png"
import Sunrise from "../Assets/Sunrise.png"
import Humidty from "../Assets/Humidity.png"
import Sunset from "../Assets/Sunset.png"
import WindSpeed from "../Assets/WindSpeed.png"
import Pressure from "../Assets/Pressure.png"
import BlueBG from "../Assets/BlueBG.jpg"
import ClearBG from "../Assets/ClearBG.jpg"
import ClearNightBG from "../Assets/ClearNightBG.jpg"
import CloudyBG from "../Assets/CloudyBG.jpg"
import RainyBG from "../Assets/RainyBG.jpg"
import ThunderstormBG from "../Assets/ThunderstormBG.jpg"
import TornadoBG from "../Assets/TornadoBG.jpg"
import DrizzleBG from "../Assets/DrizzleBG.jpg"
import SmokeBG from "../Assets/SmokeBG.jpg"
import DustyNSandBG from "../Assets/DustyNSandBG.jpg"
import FogNMistBG from "../Assets/FogNMistBG.jpg"
import SnowBG from "../Assets/SnowBG.jpg"

import getWeatherData from "../Services/FetchedData";

const WeatherData = () => {

    const [searchvalue, setSearchvalue] = useState("Mumbai");
    const [data, setData] = useState(null);

    const getdata = async () => {
        if (searchvalue === "") {
            const reqdata = await getWeatherData("Mumbai");
            setData(reqdata);
        } else {
            const reqdata = await getWeatherData(searchvalue);
            setData(reqdata);
        }
    }

    const search = e => {
        e.preventDefault();
        getdata();
    }

    

    const decideBg = (args1, args2) => {
        const timestamp = args2
        const conversion = new Date((timestamp * 1000));
        const hour = ('0' + conversion.getHours()).slice(-2);
        const bg = args1.toLowerCase();
        switch (bg) {
            case 'clear':
                if (hour >= 19 || hour <= 7) {
                    return ClearNightBG;
                } else {
                    return ClearBG;
                }
                break;
            case 'clouds':
                return CloudyBG;
                break;
            case 'rain':
                return RainyBG;
                break;
            case 'thunderstorm':
                return ThunderstormBG;
                break;
            case 'tornado':
                return TornadoBG;
                break;
            case 'drizzle':
                return DrizzleBG;
                break;
            case 'smoke':
                return SmokeBG;
                break;
            case 'mist':
                return FogNMistBG;
                break;
            case 'fog':
                return FogNMistBG;
                break;
            case 'haze':
                return FogNMistBG;
                break;
            case 'ash':
                return FogNMistBG;
                break;
            case 'dust':
                return DustyNSandBG;
                break;
            case 'sand':
                return DustyNSandBG;
                break;
            case 'squall':
                return DustyNSandBG;
                break;
            case 'snow':
                return SnowBG;
                break;
            default:
                return BlueBG;
        }
    }

    const getIcon = (args) => {
        return `https://openweathermap.org/img/wn/${args}@4x.png`
    }

    const convertUnixtoTime = (sun) => {
        const timestamp = sun
        const conversion = new Date((timestamp * 1000));
        const time = ('0' + conversion.getHours()).slice(-2) + ':' + ('0' + conversion.getMinutes()).slice(-2);
        return time;
    }

    useEffect(() => {
        getdata();
        alert("Reload if ever data not found");
    }, [])

    return (
        <>
            {
                !data ? (
                    <div className='flex items-center justify-center h-screen'>
                        <p className='text-3xl'>NO DATA FOUND</p>
                    </div>
                ) : (
                    <div>
                        <div className='flex items-center justify-center h-screen' style=
                            {{ backgroundImage: `url(${decideBg(data.weather[0].main, data.timezone)})` }}
                        >
                            <div className='rounded-lg p-5 bg-sky-100 border-4 border-white lg:w-6/12' >
                                <div>
                                    <form onSubmit={e => { search(e) }} className='flex lg:justify-center'>
                                        <input type="text" placeholder='Enter Location Name' className='px-2 h-10 lg:px-4 w-56 lg:h-11 lg:w-4/5 border-2  rounded-l border-none outline-none' onChange={e => { setSearchvalue(e.target.value) }} />

                                        <button className='flex items-center justify-center w-10 h-10 lg:h-11 lg:w-11 rounded-r cursor-pointer bg-sky-200 hover:bg-cyan-300'><img src={Search} alt="s" className='w-5 h-5' /></button>
                                    </form>
                                </div>



                                <div className='px-1 mt-8 text-sky-800'>
                                    <div className='flex justify-between lg:pl-8 lg:pr-5'>
                                        <div>
                                            <p className='text-2xl lg:text-3xl font-medium'>{data.name}</p>
                                            <p className='font-normal'>{data.sys.country}</p>
                                        </div>
                                        <div>
                                            <img src={getIcon(data.weather[0].icon)} alt="ic" className='w-14 h-14 lg:w-16 lg:h-16' />
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-12 lg:px-8'>
                                        <div>
                                            <p className='text-5xl font-normal lg:text-6xl'>{Math.round(data.main.temp)}°C</p>
                                            <p className='font-light text-sm'>{Math.round(((data.main.temp) * 9 / 5) + 32).toFixed(1)} F</p>

                                        </div>
                                        <div>
                                            <p className='font-medium my-1 text-right lg:text-xl'>{data.weather[0].main}</p>
                                            <p className='text-right text-sm font-light my-5'>{Math.round(data.main.temp_min)}°C / {Math.round(data.main.temp_max)}°C</p>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex flex-col mt-7'>
                                    <div className='flex justify-around lg:justify-between lg:mx-8 my-4'>
                                        <div className='flex flex-col'>
                                            <img src={FeelsLike} alt="Feels Like" className='h-7 w-4 lg:h-9 lg:w-5 text-sky-800 mx-auto' />
                                            <p className='font-medium text-sky-800 text-sm lg:text-base text-center ml-1 mt-2'>{Math.round(data.main.feels_like)}°C</p>
                                            <p className='font-light text-xs lg:text-sm text-sky-800 text-center mt-1'>Felt</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <img src={Sunrise} alt="Feels Like" className='h-5 w-5 lg:h-7 lg:w-7 text-sky-800 mx-auto' />
                                            <p className='font-medium text-sky-800 text-sm lg:text-base text-center ml-1 mt-3'>{convertUnixtoTime(data.sys.sunrise)}</p>
                                            <p className='font-light text-xs lg:text-sm text-sky-800 text-center mt-1'>Sunrise</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <img src={Sunset} alt="Feels Like" className='h-5 w-4 lg:h-7 lg:w-5 text-sky-800 mx-auto' />
                                            <p className='font-medium text-sky-800 text-sm lg:text-base text-center ml-1 mt-3'>{convertUnixtoTime(data.sys.sunset)}</p>
                                            <p className='font-light text-xs lg:text-sm text-sky-800 text-center mt-1'>Sunset</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-around my-4 lg:justify-between lg:mx-6 '>
                                        <div className='flex flex-col'>
                                            <img src={Humidty} alt="Feels Like" className='h-5 w-4 lg:h-7 lg:w-5 text-sky-800 mx-auto' />
                                            <p className='font-medium text-sky-800 text-sm lg:text-base text-center ml-1 mt-2'>{data.main.humidity}%</p>
                                            <p className='font-light text-xs lg:text-sm text-sky-800 text-center mt-1 ml-1'>Humidity</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <img src={WindSpeed} alt="Feels Like" className='h-5 w-5 lg:h-7 lg:w-7 text-sky-800 mx-auto' />
                                            <p className='font-medium text-sky-800 text-sm lg:text-base text-center ml-1 mt-2'>{Math.round(data.wind.speed).toFixed(1)} km/h</p>
                                            <p className='font-light text-xs lg:text-sm text-sky-800 text-center mt-1 ml-1'>Windspeed</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <img src={Pressure} alt="Feels Like" className='h-5 w-4 lg:h-7 lg:w-5 text-sky-800 mx-auto' />
                                            <p className='font-medium text-sky-800 text-sm lg:text-base text-center ml-1 mt-2'>{data.main.pressure} hPa</p>
                                            <p className='font-light text-xs lg:text-sm text-sky-800 text-center mt-1 ml-1'>Pressure</p>
                                        </div>
                                    </div>
                                </div>



                            </div>


                        </div>
                    </div>
                )
            }
        </>
    )
}

export default WeatherData