"use client";

import Image from "next/image";
import { useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socket = io("http://localhost:4000");

  const [message, setMessage] = useState("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>click</button>
    </div>
  );
}
