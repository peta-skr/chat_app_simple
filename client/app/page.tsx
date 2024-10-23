"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socket = io("http://localhost:4000");
  const router = useRouter();

  const [message, setMessage] = useState("");

  const getUser = () => {};

  const logout = () => {
    destroyCookie(null, "user");
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>welcome</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>click</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}
