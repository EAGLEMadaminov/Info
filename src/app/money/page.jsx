"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Money() {
  const [loading, setLoading] = useState(false);
  const [allMoney, setAllMoney] = useState([]);
  const [date, setDate] = useState("");
  const [choseDate, setChoseDate] = useState(false);

  const handleChange = (e) => {
    setChoseDate(true);
    setDate(e.target.value);
  };
  const time = new Date();
  let year = time.toLocaleString("default", { year: "numeric" });
  let month = time.toLocaleString("default", { month: "2-digit" });
  let day = time.toLocaleString("default", { day: "2-digit" });
  let dateFormat = year + "-" + month + "-" + day;
  useEffect(() => {
    const fetchFunction = async () => {
      setLoading(true);
      let url = "";
      if (choseDate) {
        url = `https://cbu.uz/uz/arkhiv-kursov-valyut/json/all/${date}/`;
      } else {
        url = `https://cbu.uz/uz/arkhiv-kursov-valyut/json/all/${dateFormat}/`;
      }
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await response.json();
      setLoading(false);
      setAllMoney(jsonData);
    };
    fetchFunction();
  }, [date, dateFormat, choseDate]);
  return (
    <div className="bg-white">
      <div>
        <div className="w-[1200px] mx-auto flex justify-between pt-10 mb-5 items-center">
          <Link href="/" className="button-30">
            Orqaga qaytish
          </Link>
          <div>
            <label htmlFor="date" className="text-black mr-3 text-[18px] ">
              Vaqt bo&apos;yicha ko&apos;rish{" "}
            </label>
            <input
              type="date"
              onChange={handleChange}
              name="date"
              className="border dark:text-black"
            />
          </div>
        
        </div>

        {loading ? (
          <figure>
            <div class="dot white"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </figure>
        ) : (
          <table className="table mx-auto" id="table-to-xls">
            <thead className="bg-[#E4A216] text-white ">
              <tr className=" dark:text-black">
                <th className="py-3 px-4 text-left w-[500px] text-white">
                  Valyutalar nomlari
                </th>
                <th className="py-3 px-4 text-left w-[200px] text-white">
                  Ramzli kodi
                </th>
                <th className="py-3 px-4 text-left w-[150px] text-white">
                  Raqamli kodi
                </th>
                <th className="py-3 px-4 text w-[200px] text-white">Vaqt</th>
                <th className="py-3 px-4 text w-[200px] text-white">Kurs</th>
              </tr>
            </thead>
            <tbody>
              {allMoney.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="text-left  dark:text-black border-y"
                  >
                    <td className="py-2 px-4">{item.CcyNm_UZ}</td>
                    <td className="py-2 px-4 text">{item.Ccy}</td>
                    <td className="py-2 px-4 tex">{item.Code} </td>
                    <td className="py-2 px-4  text-center">{item.Date}</td>
                    <td className="py-2 px-4 text-center">{item.Rate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
