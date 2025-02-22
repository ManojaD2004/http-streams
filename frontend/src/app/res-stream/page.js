"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [streamData, setStreamData] = useState([]);
  useEffect(() => {
    async function init() {
      const response = await fetch("http://localhost:4000/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: "Manu-Warr" }),
      });
      response.ok;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // console.log(value);
        const chunk = decoder.decode(value, { stream: true });
        console.log("Stream chunk:", JSON.parse(chunk));
        setStreamData((sd) => [...sd, JSON.parse(chunk)]);
      }
    }
    init();
    // const e = init();
    // return () => {
    //   e.close();
    // };
  }, []);
  return (
    <div className="flex justify-evenly flex-col items-center space-y-24 my-10">
      <h1>HTTP streams</h1>
      <div>Stream data here</div>
      <div className="space-y-3">
        {streamData.map((ele, index) => {
          return (
            <div className="text-white" key={index}>
              {ele.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}
