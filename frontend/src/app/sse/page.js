"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [streamData, setStreamData] = useState([]);
  useEffect(() => {
    function init() {
      const eventSource = new EventSource("http://localhost:4000/event");
      eventSource.onmessage = (event) => {
        console.log("Message: ", event);
      };
      eventSource.addEventListener("myEvent", (event) => {
        console.log("myEvent:", event);
        setStreamData((sd) => [...sd, JSON.parse(event.data)]);
      });

      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        eventSource.close();
      };
      return eventSource;
    }
    const e = init();
    return () => {
      e.close();
    };
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
