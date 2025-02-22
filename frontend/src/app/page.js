"use client";

export default function Home() {
  return (
    <div className="flex justify-evenly flex-col items-center space-y-24 my-10">
      <h1>HTTP streams</h1>
      <a href="/sse" className="underline" target="_blank">
        SSE Event
      </a>
      <a href="/res-stream" className="underline" target="_blank">
        Http Res Stream
      </a>
      <a href="/req-stream" className="underline" target="_blank">
        Http Req Stream
      </a>
    </div>
  );
}
