"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Sports() {
  const [allSports, setAllSports] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchFunction = async () => {
    setLoading(true);
    const response = await fetch(
      `http://api.weatherapi.com/v1/sports.json?key=4ead869993844e61a82182622231308&q=London`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = await response.json();
    setAllSports(jsonData.football);
    setLoading(false);
  };
  useEffect(() => {
    fetchFunction();
  }, []);
  return (
    <div className="bg-white h-[110vh] py-10">
      <div className="text-center flex w-[1000px] justify-around mx-auto">
        <h1 className="text-black text-[30px] font-[700]">
          Bugungi Futboll matchlari
        </h1>
        <Link href="/" className="button-29">
          Orqaga qaytish
        </Link>
      </div>
      <div>
        {loading ? (
          <div class="box">
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">loading</div>
            </div>
          </div>
        ) : (
          <div className="table mx-auto" id="table-to-xls">
            <div className="bg-[#E4A216] text-white ">
              <div className=" dark:text-black grid grid-cols-5 mx-auto w-[1000px]">
                <div className="py-3 px-4 text-left w-[300px] text-white text-[18px] font-[700]">
                  Jamoalar
                </div>
                <div className="py-3 px-4 text-center text-[18px] font-[700] w-[200px] text-white">
                  Stadion
                </div>
                <div className="py-3 px-4 text-center  text-[18px] font-[700] w-[200px] text-white">
                  Turnir
                </div>
                <div className="py-3 px-4 text-center text-[18px] font-[700] w-[200px] text-white">
                  Vaqt
                </div>
                <div className="py-3 px-4  text-center text-[18px] font-[700] w-[200px] text-white">
                  Davlat
                </div>
              </div>
            </div>
            <div>
              {allSports.map((item, index) => {
                const date = new Date(item.start);
                let min = date.getMinutes();
                if (min === 0) {
                  min = "00";
                } else {
                  min = min;
                }
                let hour = date.getHours() + 4;
                if (hour === 24) {
                  hour = "00";
                }

                const time = `${hour} : ${min}`;
                return (
                  <div
                    key={index}
                    className="text-left w-[1000px]  grid grid-cols-5 dark:text-black border-y"
                  >
                    <div className="py-2 px-4">{item.match}</div>
                    <div className="py-2 px-4 text">{item.stadium}</div>
                    <div className="py-2 px-4 tex">{item.tournament} </div>
                    <div className="py-2 px-4  text-center">{time}</div>
                    <div className="py-2 px-4 text-center">{item.country}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sports;
