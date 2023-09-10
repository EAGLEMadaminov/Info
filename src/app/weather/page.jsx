"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Weather() {
  const [loading, setLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [city, setCity] = useState("Toshkent");
  const [inputValue, setInputValue] = useState("");
  const [days, setDays] = useState("1");
  const [hourlyInfo, setHourlyInfo] = useState([]);
  const time = new Date();
  let day = time.toLocaleDateString("default", { day: "2-digit" });
  let date = Number(day) + 10;
  useEffect(() => {
    const fetchFunction = async () => {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=4ead869993844e61a82182622231308&q=${city}&days=${days}&aqi=no&alerts=no`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      setWeatherInfo([jsonData]);
      let hourInfo = jsonData.forecast.forecastday[Number(days) - 1];

      setHourlyInfo(hourInfo);
    };
    fetchFunction();
  }, [days, city]);
  return (
    <div className="bg-white  relative min-h-[100vh] w-full">
      <Image
        src="https://www.wta.org/site_images/trip-reports/2017/tripreport.image.2017-07-24.5608363540/@@download/image/20369107_1363769333742070_3528939705401641346_o.jpg"
        alt="weather image"
        layout="fill"
        className="w-full absolute h-full object-cover "
      ></Image>
      <div className="pt-4 relative z-[5] flex w-[300px] md:w-[800px] lg:w-[1000px] mx-auto flex-col justify-center items-center">
        <h1 className="text-[25px] font-[700] text-center ">
          Shahringiz ob-havosini bilmoqchimisiz ?{" "}
        </h1>
        <div className="flex justify-between md:justify-center lg:justify-between flex-wrap  items-center w-[300px] sm:w-[600px]">
          <div className="border rounded-[20px]  bg-white px-5 mt-2">
            <input
              type="text"
              name="city"
              placeholder="Shahar nomini kiriting "
              onChange={(e) => setInputValue(e.target.value)}
              className="p-2 w-[200px] sm:w-[300px] outline-none"
            />
            <button
              type="button"
              onClick={(e) => {
                setCity(inputValue),
                  (e.currentTarget.parentElement.firstElementChild.value = "");
              }}
            >
              🔍
            </button>
          </div>
          <div className="flex items-center my-3 justify-center w-[300px] lg:w-auto">
            <select
              name="days"
              className=" mr-3 dark:text-black"
              id=""
              onChange={(e) => setDays(e.target.value)}
            >
              <option value="1">0</option>
              <option value="2">1</option>
              <option value="3">2</option>
            </select>
            <p>Kun keyingi ob-havo</p>
          </div>
        </div>
      </div>
      {loading ? (
        ""
      ) : (
        <div className="sticky z[2] flex w-[250px] md:w-[700px] lg:w-full flex-col justify-center items-center mx-auto text-center">
          {weatherInfo.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex items-center justify-around">
                  <h1 className="text-[30px]">{item?.location?.name}</h1>
                  <Link href="/" className="ml-5 button-29">
                    Orqaga qaytish
                  </Link>
                </div>
                <div className="flex mx-auto w-[250px] flex-wrap justify-center md:w-[600px] sm:justify-between items-center">
                  <p className="text-black text-4xl">
                    Now {item?.current?.temp_c?.toFixed(0)} &#176;C
                  </p>
                  <p className="text-4xl">{item?.current?.condition?.text}</p>
                  <Image
                    src={`https:${item?.current?.condition?.icon}`}
                    width={100}
                    height={50}
                    alt="current-text"
                  ></Image>
                </div>
                <div className="flex text-black  w-[250px] md:w-[600px] lg:w-[500px] justify-between text-2xl mx-auto">
                  <div className="flex justify-center w-full ">
                    <p className="mx-3 text-center text-[25px]">
                      {item?.forecast.forecastday[Number(days) - 1]?.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex w-[270px] sm:w-[320px] md:w-[700px] lg:w-[1100px] mx-auto justify-center flex-wrap">
            {hourlyInfo?.hour?.map((item, inx) => {
              return (
                <div
                  className="text-white w-[250px] m-5  p-5 text-center bg-black/50"
                  key={inx}
                >
                  <h3>{item.time} </h3>
                  <Image
                    alt={item?.condition?.text}
                    src={
                      item?.condition?.icon
                        ? `https:${item?.condition?.icon}`
                        : ""
                    }
                    width={100}
                    height={50}
                    className="mx-auto "
                  ></Image>
                  <div className="flex w-20 mx-auto justify-between">
                    <p className="capitalize mx-2">{item.condition?.text}</p>
                    <p>{item.temp_c?.toFixed(0)}&#176;C</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Hum: {item.humidity}%</p>
                    <p>Wind {item.wind_mph?.toFixed(0)} MPH</p>
                  </div>
                  <p>Feels Like {item.feelslike_c?.toFixed(0)}&#176;C</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
