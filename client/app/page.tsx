"use client";

import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

export default function Home() {
  console.log("test");

  const router = useRouter();

  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const getUser = async () => {
    const cookies = parseCookies();
    const result = await axios.post("http://localhost:4000/user", {
      token: cookies.user,
    });

    console.log(result);
    setUser(result.data.name);
  };

  useEffect(() => {
    getUser();
  }, []);

  function sendText() {
    socket.emit("message", message);
  }

  const logout = () => {
    destroyCookie(null, "user");
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="">
      <p>welcome {user}</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-orange-100"
      />
      <button onClick={() => sendText()}>click</button>
      <button onClick={() => logout()}>logout</button>
      <div className="chatarea">
        <ul>
          <li>ss</li>
        </ul>
      </div>
    </div>
  );
}
