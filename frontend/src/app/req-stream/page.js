"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [streamData, setStreamData] = useState("");
  const [blobLen, setBlobLen] = useState("10000");
  async function handleClick() {
    try {
      // if you need Req Readable Stream. You need to have http2, quic, spdy server setup
      // like nginx proxy to express or something. or consider using web socket
      // like socket io for req stream or bi directional stream.
      const a = ["This is a large text file"];
      const b = [];
      const limit = parseInt(blobLen);
      for (let i = 0; i < limit; i++) {
        b.push(...a);
      }
      const blob = new Blob(b, {
        type: "text/plain",
      });
      const response = await fetch("http://localhost:4000/send/stream", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: blob,
      });
      const resText = await response.text();
      console.log(resText);
      setStreamData(resText);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-evenly flex-col items-center space-y-24 my-10">
      <h1>HTTP streams</h1>
      <div>Blob Length</div>
      <input
      className="text-black p-3"
        type="text"
        value={blobLen}
        onChange={(e) => {
          setBlobLen(e.target.value);
        }}
      />
      <button className="text-black bg-white p-3" onClick={handleClick}>Submit</button>
      <div>Response data here</div>
      <div className="space-y-3">
        <div className="text-white">{streamData}</div>
      </div>
    </div>
  );
}
