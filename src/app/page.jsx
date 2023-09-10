"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [money, setMoney] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [football, setFootball] = useState({});
  const [hasFotball, setHasFutboll] = useState(false);
  const time = new Date();
  let year = time.toLocaleString("default", { year: "numeric" });
  let month = time.toLocaleString("default", { month: "2-digit" });
  let day = time.toLocaleString("default", { day: "2-digit" });
  let dateFormat = year + "-" + month + "-" + day;

  useEffect(() => {
    const fetchMoney = async () => {
      const response = await fetch(
        `https://cbu.uz/uz/arkhiv-kursov-valyut/json/all/${dateFormat}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      setMoney(jsonData[0]);
    };
    fetchMoney();
    const fetchWeather = async () => {
      setLoading(true);
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=4ead869993844e61a82182622231308&q=toshkent&days=0&aqi=no&alerts=no`,
        {
          mathod: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonWeather = await response.json();
      setWeather(jsonWeather.current);
      setLoading(false);
    };
    fetchWeather();
    const fetchFutboll = async () => {
      const response = await fetch(
        "http://api.weatherapi.com/v1/sports.json?key=4ead869993844e61a82182622231308&q=London",
        {
          mathod: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      setFootball(jsonData?.football[0]);
      if (jsonData.football.length == 0) {
        setHasFutboll(false);
      } else {
        setHasFutboll(true);
      }
    };
    fetchFutboll();
  }, [dateFormat]);

  let date = new Date(football?.start);
  let min = date.getMinutes();
  let hour = date.getHours() + 4;
  if (min === 0) {
    min = "00";
  } else if (min === NaN) {
    min = "";
  } else {
    min = min;
  }
  if (hour === 24) {
    hour = "00";
  } else if (hour === NaN) {
    hour = "";
  }

  const clock = `${hour}:${min}`;
  return (
    <div className="bg-white relative h-[100vh]">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1] "></div>

      <Image
        src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2575&q=80"
        alt="full image"
        layout="fill"
        className="object-cover w-auto  h-auto"
      />
      <div className="flex  text-center relative z-[2]">
        <h1 className="text-center text-white mx-auto mt-10 text-[30px]">
          {dateFormat} sana uchun ma&apos;lumotlar
        </h1>
      </div>

      <div className="z-[2] relative flex mt-20 justify-center flex-wrap w-full md:w-[1100px] mx-auto ">
        {/* money   */}
        <div className="border w-[300px]  text-[18px] text-center flex flex-col justify-around rounded-[18px] mx-5 border-[rgba(0,0,0,0.6)] bg-[rgba(0,0,0,0.6)] text-white p-5">
          <p className="text-[20px] uppercase">Bugungi valyuta kursi</p>
          <div>
            <p className="mb-3 ">{money.CcyNm_UZ} </p>
            <p className="">1$ {money.Rate} sum</p>
          </div>
          <Link
            href="/money"
            className="border p-2 rounded-[8px] mt-14 button-17"
          >
            Ko&apos;proq ma&apos;lumot olish
          </Link>
        </div>
        {/* weather    */}
        <div className="border my-4 sm:my-0 w-[300px] text-[18px] flex flex-col justify-between text-center rounded-[18px]  border-[rgba(0,0,0,0.6)] mx-5 bg-[rgba(0,0,0,0.6)] text-white p-5">
          <p className="uppercase text-[20px] ">Ob-xavo</p>
          <div>
            <p className="mb-3">Toshkent</p>
            <p className="">Now {weather?.feelslike_c?.toFixed(0)} &#176;C</p>
            <Image
              src={
                weather?.condition?.icon
                  ? `https:${weather?.condition?.icon}`
                  : ""
              }
              width={100}
              height={100}
              className="mx-auto"
              alt={`${weather?.condition?.text} icon`}
            />
          </div>
          <Link href="/weather" className="button-17">
            {" "}
            Ko&apos;proq ma&apos;lumot olish
          </Link>
        </div>
        {/* // football */}
        <div className="border  w-[300px] flex flex-col text-[18px]  border-[rgba(0,0,0,0.6)] rounded-[18px]  mx-5 bg-[rgba(0,0,0,0.6)] text-white p-5">
          <p className="text-[20px] uppercase mb-3 text-center">Football</p>
          {!hasFotball ? (
            <h3 className="text-center">Bugun futbol yo&apos;q</h3>
          ) : (
            <div>
              <h2 className=" ">
                <span className="text-blue-600">Liga:</span>{" "}
                {football?.tournament}
              </h2>
              <p className="my-3">
                <span className="text-blue-600">Jamoalar:</span>{" "}
                {football?.match}
              </p>
              <p>
                <span className="text-blue-600"> Stadion:</span>{" "}
                {football?.stadium}
              </p>
              <p className="my-3 text-center">
                <span className="text-blue-600">Vaqt</span> {clock}
              </p>
              <Link className=" button-17" href="/sports">
                Ko&apos;proq ma&apos;lumot olish
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
